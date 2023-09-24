const sequelize = require("../connection")
const {DataTypes} = require("sequelize")

const User = sequelize.define("User", {

    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue : DataTypes.UUIDV4
    },
    nome:{
        type: DataTypes.STRING,
        allowNull : false
    },
    sobrenome:{
        type: DataTypes.STRING,
        allowNull : false
    }, 
    email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    privilegio:{
        type:DataTypes.ENUM([ "user", "admin", "superAdmin"]),
        defaultValue: "user" 
    }
})


module.exports = User