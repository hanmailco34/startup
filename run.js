const express = require('express');
const app = express();
const port = process.env.port || 5000;

app.listen(port,(res,err)=>{
    console.log('home'+port);
});

app.use('/css',express.static('./front/css'));
app.use('/img',express.static('./front/img'));
app.use('/util',express.static('./front/util'));
app.use('/js',express.static('./front/js'));

const router = require('./server/route.js')(app);