const jwt           = require('jsonwebtoken');
const fs            = require('fs');
const iss           = 'leesoobin';
const sub           = 'hanmailco34@naver.com';
const aud           = 'localhost';
const exp           = '24h';
const privatekey    = fs.readFileSync('privatekey');
const publickey     = fs.readFileSync('publickey');

exports.setToken = function(info,res) {
    const signOptions = {
        issuer      : iss,
        subject     : sub,
        audience    : aud,
        expiresIn   : exp,
        algorithm   : "RS256"
    }
    try {
        const token = jwt.sign({id:info.id,sns_id:info.sns_id,sns_type:info.sns_type,name:info.name,email:info.email},privatekey,signOptions);
        res.cookie("access_token", token, {
            httpOnly: true
        });
        return 1;
    }
    catch {
        return res.sendStatus(403).json({'message':'token fail'});
    }
}

exports.getToken = function(req, res, next) {
    const token = req.cookies.access_token;
    if(!token) {
        return next();
    }
    const cert  = fs.readFileSync('publickey');
    const signOptions = {
      issuer : iss,
      subject : sub,
      audience : aud,
      maxAge : exp,
      algorithms : ["RS256"]
    }
    try {
        const verify = jwt.verify(token,cert,signOptions);
        return next();
    }
    catch {
        res.clearCookie('access_token');
        return next();
    }
}