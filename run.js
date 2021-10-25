const express = require('express');
const sequelize = require('./server/db/sequelize');
const app = express();
const port = process.env.PORT || 5000;
const accessRefer = ['http://localhost:5000','https://k-start-up.herokuapp.com/','http://localhost:5000/'];
const morgan = require('morgan');
const {stream} = require('./server/logger');

app.listen(port,(res,err)=>{
    console.log('home'+port);
    sequelize.connection();
});

app.use(express.json());
app.use('/img',express.static('./public/img'));
app.use('/util',express.static('./public/util'));
app.use('/css',express.static('./public/css'));
app.use('/js',express.static('./public/js'));
app.use(morgan('HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms',{stream}));

/* app.use((req,res,next)=>{
    if(accessRefer.indexOf(req.headers.referer) === -1 && req.path !== '/') {
        res.send('잘못된 접근입니다.');
    }
    else next();
}) */

app.use('/html',express.static('./public/html'));

const router = require('./server/route.js')(app);