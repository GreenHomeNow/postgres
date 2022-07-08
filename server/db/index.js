const { Pool } = require("pg");
const pool = new Pool({
    user: 'ubuntu',
    host: 'localhost',
    database: 'greenhome',
    password: 'BerlinMumbai',
    port: 5432,
});

module.exports ={
    query: (text, params) => pool.query(text,params),
};