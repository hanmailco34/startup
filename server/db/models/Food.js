module.exports = (sequelize,DataTypes,Model) => {
    class Food extends Model {
        
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