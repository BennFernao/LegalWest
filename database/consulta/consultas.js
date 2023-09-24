const sequelize = require("../connection")
const {DataTypes} = require("sequelize")

const User = require("../user/model")
const Advogado = require("../advogado/model")

const Consulta = sequelize.define("Consultas", {

    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue : DataTypes.UUIDV4
    },
    estado:{
        type:DataTypes.ENUM(["enviado", "lido", "atendido", "cancelado"]),
        defaultValue: "enviado"
    },
    para:{
        type: DataTypes.DATE,
        allowNull: false
    },
    idReuniao: {
        type:DataTypes.STRING,
        allowNull: true
    }

})

Advogado.hasMany(Consulta, {
    foreignKey: "idAdvogado"
})
Consulta.belongsTo(Advogado)


User.hasMany(Consulta, {
    foreignKey : "idUser"
})
Consulta.belongsTo(User)



module.exports = Consulta