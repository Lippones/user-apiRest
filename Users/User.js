const Sequelize = require('sequelize')
const database = require('../database/database')
const Token = require('../Tokens/Tokens.js')

const User = database.define('users',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    role:{
        type:Sequelize.INTEGER,
        allowNull: false
    }
})
//User.sync({force:true})
module.exports = User