const path = require('path');
const htmlPath = path.join(__dirname,'..','public','html');

module.exports = (app) => {    
    app.get('/',(req,res)=>{
        const indexHtmlPath = path.join(htmlPath,'index.html');
        res.sendFile(indexHtmlPath);
    });

    require('./test')('/test',app);
    require('./test2')('/test2',app);
}