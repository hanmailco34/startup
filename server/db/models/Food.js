module.exports = (sequelize,DataTypes,Model) => {
    class Food extends Model {
        static uploadFood(mbId, content, repPath, imagePath) {
            return this.create({
                mbId            : mbId, 
                content         : content,
                repImagePath    : repPath,
                ImagePath       : imagePath
            });
        }
    }
    
    const options = {
        sequelize,
        timestamps: true,
    }

    Food.init({
        mbId: {
            type: DataTypes.INTEGER
        },
        content: {
            type: DataTypes.TEXT
        },
        repImagePath: {
            type: DataTypes.STRING
        },
        ImagePath: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        viewCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },options);

    return Food;
}