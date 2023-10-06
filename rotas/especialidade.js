
const express = require("express")
const app = express()
const Especialidade = require("../database/especialidade/model")
const path = require("path")

const multer = require("multer")
const verificadorDeSessao = require("../midleware/verificadorDaSessao")
const Advogado = require("../database/advogado/model")
const User = require("../database/user/model")
const verificadorDeSessaoSuperAdmin = require("../midleware/verificadorDaSessaoSuperAdmin")


app.post("/adicionar",verificadorDeSessaoSuperAdmin,  async (req , res)=>{

    const {nome} = req.body
    
    
    if(nome ){

        try {
   
             await Especialidade.create({nome})
            res.send(["sucesso", "especialidade adicionado com sucesso"])
            
        } catch (error) {
                        res.send(["erro", "erro ao salvar os dados"])         
        }

    }else{
        
        res.send(["erro", "erro na introdução dos dados"])
    }
})


app.post("/associarAdvogados",verificadorDeSessaoSuperAdmin,  async (req , res)=>{

    const {itensAdicionais, idEspecialidade} = req.body
    
    if(itensAdicionais && idEspecialidade){

        const advogados = []

        try {

            itensAdicionais.forEach(async (id) => {

                const advogado = await Advogado.findByPk(id)
                advogados.push(advogado)
                
            });

            const especialidade = await Especialidade.findByPk(idEspecialidade)
            
            await especialidade.addAdvogados(advogados)
            const adv = await especialidade.getAdvogados()
            console.log(adv)
            
            res.send(["sucesso", "associação feita com sucesso"])
            
        } catch (error) {
                        console.log(error)
                        res.send(["erro", "erro ao salvar os dados"])         
        }

    }else{
        
        res.send(["erro", "erro na introdução dos dados"])
    }
})

app.post("/desassociarAdvogados",verificadorDeSessaoSuperAdmin,  async (req , res)=>{

    const {itensEliminatorios, idEspecialidade} = req.body
    
    
    if(itensEliminatorios && idEspecialidade){

        const advogados = []

        try {

            itensEliminatorios.forEach(async (element) => {

                const advogado = await Advogado.findByPk(element)
                advogados.push(advogado)
                
            });

            const especialidade = await Especialidade.findByPk(idEspecialidade)
            await especialidade.removeAdvogados(advogados)
            
            res.send(["sucesso", "Desassociação feita com sucesso"])
            
        } catch (error) {

            console.log(error)

            res.send(["erro", "erro ao salvar os dados"])         
        }

    }else{
        
        res.send(["erro", "erro na introdução dos dados"])
    }
})


app.get("/obterEspeciadade/:id", async (req, res)=>{

    const id = req.params.id 

    try {
    
        let especialidade = await Especialidade.findByPk(id)
        if(especialidade){

            res.send(especialidade)

        }else{
                especialidade = []
                res.send(especialidade)
        }
            
    } catch (error) {
        
        res.send(["erro", "erro ao ler o advogado, tente novamente"])
    }
})



app.get("/lerEspecialidades", async (req , res)=>{

    try {        
            let todasEspecialidades = await Especialidade.findAll()
            todasEspecialidades = JSON.parse(JSON.stringify(todasEspecialidades))      
            res.send(todasEspecialidades)
            
    } catch (error) {

            console.log(error)
            
            res.send(["erro", "erro ao buscar os dados"])  
        }
})

app.get("/lerAdvogados/:idEspecialidade", async (req , res)=>{
        
    try {        
            const id = req.params.idEspecialidade         

            let especialidade = await Especialidade.findByPk(id)
            let todosAdvogadosEspecializados = await especialidade.getAdvogados()   
            
            todosAdvogadosEspecializados =  todosAdvogadosEspecializados.length > 0 ? todosAdvogadosEspecializados : []
            
            res.send(todosAdvogadosEspecializados)
            
    } catch (error) {
            
            res.send(["erro", "erro ao buscar os dados"])
        }
})
    

app.get("/lerAdvogadosEspecializados/:idEspecialidade", async (req , res)=>{
        
    try {        
            const id = req.params.idEspecialidade


            let todosAdvogados = await Advogado.findAll()
            todosAdvogados = todosAdvogados.length > 0 ? todosAdvogados : []
            

            let especialidade = await Especialidade.findByPk(id)
            let todosAdvogadosEspecializados = await especialidade.getAdvogados()   
            
            todosAdvogadosEspecializados =  todosAdvogadosEspecializados.length > 0 ? todosAdvogadosEspecializados : []
            
            res.send([todosAdvogadosEspecializados, todosAdvogados])
            
    } catch (error) {
            res.send(["erro", "erro ao buscar os dados"])
        }
})

app.get("/associarAdvogado/:idEspecialidade/:idAdvogado",verificadorDeSessaoSuperAdmin, async (req , res)=>{
        
    try {        
     
            const idEspecialidade = req.params.idEspecialidade
            const idAdvogado = req.params.idAdvogado

            if(idAdvogado && idEspecialidade){                
                const advogado = await Advogado.findByPk(idAdvogado)

                let especialidade = await Especialidade.findByPk(idEspecialidade)
                await especialidade.addAdvogado(advogado)   
                
                
                res.send(["sucesso", "associação feita com sucesso"])

            }else{

                res.send(["erro", "dados imcompletos"])
            }
            
    } catch (error) {

            res.send(["erro", "erro ao buscar os dados"])
        }
})


app.put("/editarEspecialidade/:id",verificadorDeSessaoSuperAdmin, async (req, res)=>{

    const {nome} = req.body
    const id = req.params.id

    try {

        

        if(nome){

            await Especialidade.update({nome}, {
                where:{
                    id
                }
            })
    
            
            res.send(["sucesso", "Dados atualizados com sucesso"])

        }else{

            res.send(["erro", "dados imcompletos"])
        }
   
    } catch (error) {

        res.send(["erro", "erro ao buscar os dados"])  
    }
})

app.delete("/deletarEspecialidade/:id",verificadorDeSessaoSuperAdmin, async (req, res)=>{

    const id = req.params.id

    try {

        await Especialidade.destroy({where:{   id   }})

        res.send(["sucesso", "especialidade eliminado com sucesso"])
        
    } catch (error){

        res.send(["erro", "erro ao buscar os dados"])
    }
})

module.exports = app