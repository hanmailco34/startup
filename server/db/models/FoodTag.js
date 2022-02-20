module.exports = (sequelize,DataTypes,Model,Op) => {
    class FoodTag extends Model {
        static getPopularTag(tagName) {
            return this.findAll({
                attributes : [
                    'tag',
                    [sequelize.fn('count', sequelize.col('tag')), 'tag_count']
                ],
                where : {
                    tag : {
                        [Op.startsWith] : tagName
                    }
                },
                order : [
                    [sequelize.literal('tag_count'), 'DESC']
                ],
                group : 'tag',
                limit : 30
            })
        }
        static getRecentTag(tagName, mbId) {
            return this.findAll({
                attributes : [
                    sequelize.literal('distinct on(tag) "tag"'),
                    'createdAt'
                ],
                include: [
                    {
                        model: sequelize.models.Food,
                        where: {
                            mbId : mbId
                        },
                        require: true,
                        attributes: []
                    }
                ],
                raw : true
            })
        }
    }
    
    const options = {
        sequelize,
        timestamps: true,
    }

    FoodTag.init({
        foodId: {
            type: DataTypes.INTEGER
        },
        tag: {
            type: DataTypes.STRING
        }
    },options);
    

    sequelize.models.Food.hasMany(sequelize.models.FoodTag, {
        foreignKey : 'foodId'
    });

    sequelize.models.FoodTag.belongsTo(sequelize.models.Food, {
        foreignKey : 'foodId'
    });

    return FoodTag;
}