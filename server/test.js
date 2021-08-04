module.exports = (path,app) => {
    app.post(path+'/test',(req,res)=>{
        return res.json({'test':'ok'});
    })
    app.get(path+'/get',(req,res)=>{
        return res.json({'get-test':'ok'});
    })
}