module.exports = (sequelize,DataTypes,Model) => {
    class Test extends Model {}

    const options = {
        sequelize
    }

    Test.init({
        test1: {
            type: DataTypes.STRING
        },
        test2: {
            type: DataTypes.STRING
        }
    },options);

    console.log(Test === sequelize.models.Test);
}