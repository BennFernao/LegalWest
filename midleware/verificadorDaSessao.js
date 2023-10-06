function verificadorDeSessao(req, res, next){

    if(req.session.userId){
      next()

    }else{
      
      res.redirect("/api/user/logar")
    }
}

module.exports = verificadorDeSessao