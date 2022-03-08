const jwt           = require('jsonwebtoken');
const fs            = require('fs');
const {logger}      = require('./logger');
const iss           = 'leesoobin';
const sub           = 'hanmailco34@naver.com';
const aud           = 'dangdang';
const exp           = '24h';
const privatekey    = (process.env.NODE_ENV !== 'production') ? fs.readFileSync('privatekey') : process.env.privatekey;
const publickey     = fs.readFileSync('publickey');
const signOptions   = {
    issuer : iss,
    subject : sub,
    audience : aud,
    maxAge : exp,
    algorithms : ["RS256"]
  }

exports.setToken = function(info,res) {
    const signOption = {
        issuer      : iss,
        subject     : sub,
        audience    : aud,
        expiresIn   : exp,
        algorithm   : "RS256"
    }
    try {
        const token = jwt.sign({
            id          : info.id,
            sns_id      : info.sns_id,
            sns_type    : info.sns_type,
            name        : info.name,
            email       : info.email,
            point       : info.point
        }, privatekey, signOption);
        
        res.cookie("access_token", token, {
            maxAge: 60 * 60 * 60 * 1000
        });
        return token;
    }
    catch {
        return res.sendStatus(403).json({'message':'token fail'});
    }
}

exports.nextToken = function(req, res, next) {
    const token = req.cookies.access_token;
    if(!token) {
        return next();
    }
    try {
        const verify = jwt.verify(token,publickey,signOptions);
        return next();
    }
    catch {
        res.clearCookie('access_token');
        return next();
    }
}

exports.check = (path, app) => {
    app.post(path + '/check', (req,res) => {
        const token = req.cookies.access_token;
        logger.info(`ip:${req.clientIp}, token:${token}`);
        try {
            const verify = jwt.verify(token,publickey,signOptions);
            return res.json({status:'OK',data:{name:verify.name, point:verify.point}});
        }
        catch {
            return res.json({status:'OOPS',msg:'잘못된 토큰입니다.'});
        }
    })
}

exports.getToken = (req) => {
    console.log(req.cookies.access_token);
    const token = req.cookies.access_token;
    try {
        const verify = jwt.verify(token,publickey,signOptions);
        return {status:'OK',data:verify};
    }
    catch {
        return {status:'OOPS',msg:'잘못된 토큰입니다.'};
    }
}