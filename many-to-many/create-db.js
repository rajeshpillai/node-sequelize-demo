const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'root123',
});

const createDatabase = async (dbname) => {
  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${dbname}`);
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
};

createDatabase("db_demo");
