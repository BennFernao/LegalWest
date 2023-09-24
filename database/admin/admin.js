const sequelize = require("../connection")
const {DataTypes} = require("sequelize")

const Admin = sequelize.define("Admin", {

    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue : DataTypes.UUIDV4
    },
    username:{
        type: DataTypes.STRING,
        allowNull : false
    },
    senha:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


module.exports = Admin