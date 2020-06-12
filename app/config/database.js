require('dotenv').config();

const config = {
    database: process.env.DB_NAME || 'learningJs',
    host: process.env.DB_HOST || '192.168.15.16',
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    timestamps: true
}

module.exports = config;
