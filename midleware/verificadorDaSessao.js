function verificadorDeSessao(req, res, next){

  const path = require("path")



    if(req.session.userId){
      next()

    }else{
      
      res.redirect("/user/login")
    }
}

module.exports = verificadorDeSessao