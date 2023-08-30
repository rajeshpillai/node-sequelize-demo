const sequelize =require("./connection");
const { DataTypes } = require('sequelize');

// Define the Purpose model
const Purpose = sequelize.define('Purpose', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'purpose'
});

// Define the Policy model
const Policy = sequelize.define('Policy', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  tableName: 'policy'
});


module.exports = {
  Purpose,
  Policy
};