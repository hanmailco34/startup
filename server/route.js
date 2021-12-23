const path = require('path');
const { check } = require('./token');

module.exports = (app,environment) => {    
    const htmlPath = path.join(__dirname,'..',`${environment}`,'html');

    app.get('/',(req,res)=>{
        const indexHtmlPath = path.join(htmlPath,'index.html');
        res.sendFile(indexHtmlPath);
    });

    require('./crossword')('/crossword',app);
    require('./member')('/member',app);
    require('./sns')('/sns',app);
    check('/token',app);
}