const User = require("../database/user/model")
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")

const verificadorDaSessao = require("../midleware/verificadorDaSessao")
const Horario = require("../database/horarios/model")
const Consulta = require("../database/consulta/consultas")
const {Op} = require("sequelize")
const verificadorDeSessaoSuperAdmin = require("../midleware/verificadorDaSessaoSuperAdmin")


app.put("/atualizar" , verificadorDeSessaoSuperAdmin ,  async(req, res)=>{

    let { horario, dias} = req.body
    

    if(horario && dias){

        try {

            horario = horario.toString()
            dias = dias.toString()

            
            
            const horarioAtualizado = await Horario.update({horario, dias}, {where: {estado : true }})
            console.log(horarioAtualizado)

            res.send(["sucesso", "dados atualizados com sucesso"])
            
        } catch (error) {

            res.send(["erro", "erro ao atuaizar"])
            
        }
        


    }else{

        res.send(["erro", "dados imcompletos"])
    }
})


app.get("/horarioDeUmAdvogado/:idAdvogado", async (req, res)=>{

    const idAdvogado = req.params.idAdvogado
    const consultasAtivas = JSON.parse(JSON.stringify(await Consulta.findAll({where: {idAdvogado, estado : {[Op.or] : ["lido", "enviado"]}}})))

    const datas = consultasAtivas.map((consulta)=>{
        return consulta.para
    })

    
    res.send(datas)

})


app.get("/lerHorarioAtual", async (req, res)=>{

    let horario = await Horario.findOne()

    res.send(horario)
})


module.exports = app