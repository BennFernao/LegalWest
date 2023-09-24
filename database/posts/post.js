const sequelize = require("../connection")
const {DataTypes} = require("sequelize")

const resumoDoPost = sequelize.define("resumoDoPost", {

    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue : DataTypes.UUIDV4
    },
    titulo:{
        type: DataTypes.STRING,
        allowNull : false
    },
    descricao:{
        type: DataTypes.STRING,
        allowNull : false
    }, 
    data:{
        type:DataTypes.STRING,
        defaultValue: (new Date(Date.now())).toLocaleDateString()
    },

    autor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    arquivo:{
        type: DataTypes.STRING,
        allowNull: false
    },

    urlImagem:{
        type:DataTypes.STRING,
        allowNull:false      
    },
    tituloModificado:{
        type:DataTypes.STRING,
        allowNull:false 
    }
    

})


module.exports = resumoDoPost