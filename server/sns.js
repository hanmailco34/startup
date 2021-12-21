const {db}        = require('./db/sequelize');
const {logger}    = require('./logger');
const request     = require('request');
const {setToken}  = require('./token');
 
module.exports = (path,app) => {
    app.get(path+'/cb',async (req,res)=>{
        const code = req.query.code;
        const state = req.query.state;
        logger.info(`ip:${req.clientIp}, code:${code}, state:${state}`);
        var redirectURI = encodeURI(req.protocol + '//' + req.headers.host + req.url.split('?')[0]);
        const api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + process.env.NAVER_CLIENT_ID + '&client_secret=' + process.env.NAVER_CLIENT_SECRET + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
        var options = {
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
              request.get(token_options, async function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  const result    = JSON.parse(body).response;
                  const sns_id    = result.id;
                  const sns_name  = result.name;
                  const sns_email = result.email;
                  const sns_type  = 'naver';
                  const f_member  = await db.Member.findMember(sns_id);
                  logger.info(`ip:${req.clientIp}, f_member: ${f_member}, sns_id:${sns_id}, sns_type:${sns_type}, name:${sns_name}, email:${sns_email}`);
                  if(f_member === null) {
                    const db_res = await db.Member.joinMember(sns_id,sns_type,sns_name,sns_email);                                      
                    if(db_res <= 0) return res.json({status:'OOPS',msg:'토큰 정보가 올바르지 않습니다.'});
                    else return res.json({status:'OK',res:db_res.id});
                  }
                  else {
                    const _info  = {id:f_member.id, sns_id:f_member.sns_id, sns_type:f_member.sns_type, name:f_member.name, email:f_member.email};
                    var t = setToken(_info,res);
                    return res.redirect('/')
                  }                  
                } else {
                  console.log('error');
                  if(response != null) {
                    res.status(response.statusCode).end();
                    console.log('error = ' + response.statusCode);
                  }
                }
              });
            } else {
              res.status(response.statusCode).end();
              console.log('error = ' + response.statusCode);
            }
        });
    })
}

/* function setToken(info) {
  var iss = 'leesoobin';
  var sub = 'hanmailco34@naver.com';
  var aud = 'localhost';
  var exp = '24h';
  var signOptions = {
    issuer : iss,
    subject : sub,
    audience : aud,
    expiresIn : exp,
    algorithm : "RS256"
  }
  var token = jwt.sign({id:info.id,sns_id:info.sns_id,sns_type:info.sns_type,name:info.name,email:info.email},privatekey,signOptions);
  
  var cert = fs.readFileSync('publickey');
  var signOptions = {
    issuer : iss,
    subject : sub,
    audience : aud,
    maxAge : exp,
    algorithms : ["RS256"]
  }
  var v = jwt.verify(token,cert,signOptions);
  
} */