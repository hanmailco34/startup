const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const accessRefer = ['http://localhost:5000/','https://k-start-up.herokuapp.com/'];

app.listen(port,(res,err)=>{
    console.log('home'+port);
});

app.use('/img',express.static('./public/img'));
app.use('/util',express.static('./public/util'));
app.use('/css',express.static('./public/css'));
app.use('/js',express.static('./public/js'));

app.use((req,res,next)=>{
    if(accessRefer.indexOf(req.headers.referer) === -1 && req.path !== '/') {
        console.log(req.path);
        res.send('잘못된 접근입니다.');
    }
    else next();
})

app.use('/html',express.static('./public/html'));

const router = require('./server/route.js')(app);