const {db}        = require('./db/sequelize');
const {logger}    = require('./logger');
const {setToken}  = require('./token');
const qs          = require('qs');
const {OAuth2Client} = require('google-auth-library');
const util        = require('./util.js');
 
module.exports = (path,app) => {
  app.get(path+'/cb',async (req, res) => {
    const type = req.query.type;
    switch(type) {
      case 'naver':
        naverLogin(req, res);
        break;
      case 'google':
        gogoleLogin(req, res);
        break;
      case 'kakao':
        kakaoLogin(req, res);
        break;
    }
  })
}

async function kakaoLogin(req, res){
  const redirectURI = encodeURI(req.protocol + '://' + req.headers.host + req.url.split('?')[0] + '?type=kakao');
  const options = {
    url : 'https://kauth.kakao.com/oauth/token',
    headers : {'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'},
    method : 'post',
    data : qs.stringify({
      grant_type : 'authorization_code',
      client_id : process.env.KAKAO_CLINET_ID,
      redirect_uri : redirectURI,
      client_secret : process.env.KAKAO_CLINET_SECRET,
      code : req.query.code
    })
  }
  const result = await util.httpCall(options);
  
  const token_options = {
    url : 'https://kapi.kakao.com/v2/user/me',
    method : 'POST',
    headers : {'Content-Type'  : 'application/x-www-form-urlencoded;charset=utf-8',
               'Authorization' : 'Bearer ' + result.data.data.access_token}
  }
  const tokenResult = await util.httpCall(token_options);
  const param = {
    id    : tokenResult.data.data.id.toString(),
    name  : tokenResult.data.data.kakao_account.profile.nickname,
    email : tokenResult.data.data.kakao_account.email,
    type  : 'kakao'
  }
  console.log(tokenResult);
  console.log(param);
  getInfo(req, res, param);
}

async function naverLogin(req, res) {
  const code = req.query.code;
  const state = req.query.state;
  const redirectURI = encodeURI(req.protocol + '://' + req.headers.host + req.url.split('?')[0]);
  const api_url = 'https://nid.naver.com/oauth2.0/token';

  const options = {
      url: api_url,
      method : 'GET',
      headers: {'X-Naver-Client-Id':process.env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET},
      data : {
        grant_type    : 'authorization_code',
        client_id     : process.env.NAVER_CLIENT_ID,
        client_secret : process.env.NAVER_CLIENT_SECRET,
        redirect_uri  : redirectURI,
        code          : code,
        state         : state
      }
  };

  const tokenResult = await util.httpCall(options);
  if(tokenResult.status === 'OK') {
    if(tokenResult.data.status !== 200) res.status(tokenResult.data.status).end();
    else {
      const token_api_url = 'https://openapi.naver.com/v1/nid/me';
      const token = tokenResult.data.data.access_token;
      const header = "Bearer " + token;
      const token_options = {
        url: token_api_url,
        method : 'GET',
        headers: {'Authorization': header}
      }
      const resultInfo = await util.httpCall(token_options);
      
      if(resultInfo.status === 'OK') {
        if(resultInfo.data.status !== 200) res.status(resultInfo.data.status).end();
        else {
          const result  = resultInfo.data.data.response;
          const param   = {
            id    : result.id,
            name  : result.name,
            email : result.email,
            type  : 'naver'
          } 
          getInfo(req, res, param);
        }
      }
      else {
        res.status(resultInfo.data.status).end();
        console.log('error = ' + resultInfo.data.status);
      }
    }
  }
  else {
    res.status(tokenResult.data.status).end();
    console.log('error = ' + tokenResult.data.status);
  }
} 

async function gogoleLogin(req, res) {
  const client  = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const token   = req.query.token;
  
  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();

  }

  const info  = await verify().catch(console.error);
  const param = {
    id    : info.sub,
    name  : info.name,
    email : info.email,
    type  : 'google'
  }
  getInfo(req, res, param)
}

async function getInfo(req, res, param) {
  const sns_id    = param.id;
  const sns_name  = param.name;
  const sns_email = param.email;
  const sns_type  = param.type;
  var f_member  = await db.Member.findMember(sns_id);
  logger.info(`ip:${req.clientIp}, f_member: ${f_member}, sns_id:${sns_id}, sns_type:${sns_type}, name:${sns_name}, email:${sns_email}`);
  if(f_member === null) {
    const db_res = await db.Member.joinMember(sns_id,sns_type,sns_name,sns_email);                                      
    if(db_res <= 0) return res.json({status:'OOPS',msg:'토큰 정보가 올바르지 않습니다.'});
    else {
      f_member = {
        id        : db_res,
        sns_id    : sns_id,
        sns_type  : sns_type,
        name      : sns_name,
        email     : sns_email,
        point     : 0
      }
    }
  }

  const _info  = {id:f_member.id, sns_id:f_member.sns_id, sns_type:f_member.sns_type, name:f_member.nickname, email:f_member.email, point:f_member.point};
  var t = setToken(_info,res);
  return res.redirect('/');
}