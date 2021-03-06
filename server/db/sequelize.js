const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const dbUrl = process.env.DATABASE_URL || require('./db_config');
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
    const model = require(path.join(__dirname,'models',f))(sequelize,DataTypes,Model,Op);
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