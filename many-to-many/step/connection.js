const { Sequelize, DataTypes, Model } = require('sequelize');

// Initialize Sequelize to connect to your database
const sequelize = new Sequelize('db_demo', 'postgres', 'root123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
