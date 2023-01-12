const Sequelize = require('sequelize')
const database = require('../database/database')
const Token = database.define('tokens',{
    token:{
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:'users',
            key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    used:{
        type:Sequelize.INTEGER,
        allowNull: false,
    }
})
//Token.sync({force:true})
module.exports = Token