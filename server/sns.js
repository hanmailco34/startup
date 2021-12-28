const {db}        = require('./db/sequelize');
const {logger}    = require('./logger');
const request     = require('request');
const {setToken}  = require('./token');
const {OAuth2Client} = require('google-auth-library');
 
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
    }
  })
}

function naverLogin(req, res) {
  const code = req.query.code;
  const state = req.query.state;
  const redirectURI = encodeURI(req.protocol + '//' + req.headers.host + req.url.split('?')[0]);
  const api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
  + process.env.NAVER_CLIENT_ID + '&client_secret=' + process.env.NAVER_CLIENT_SECRET + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
  const options = {
      url: api_url,
      headers: {'X-Naver-Client-Id':process.env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET}
  };

  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const token_api_url = 'https://openapi.naver.com/v1/nid/me';
      const token = JSON.parse(body).access_token;
      const header = "Bearer " + token;
      const token_options = {
        url: token_api_url,
        headers: {'Authorization': header}
      }
      request.get(token_options, async function (error2, response2, body2) {
        if (!error2 && response2.statusCode == 200) {
          const result  = JSON.parse(body2).response;
          const param   = {
            id    : result.id,
            name  : result.name,
            email : result.email,
            type  : 'naver'
          } 
          getInfo(req, res, param);                          
        } else {
          console.log('error');
          if(response2 != null) {
            res.status(response2.statusCode).end();
            console.log('error = ' + response2.statusCode);
          }
        }
      });
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
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
  const f_member  = await db.Member.findMember(sns_id);
  logger.info(`ip:${req.clientIp}, f_member: ${f_member}, sns_id:${sns_id}, sns_type:${sns_type}, name:${sns_name}, email:${sns_email}`);
  if(f_member === null) {
    const db_res = await db.Member.joinMember(sns_id,sns_type,sns_name,sns_email);                                      
    if(db_res <= 0) return res.json({status:'OOPS',msg:'토큰 정보가 올바르지 않습니다.'});
  }

  const _info  = {id:f_member.id, sns_id:f_member.sns_id, sns_type:f_member.sns_type, name:f_member.nickname, email:f_member.email};
  var t = setToken(_info,res);
  return res.redirect('/');
}