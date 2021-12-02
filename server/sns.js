const {db} = require('./db/sequelize');
const {logger} = require('./logger');
const request = require('request');

module.exports = (path,app) => {
    app.get(path+'/cb',async (req,res)=>{
        console.log(req.query);
        code = req.query.code;
        state = req.query.state;
        logger.info(`ip:${req.clientIp}, code:${code}, state:${state}`);
        pi_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
        + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
        /* const sns_id = req.body.sns_id;
        const sns_type = req.body.sns_type;
        const nickname = req.body.nickname;
        const email = req.body.email;
        const result = await db.Member.joinMember(sns_id,sns_type,nickname,email);
        logger.info(`ip:${req.clientIp}, sns_id:${sns_id}, sns_type:${sns_type}, nickname:${nickname}, email:${email}`);
        return res.json({res:result.id}); */
    })
}