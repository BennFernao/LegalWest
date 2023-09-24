function verificadorDeSessaoSuperAdmin(req, res, next){

    const path = require("path")
    
      if(req.session.privilegio == "superAdmin"){
        next()
  
      }else{
        
        res.sendFile(path.join(__dirname, "..", "adminPages", "login.html"))
      }
  }
  
  module.exports = verificadorDeSessaoSuperAdmin