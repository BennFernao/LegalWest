const sequelize = require("../connection")
const {DataTypes} = require("sequelize")

const Video = sequelize.define("Video", {

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
    srcThumbnail:{
        type:DataTypes.STRING,
        allowNull: false
    },
    srcVideo:{
        type: DataTypes.STRING,
        allowNull: false
    }
})


module.exports = Video