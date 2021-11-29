const {db} = require('./db/sequelize');
const {logger} = require('./logger');

module.exports = (path,app) => {
    app.post(path+'/join',async (req,res)=>{
        const sns_id = req.body.sns_id;
        const sns_type = req.body.sns_type;
        const nickname = req.body.nickname;
        const email = req.body.email;
        const result = await db.Member.joinMember(sns_id,sns_type,nickname,email);
        logger.info(`ip:${req.clientIp}, sns_id:${sns_id}, sns_type:${sns_type}, nickname:${nickname}, email:${email}`);
        return res.json({res:result.id});
    })
}