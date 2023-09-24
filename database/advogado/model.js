const sequelize = require("../connection")
const {DataTypes} = require("sequelize")
const User = require("../user/model")


const Advogado = sequelize.define("Advogado", {

    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue : DataTypes.UUIDV4
    },
    nome:{
        type: DataTypes.STRING,
        allowNull : false
    },
    descricao:{
        type:DataTypes.STRING(1000),
        allowNull:false,

    },
    escritorio:{
        type:DataTypes.STRING,
        allowNull:false      
    },

    urlImagemPerfil :{
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasOne(Advogado, {
    foreignKey : "IdUser"
})
Advogado.belongsTo(User)

module.exports = Advogado