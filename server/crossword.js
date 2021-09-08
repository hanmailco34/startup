const db = require('./db/db');
const sequelize = require('./db/sequelize');

module.exports = (path,app) => {
    app.get(path+'/search',async (req,res)=>{
        const d = await sequelize.connect();
        console.log(d);
        const { rows } = await db.query('select * from search');
        console.log(rows);
        return res.json({'get-test':'ok'});
    })
}