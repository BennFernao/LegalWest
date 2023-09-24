function verificadorDeSessaoAdmin(req, res, next){

    const path = require("path")
    
      if(req.session.privilegio == "admin"){
        next()
  
      }else{
        
        res.sendFile(path.join(__dirname, "..", "adminPages", "login.html"))
      }
  }
  
  module.exports = verificadorDeSessaoAdmin