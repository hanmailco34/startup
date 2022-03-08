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
            return sequelize.query(`(select tag, 0 "tag_count" from (
                SELECT distinct("tag"), "FoodTag"."createdAt" 
                FROM "FoodTag" "FoodTag"
                inner join "Food" f on f.id = "FoodTag"."foodId" 
                and f."mbId" = ${mbId}
                WHERE "FoodTag"."tag" LIKE '${tagName}%'
                ORDER BY "FoodTag"."createdAt" DESC 
                limit 3
                )tag)
                union all
                (SELECT "tag", count("tag") "tag_count"
                FROM "FoodTag" "FoodTag" 
                WHERE "FoodTag"."tag" LIKE '${tagName}%'
                and tag not in (select tag from (
                SELECT distinct("tag"), "FoodTag"."createdAt" 
                FROM "FoodTag" "FoodTag"
                inner join "Food" f on f.id = "FoodTag"."foodId" 
                and f."mbId" = ${mbId}
                WHERE "FoodTag"."tag" LIKE '${tagName}%'
                ORDER BY "FoodTag"."createdAt" DESC 
                limit 3
                )tag)
                GROUP BY "tag"
                ORDER BY tag_count DESC 
                LIMIT 30)`,{type:sequelize.QueryTypes.SELECT})
        }

        static setTag(foodId, content) {
            content.split(/\n|\s/).forEach(e => {
                if(e.substring(0,1) === '#') {
                    this.create({
                        foodId  : foodId,
                        tag : e.substring(1)
                    });
                }
            });
            return;
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

    /* return this.findAll({
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
    }) */

    return FoodTag;
}