const path      = require('path');
const fs        = require('fs');
const { check } = require('./token');

module.exports = (app,environment) => {    
    const htmlPath = path.join(__dirname,'..',`${environment}`,'html');

    app.get('/',(req,res)=>{
        res.cookie('environment',process.env.NODE_ENV)
        const indexHtmlPath = path.join(htmlPath,'index.html');
        res.sendFile(indexHtmlPath);
    });

    app.get('/components', (req, res) => {
        return res.json({ status: 'OK', data:{ components : fs.readdirSync('./front/component/js') }})
    })

    require('./crossword')('/crossword',app);
    require('./member')('/member',app);
    require('./sns')('/sns',app);
    check('/token',app);
}