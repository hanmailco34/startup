const {db} = require('./db/sequelize');

module.exports = (path,app) => {
    app.post(path+'/join',async (req,res)=>{
        const sns_id = req.body.sns_id;
        const sns_type = req.body.sns_type;
        const nickname = req.body.nickname;
        const email = req.body.email;
        const result = await db.Member.joinMember(sns_id,sns_type,nickname,email);
        return res.json({res:result.id});
    })
}