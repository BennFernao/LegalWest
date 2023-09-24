const {Sequelize} = require("sequelize") 
require("dotenv").config()

async function inicializador(){

    const horarioPadrao = ["01:30","08:00", "20:00"].toString()
    const diasDeAtuacaoPadrao = [1,1,1,1,1,0, 1].toString()

    try {
        const Horario = require("./horarios/model")
        const horarios = await Horario.findAll()
        
        if(horarios.length == 0){
            await Horario.create({dias: diasDeAtuacaoPadrao, horario: horarioPadrao})
            console.log("Horário default criado com sucesso")
        }

        const User = require("./user/model")
        const bcrypt = require("bcrypt")

        const nome = process.env.nome 
        const sobrenome = process.env.sobrenome
        const email = process.env.email 
        const telefone = process.env.telefone
        let senha = process.env.senha 
        senha = await bcrypt.hash(senha)

        await User.create({nome, sobrenome,  email, telefone, senha, funcao : "superAdmin"})

    } catch (error) {
        console.log(error)
        console.log("Erro ao criar o horário default")
        
    }
    

}


const sequelize =   new Sequelize("postgres://ggvqwrjv:K7O7BUZZqmuneDqAB-84cIqU5W0YWsHY@snuffleupagus.db.elephantsql.com/ggvqwrjv")

async  function testeConnection(){

    try {
        await sequelize.authenticate()
        

        console.log("Conexao bem sucedida e inicializada")


    }catch(error){ 
        console.log(error)
        console.log("conexao mal sucedida")
    }
}

testeConnection()

module.exports = sequelize
