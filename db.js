const { Pool } = require('pg'); //pg is there to connect our database with our server
const dotenv = require('dotenv');
dotenv.config();

const PG_URI = process.env.PG_URI;

  const pool = new Pool({
    connectionString: PG_URI
  });

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

//CRUD operations only occur in the database, not on the server