const Sequelize = require('sequelize')

const database = new Sequelize('users', 'postgres', 'dwpq2jnza4', {
  host: 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    
  }
});

module.exports = database