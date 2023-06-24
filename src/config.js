require('dotenv').config({ path: '.env' });

module.exports = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.HOST,
        port: process.env.DB_PORT,
        database: process.env.DATABASE
    }
}

