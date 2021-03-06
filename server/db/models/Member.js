module.exports = (sequelize,DataTypes,Model) => {
    class Member extends Model {
        static joinMember(sns_id,sns_type,nickname,email) {
            return this.create({sns_id:sns_id,sns_type:sns_type,nickname:nickname,email:email});
        }
        static findMember(sns_id) {
            return this.findOne({where:{sns_id:sns_id}});
        }
    }
    
    const options = {
        sequelize,
        timestamps: true,
    }

    Member.init({
        sns_id: {
            type: DataTypes.STRING
        },
        sns_type: {
            type: DataTypes.STRING
        },
        nickname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        point: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },options);

    return Member;
}