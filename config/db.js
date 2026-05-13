const path = require('path');
const { Sequelize } = require('sequelize');
const sqlJsAsSqlite3 = require('sql.js-as-sqlite3');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlJsAsSqlite3,
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
});

module.exports = { sequelize };