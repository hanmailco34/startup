const { Sequelize } = require('sequelize');
const { dbUrl } = require('./db_config');

const sequelize = new Sequelize(dbUrl);

module.exports = {
    connect: async () => await sequelize.authenticate()
}