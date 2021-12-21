const express = require('express');
const sequelize = require('./server/db/sequelize');
const app = express();
const port = process.env.PORT || 5000;
const accessRefer = ['http://localhost:5000','https://k-start-up.herokuapp.com/','http://localhost:5000/'];
const morgan = require('morgan');
const {logger,stream} = require('./server/logger');
const requestIp = require('request-ip');
const cookieParser = require('cookie-parser');
const {getToken} = require('./server/token');
require('dotenv').config();

app.listen(port,(res,err)=>{
    sequelize.connection();
});

app.use(cookieParser());
app.use(express.json());
app.use('/img',express.static('./public/img'));
app.use('/util',express.static(`./public/util`));
app.use('/css',express.static(`./public/css`));
app.use('/js',express.static(`./public/js`));
app.use(morgan('HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms',{stream}));
app.use(requestIp.mw());

app.use((req,res,next) => {
    if(accessRefer.indexOf(req.headers.referer) === -1 && !(req.path === '/' || req.path === '/sns/cb')) {
        res.send('잘못된 접근입니다.');
        logger.error('잘못된 접근자가 있습니다');
    }
    else next();
});

app.use((req,res,next) => {
    getToken(req,res,next); 
})

app.use('/html',express.static(`./public/html`));

const router = require('./server/route.js')(app);