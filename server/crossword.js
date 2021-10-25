const {db} = require('./db/sequelize');

module.exports = (path,app) => {
    app.get(path+'/search',async (req,res)=>{        
        return res.json({'get-test':'ok'});
    })
    app.get(path+'/test',async (req,res)=>{
        var d = await db.Test.createTest('1','4');
        console.log(d);
    })
}