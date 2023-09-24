
const Admin = require("../database/admin/admin")
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const path = require("path")


function verificadorDeSessao(req, res, next){

    if(req.session.user){
      next()

    }else{
      
      res.sendFile(path.join(__dirname, "..", "adminPages", "login.html"))
    }

}


app.post("/addAdmin",   async (req, res)=>{

    const todosAdmins = await Admin.findAll()
    if(!(todosAdmins.length > 0)){

      let {username, senha} = req.body

      if(username && senha){

        try {

          senha = await bcrypt.hash(senha, 10)

          await Admin.create({username, senha}) 
          res.redirect("/admin/adminLogado")
          
        } catch (error) {

          res.send(["erro", "erro ao criar novo administrador"])
          
        }

      }else{
          res.send(["erro", "insira os dados corretos"])
      }

    }else{

      res.send(["erro", "erro ao tentar..."])
    }
})

app.get("/adminLogado", async (req, res)=>{


  if(req.session.userId){

    res.sendFile(path.join( __dirname, ".." ,"public", "dashboard.html"))

  }else{

    const admins = await Admin.findAll()

    
    if(admins.length > 0){
      
      res.sendFile(path.join(__dirname, "..", "adminPages", "login.html"))

    }else{

      res.sendFile(path.join(__dirname, "..", "adminPages", "addAdmin.html"))
    }
  }
})

app.get("/criarConta",  (req, res)=>{


  if(req.session.userId){

    res.sendFile(path.join( __dirname, ".." ,"adminPages", "dashboard.html"))

  }else{

      
      res.sendFile(path.join(__dirname, "..", "adminPages", "criarConta.html"))
      
  }
})


app.get("/advogadosAdmin", verificadorDeSessao, (req, res)=>{

  res.sendFile(path.join(__dirname,"..", "adminPages", "advogadosAdmin.html"))
})



app.get("/postsAdmin", verificadorDeSessao,  (req, res)=>{

  res.sendFile(path.join(__dirname,"..", "adminPages", "postsAdmin.html"))
})

app.get("/criarPost", verificadorDeSessao,  (req, res)=>{

  res.sendFile(path.join(__dirname,"..", "adminPages", "criarPost.html"))
})









module.exports = app