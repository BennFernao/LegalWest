function verificadorDeSessaoSuperAdmin(req, res, next){

    const path = require("path")

    console.log("Autorizado")
    

    if(req.session.privilegio == "superAdmin"){
        console.log("Autorizado")
        next()
  
    }else{
        console.log("não autorizado")
        res.send(["erro", "Não autorizado"])
      }
  }
  
  module.exports = verificadorDeSessaoSuperAdmin