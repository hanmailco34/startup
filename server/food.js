const {db} = require('./db/sequelize');
const {logger} = require('./logger');

module.exports = (path, app) => {
    app.post(path + '/getTag', async (req, res) => {
        var tagName = req.body.tag;
        var result  = await db.FoodTag.getRecentTag(tagName, 29);
        return res.json({res:result});
    });
}