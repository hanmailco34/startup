const { Sequelize } = require('sequelize');
const { dbUrl } = require('./db_config');

const sequelize = new Sequelize(dbUrl,{
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    connection: async() => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}