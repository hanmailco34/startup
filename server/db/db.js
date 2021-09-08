let { dbUrl } = require('./db_config');

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: dbUrl,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = {
    query: (text, params) => pool.query(text,params),
}