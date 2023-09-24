const User = require("../database/user/model")
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")

const verificadorDaSessao = require("../midleware/verificadorDaSessao")
const Consulta = require("../database/consulta/consultas")
const Advogado = require("../database/advogado/model")
const validator = require("validator")
const {zonedTimeToUtc, utcToZonedTime,format ,getTimezoneOffset} = require("date-fns-tz")
const verificadorDeSessao = require("../midleware/verificadorDaSessao")
const Horario = require("../database/horarios/model")
const { Op } = require("sequelize")


app.post("/adicionar", verificadorDeSessao,  async (req, res)=>{

    const {idAdvogado, data} = req.body
    let id = req.session.userId


    if(idAdvogado && data && id ){

            const SolicitadoExiste = await Advogado.findByPk(idAdvogado)
            let consultaIndisponivel = await Consulta.findOne({where:{idAdvogado, para : data}})
            consultaIndisponivel = consultaIndisponivel ? true : false

            const horario = (await Horario.findOne()).toJSON()
            let intervaloDeHoraEMinutos = horario.horario.split(",")[0].split(":")
            let horaEMinutosIniciais = (horario.horario.split(",")[1].split(":"))
            let horaEMinutosFinal = (horario.horario.split(",")[1].split(":"))

            function horaEmMilsegundos(hora){
                return (parseInt(hora[0]) * 60 + parseInt(hora[1])) * 60 * 1000
            }

            const  intervaloEmMilisegundos = horaEmMilsegundos(intervaloDeHoraEMinutos)
            const horaInicialEmMilisegundos = horaEmMilsegundos(horaEMinutosIniciais)
            const horaFinalEmMilisegundos = horaEmMilsegundos(horaEMinutosFinal)


            const dataPropostoEmMilisegundos = (new Date(data)).getTime()
            const hoje = (new Date()).getTime()
            
            const prazoCorreto = (dataPropostoEmMilisegundos > hoje  && dataPropostoEmMilisegundos < (hoje + 7 * 24 * 60 * 60 * 1000)  )
         


            if(SolicitadoExiste && !(consultaIndisponivel) ){

                await Consulta.create({idUser: id, para : data , idAdvogado })
                res.send(["sucesso", "consulta enviada com sucesso"])

            }else{
                console.log(SolicitadoExiste, consultaIndisponivel)
                res.send(["erro", "Solicitante inexistente"])
            }

    }else{

        res.send(["erro", "dados imcompletos"])
    }
  
})


app.put("/atualizar",   async(req, res)=>{

    const {idAdvogado, dia, hora, idConsulta} = req.body
    const id = req.session.userId

    if(idAdvogado && dia && hora  && idConsulta){
        
        const consultaExiste = await Consulta.findOne({ where: {
            idUser: id,
            id: idConsulta
        }})

        if(consultaExiste){

            const novoSolicitadoExistente = await Advogado.findByPk(idAdvogado)

            if(novoSolicitadoExistente){

                const idNovoAdvogado = novoSolicitadoExistente.toJSON().id

                await Consulta.update({dia, hora, idAdvogado : idNovoAdvogado}, {where:{
                    id: idConsulta,
                }})
                res.send(["sucesso", "dados atualizado com sucesso"])

            }else{
                res.send(["erro", "novo solicitante não existente"])
            }

        }else{

            res.send(["erro", "dados incorretos"])
        }


    }else{

        res.send(["erro", "dados imcompletos"])
    }
})


app.get("/minhasConsultas", async (req,res)=>{

    try {
        const id = req.session.userId
    
        let consultas = await Consulta.findOne({where: {idUser: id}})
        consultas = consultas  ? consultas  :  []
    
        res.send(consultas)
        
    } catch (error) {

        console.log(error)

        res.send(["erro", "erro ao buscar consultas"])
    }
})


app.get("/consultasAtivas", async (req, res)=>{

    
    const consultas = await Consulta.findAll({where:{ estado : {[Op.or]:["enviado", "lido"]}}, attributes:["id", "idAdvogado", "idUser", "para"]})

    if(consultas.length > 0){

        let itens = JSON.parse(JSON.stringify(consultas))
        let consultasAtualizados = []
        let paresDeUsersEAdvogados = []

        
        itens.forEach( async (item, i)=>{
           
            const dataDaConsulta = new Date(item.para).valueOf()
            const dataDeHoje = new Date().valueOf()
            console.log(item, "itens")

            
            if(dataDeHoje > dataDaConsulta){

                await Consulta.update({estado : "cancelado"}, {where: {id : item.id}})

            }else{

                
                const user = (await User.findByPk(item.idUser,{attributes: ["nome", "sobrenome"]})).toJSON()
                const advogado = (await Advogado.findByPk(item.idAdvogado , {attributes:["nome"]})).toJSON()
    
                consultasAtualizados.push(item)
                paresDeUsersEAdvogados.push({user, advogado})
            }


            if(i == (itens.length - 1)){
                res.send([consultasAtualizados, paresDeUsersEAdvogados]) 
            }
     
        })

           
              



    }else{

        
        res.send([])
    }
})


app.get("/historicoDoUser", async (req, res)=>{

    const idUser =  req.session.userId
  
    const consultas = await Consulta.findAll({where:{ estado : {[Op.or]:["atendido", "cancelado"]}, idUser: idUser  }})

    console.log(consultas)

    if(consultas.length > 0){

        let itens = JSON.parse(JSON.stringify(consultas))
        let consultasAtualizados = []
        let paresDeUsersEAdvogados = []

        
        itens.forEach( async (item, i)=>{
           
            const dataDaConsulta = new Date(item.para).valueOf()
            const dataDeHoje = new Date().valueOf()
   
            const user = (await User.findByPk(item.idUser,{attributes: ["nome", "sobrenome"]})).toJSON()
            const advogado = (await Advogado.findByPk(item.idAdvogado , {attributes:["nome"]})).toJSON()
    
            consultasAtualizados.push(item)
            paresDeUsersEAdvogados.push({user, advogado})
            


            if(i == (itens.length - 1)){
                res.send([consultasAtualizados, paresDeUsersEAdvogados]) 
            }
     
        })

    }else{

        
        res.send([])
    }
})


app.get("/lerMinhasConsultasAtivasAdvogado", async (req, res)=>{



    const idAdvogado = await  req.session.idAdvogado

    const consultas = await Consulta.findAll({where:{ estado : {[Op.or]:["enviado", "lido"]}, idAdvogado : idAdvogado }})

    if(consultas.length > 0){

        let itens = JSON.parse(JSON.stringify(consultas))
        let consultasAtualizados = []
        let paresDeUsersEAdvogados = []

        
        itens.forEach( async (item, i)=>{
           
            const dataDaConsulta = new Date(item.para).valueOf()
            const dataDeHoje = new Date().valueOf()

            
            if(dataDeHoje > dataDaConsulta){

                await Consulta.update({estado : "cancelado"}, {where: {idAdvogado : item.idAdvogado}})
            }else{

                
                const user = (await User.findByPk(item.idUser,{attributes: ["nome", "sobrenome"]})).toJSON()
                const advogado = (await Advogado.findByPk(item.idAdvogado , {attributes:["nome"]})).toJSON()
    
                consultasAtualizados.push(item)
                paresDeUsersEAdvogados.push({user, advogado})
            }


            if(i == (itens.length - 1)){
                res.send([consultasAtualizados, paresDeUsersEAdvogados]) 
            }
     
        })

           
              



    }else{

        
        res.send([])
    }
})


app.get("/lerMinhasConsultasAtivasUser", async (req, res)=>{

    const idUser =  req.session.userId
  
    const consultas = await Consulta.findAll({where:{ estado : {[Op.or]:["enviado", "lido"]}, idUser: idUser  }})

    console.log(consultas)

    if(consultas.length > 0){

        let itens = JSON.parse(JSON.stringify(consultas))
        let consultasAtualizados = []
        let paresDeUsersEAdvogados = []

        
        itens.forEach( async (item, i)=>{
           
            const dataDaConsulta = new Date(item.para).valueOf()
            const dataDeHoje = new Date().valueOf()

            
            if(dataDeHoje > dataDaConsulta){

                await Consulta.update({estado : "cancelado"}, {where: {idAdvogado : item.idAdvogado}})
            }else{

                
                const user = (await User.findByPk(item.idUser,{attributes: ["nome", "sobrenome"]})).toJSON()
                const advogado = (await Advogado.findByPk(item.idAdvogado , {attributes:["nome"]})).toJSON()
    
                consultasAtualizados.push(item)
                paresDeUsersEAdvogados.push({user, advogado})
            }


            if(i == (itens.length - 1)){
                res.send([consultasAtualizados, paresDeUsersEAdvogados]) 
            }
     
        })

           
              



    }else{

        
        res.send([])
    }
})

app.get("/historicoRecente", async (req, res)=>{

        
    const consultas = await Consulta.findAll({where:{ estado : {[Op.or]:["atendido", "cancelado"]}}})

    
    if(consultas.length > 0){

        let itens = JSON.parse(JSON.stringify(consultas))
        let consultasAtualizados = []
        let paresDeUsersEAdvogados = []

        
        itens.forEach( async (item, i)=>{
           
            const dataDaConsulta = new Date(item.para).valueOf()
            const dataDeHoje = new Date().valueOf()
   
            const user = (await User.findByPk(item.idUser,{attributes: ["nome", "sobrenome"]})).toJSON()
            const advogado = (await Advogado.findByPk(item.idAdvogado , {attributes:["nome"]})).toJSON()
    
            consultasAtualizados.push(item)
            paresDeUsersEAdvogados.push({user, advogado})
            


            if(i == (itens.length - 1)){
                res.send([consultasAtualizados, paresDeUsersEAdvogados]) 
            }
     
        })

    }else{

        
        res.send([])
    }
})



app.get("/lerConsultas", async (req, res)=>{

    const users = await Consulta.findAll()
    res.send(users)
})


app.post("/lerConsultasAtivasDeUmAdvogado", async (req, res)=>{

    const {id} = req.body

    const consultas = await Consulta.findAll({where:{idAdvogado: id, estado : {[Op.or]:["enviado", "lido"]}}})
    

    if(consultas.length > 0){

        let itens = JSON.parse(JSON.stringify(consultas))
        let itensAtualizados = []

        itens.forEach( async (item)=>{

            

            const dataDaConsulta = new Date(item.para).valueOf()
            const dataDeHoje = new Date().valueOf()

            console.log(dataDaConsulta, dataDeHoje)

            if(dataDeHoje > dataDaConsulta){

                await Consulta.update({estado : "cancelado"}, {where: {idAdvogado : item.idAdvogado}})
            }else{

                itensAtualizados.push(item)
            }
     
        })

        
   
        res.send(itensAtualizados) 


    }else{
        
        res.send([])
    }
})



module.exports = app