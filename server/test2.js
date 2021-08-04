module.exports = (path,app) => {
    app.post(path+'/test',(req,res)=>{
        return res.json({'test2':'ok'});
    })
}