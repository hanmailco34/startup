const path = require('path');
const htmlPath = path.join(__dirname,'..','public','html');

module.exports = (app) => {    
    app.get('/',(req,res)=>{
        const indexHtmlPath = path.join(htmlPath,'index.html');
        res.sendFile(indexHtmlPath);
    });

    require('./crossword')('/crossword',app);
    require('./member')('/member',app);
    require('./sns')('/sns',app);
}