const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const accessRefer = ['http://localhost:5000/','https://k-start-up.herokuapp.com/'];

app.listen(port,(res,err)=>{
    console.log('home'+port);
});

app.use('/css',express.static('./front/css'));
app.use('/img',express.static('./front/img'));
app.use('/util',express.static('./front/util'));
app.use('/js',express.static('./front/js'));

app.use((req,res,next)=>{
    if(accessRefer.indexOf(req.headers.referer) === -1 && req.path !== '/') {
        console.log(req.path);
        res.send('잘못된 접근입니다.');
    }
    else next();
})

app.use('/html',express.static('./front/html'));

const router = require('./server/route.js')(app);