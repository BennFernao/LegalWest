function verificadorDeSessao(req, res, next){

  const path = require("path")



    if(req.session.userId){
      next()

    }else{
      
      res.redirect("/api/user/logar")
    }
}

module.exports = verificadorDeSessao