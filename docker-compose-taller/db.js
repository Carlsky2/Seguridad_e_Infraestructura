const { Pool } = require('pg');
const pool = new Pool({
    host: 'db', // Use the service name defined in docker-compose.yml
    port: 5432,
    user: 'usuario123',
    password: '123456',
    database: 'taller',
})

module.exports = pool