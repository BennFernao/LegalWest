const sequelize = require("../connection")
const {DataTypes} = require("sequelize")

const Horario = sequelize.define("Horario", {

    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue : DataTypes.UUIDV4
    },
    dias:{
        type: DataTypes.STRING,
        allowNull : false
    },
    horario: {
        type: DataTypes.STRING,
        allowNull : false
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    } 
})


module.exports = Horario