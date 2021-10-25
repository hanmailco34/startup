const { Sequelize, DataTypes, Model } = require('sequelize');
const { dbUrl } = require('./db_config');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(dbUrl,{
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    define: {
        freezeTableName: true
    }
});

const db = {};

const files = fs.readdirSync(path.join(__dirname,'models'));
files.forEach((file)=>{
    const f = file.split('.')[0];
    const model = require(path.join(__dirname,'models',f))(sequelize,DataTypes,Model);
    db[f] = model;
});

module.exports = {
    connection: async() => {
        try {
            await sequelize.authenticate();
            //await sequelize.sync({alter:true});
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },
    db:db
}