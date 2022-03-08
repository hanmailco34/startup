const {db}          = require('./db/sequelize');
const {logger}      = require('./logger');
const {getToken}    = require('./token');
const multer        = require('multer');
const pathw         = require('path');
const storage       = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./data");
    },
    filename: function (req, file, cb) {
        const ext = pathw.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});
  
const upload = multer({ storage: storage });

module.exports = (path, app) => {
    app.post(path + '/getTag', async (req, res) => {
        var tagName = req.body.tag;
        var token   = getToken(req);
        if(token.status === 'OK') {
            var mbId    = token.data.id;
            var result  = await db.FoodTag.getRecentTag(tagName, mbId);
            return res.json({status:'OK',data:result});
        }
        else {
            return res.json(token);
        }        
    });

    app.post(path + '/upload', upload.array("fileList"), async (req, res) => {
        var content     = req.body.content;
        var fileList    = req.files;
        var rep         = req.body.rep;
        var pathList    = [];
        for(var i = 0; i < fileList.length; i++) {
            var file = fileList[i];
            pathList.push(file.path);
        }

        var token   = getToken(req);
        if(token.status === 'OK') {
            var mbId    = token.data.id;
            var result  = await db.Food.uploadFood(mbId, content, fileList[rep].path, pathList);
            var result  = await db.FoodTag.setTag(result.id, content);
            return res.json({status:'OK'});
        }
        else {
            return res.json(token);
        } 
    });
}