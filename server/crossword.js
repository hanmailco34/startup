const db = require('./db/db');

module.exports = (path,app) => {
    app.get(path+'/search',async (req,res)=>{        
        const { rows } = await db.query('select * from search');
        console.log(rows);
        return res.json({'get-test':'ok'});
    })
}