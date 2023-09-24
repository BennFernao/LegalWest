const express = require("express")
const app = express()
const enviarEmail = require("../email/nodemail")
const validator = require("validator")
const Email = require("../database/email/email")
require("dotenv").config()


app.post("/entrarEmContacto", async (req, res)=>{

    const {email, nome, assunto, mensagem  } = req.body

    if(email && nome && assunto && mensagem ){
        
        const html = `
        
        <h1> Um pedido de contacto </h1>
        <p> <strong> Nome :  ${nome} </strong> , Email : ${email},  Assunto:  ${assunto} </strong> </p>
        <p> Mensagem : ${mensagem} </p>
        `

        try {

             await enviarEmail(process.env.nossoEmail, email, assunto, html )
            res.send(["sucesso"])
            
            
        } catch (error) {
            console.log(error)
            res.send(["erro", "Erro ao entrar em contacto, tente novamente"])
        }
    }else{

        res.send(["erro", "preencha todos os dados"])
    }

})

app.post("/fazerUmPedido", async (req, res)=>{


    const {nome , email , servico , hora , data } = req.body

    if(email && nome && servico && hora && data ){
        
        const html = `
        
        <h1> Pedido de um servico </h1>
        <p> <strong> Nome :  ${nome} </strong> , Email : ${email},  Assunto:  ${servico} </strong> </p>
        <p> Data : ${data} </p>
        <p> Hora : ${hora}</p>
        `

        try {

             await enviarEmail(process.env.nossoEmail, email, "pedido de um serviço", html )
            res.send(["sucesso", "enviado com sucesso"])
            
            
        } catch (error) {
            console.log(error)
            res.send(["erro", "Erro ao entrar em contacto, tente novamente"])
        }
    }else{

        res.send(["erro", "preencha todos os dados"])
    }

})


app.post("/subscrever", async (req, res)=>{

    const {email } = req.body 

    if(email){

        const eValido = await validator.isEmail(email)
        if(eValido){
            
            try {

                const emailExistente = await Email.findOne({where:{
                    email
                }})

                if(!emailExistente){

                    await Email.create({email})
                    res.send(["sucesso", "email subscrito com sucesso"])
                }else{

                    res.send(["erro", "email já subscrito"])
                }


                
            } catch (error) {
                res.send(["erro", "erro ao subscrever"])
            }
        }else{

            res.send(["erro", "email inváilido"])
        }
    }else{

        res.send(["erro", "insira o seu email"])
    }

})


module.exports = app