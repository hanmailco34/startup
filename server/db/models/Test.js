module.exports = (sequelize,DataTypes,Model) => {
    class Test extends Model {
        static createTest(arg1,arg2) {
            return this.create({test1:arg1,test2:arg2});
        }
    }

    const options = {
        sequelize,
        timestamps: true,
    }

    Test.init({
        test1: {
            type: DataTypes.STRING
        },
        test2: {
            type: DataTypes.STRING
        }
    },options);

    return Test;
}