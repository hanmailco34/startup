const {db} = require('./db/sequelize');
const {logger} = require('./logger');

module.exports = (path, app) => {
    app.post(path + '/getTag', async (req, res) => {
        var tagName = req.body.tag;
        var mbId    = req.body.id;
        console.log(req.body);
        var result  = await db.FoodTag.getRecentTag(tagName, mbId);
        return res.json({status:'OK',data:result});
    });
}