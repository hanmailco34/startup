module.exports = (sequelize,DataTypes,Model) => {
    class DogMissing extends Model {
        
    }
    
    const options = {
        sequelize,
        timestamps: true,
    }

    DogMissing.init({
        dogBreed: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        sex: {
            type: DataTypes.STRING
        },
        weight: {
            type: DataTypes.FLOAT
        },
        missingDate: {
            type: DataTypes.DATE
        },
        gratuity: {
            type: DataTypes.INTEGER
        },
        extra: {
            type: DataTypes.STRING
        },
        latitude: {
            type: DataTypes.FLOAT
        },
        longitude: {
            type: DataTypes.FLOAT
        },
        dogImage: {
            type: DataTypes.STRING
        },
        dogSearch: {
            type: DataTypes.STRING,
            defaultValue: 'N'
        },
        mbId: {
            type: DataTypes.INTEGER
        }
    },options);

    return DogMissing;
}