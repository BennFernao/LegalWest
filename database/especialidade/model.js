const sequelize = require("../connection")
const {DataTypes} = require("sequelize")
const Advogado = require("../advogado/model")

const Especialidade = sequelize.define("Especialidade", {

    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue : DataTypes.UUIDV4
    },
     nome:{
        type: DataTypes.STRING,
        allowNull : false
    } 
})


Advogado.belongsToMany(Especialidade, {through: "EspecialidadeAdvogados"})
Especialidade.belongsToMany(Advogado, {through: "EspecialidadeAdvogados"})


module.exports = Especialidade