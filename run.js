const express = require('express');
const sequelize = require('./server/db/sequelize');
const app = express();
const port = process.env.PORT || 5100;
const accessRefer = ['http://localhost:5100','https://k-start-up.herokuapp.com/','http://localhost:5100/'];
const morgan = require('morgan');
const {logger,stream} = require('./server/logger');
const requestIp = require('request-ip');
const cookieParser = require('cookie-parser');
const {getToken} = require('./server/token');
require('dotenv').config();
//const environment = (process.env.NODE_ENV === 'development') ? 'front' : 'public';
const environment = 'front';

if (process.env.NODE_ENV !== 'test') {
    app.listen(port,(res,err)=>{
        sequelize.connection();
    });
}

app.use(cookieParser());
app.use(express.json());
app.use('/img',express.static(`./${environment}/img`));
app.use('/util',express.static(`./${environment}/util`));
app.use('/css',express.static(`./${environment}/css`));
app.use('/js',express.static(`./${environment}/js`));
//TODO
app.use('/component',express.static(`./front/component`));
app.use(morgan('HTTP/:http-version :method :remote-addr :url :remote-user :status :res[content-length] :referrer :user-agent :response-time ms',{stream}));
app.use(requestIp.mw());

if (process.env.NODE_ENV !== 'test') {
    app.use((req,res,next) => {
        if(accessRefer.indexOf(req.headers.referer) === -1 && !(req.path === '/' || req.path === '/sns/cb')) {
            res.send('잘못된 접근입니다.');
            logger.error('잘못된 접근자가 있습니다');
        }
        else next();
    });
}

app.use((req,res,next) => {
    getToken(req,res,next); 
})

app.use('/html',express.static(`./${environment}/html`));

const router = require('./server/route.js')(app,environment);

module.exports = app;