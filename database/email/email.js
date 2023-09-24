const sequelize = require("../connection")
const {DataTypes} = require("sequelize")


const email = sequelize.define("email", {

    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue : DataTypes.UUIDV4
    },
    email:{
        type: DataTypes.STRING,
        allowNull : false
    }
})


module.exports = email