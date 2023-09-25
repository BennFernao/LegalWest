const User = require("../database/user/model")
const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const path = require("path")
let chance =  require("chance")
chance = new chance()

const Advogado = require("../database/advogado/model")


const verificadorDaSessaoUser = require("../midleware/verificadorDaSessao")
const verificadorDaSessaoSuperAdmin = require("../midleware/verificadorDaSessaoSuperAdmin")
const enviarEmail = require("../email/nodemail")

// verificar se o user possui sessao logado
app.get("/verificarUser", (req, res)=>{

    if(req.session.userId){
        res.send({nome: req.session.nomeDoUser})

    }else{
        res.send(["erro"])
    }
})

// adicionar um user
app.post("/adicionarUser", async (req, res)=>{

    const {nome, sobrenome,  email, telefone} = req.body
    let {senha} = req.body

    if( nome && sobrenome && senha && email && telefone){

            const emailExiste = await User.findOne({where: { email}})

            if(emailExiste){
                res.send(["erro", "email já cadastrado"])
            }else{

                try {
                    senha = await bcrypt.hash(senha, 10)
                    await User.create({nome, sobrenome, email, senha, telefone})
                    res.send(["sucesso", "user criado com sucesso"])
                    
                } catch (error) {
                    
                    res.send(["erro", "erro ao proceder com a operação, mais tarde"])  
                }
        }}
    else{
        res.send(["erro", "dados imcompletos"])
    }
})


app.post("/adicionarUserAdmin", verificadorDaSessaoSuperAdmin, async (req, res)=>{

    const {nome, sobrenome,  email, telefone, idAdvogado} = req.body

    if( nome && sobrenome && idAdvogado && email && telefone){

        const emailExiste = await User.findOne({where: { email}})

        if(emailExiste){
            res.send(["erro", "email já cadastrado"])
        }else{

            try {
                
                    let senha = chance.string({length: 8, symbols: false})
                    

                    const conteudo = `<h1> username : ${email} </h1> <h1> password : ${senha} </h1>`
                    await enviarEmail(process.env.nossoEmail, email, "LegalWest", conteudo )

                    senha = await bcrypt.hash(senha, 10)
                    const user = await User.create({nome, sobrenome, email, senha, telefone, privilegio : "admin"})

                    await Advogado.update({IdUser: user.id}, {
                        where:{
                            id : idAdvogado
                        }
                    })

                    res.send(["sucesso", "admim criado com sucesso"])


            } catch (error) {
                res.send(["erro", "erro ao adicionar o user"])
            }}
        }else{

            res.send(["erro", "dados imcompletos"])
    }
})


app.post("/login", async (req, res)=>{

    const {email, senha}  = req.body

    if(email && senha){

            const  usuarioExiste = await User.findOne({where:{
                email
            }})

            if(usuarioExiste){

                let senhaEncriptada = usuarioExiste.toJSON().senha
                const senhaCorreta = await bcrypt.compare(senha, senhaEncriptada)

                if(senhaCorreta){

                    req.session.privilegio = usuarioExiste.toJSON().privilegio

                    if(req.session.privilegio == "admin"){

                        const {id: idAdvogado} = await Advogado.findOne({where: {IdUser : usuarioExiste.toJSON().id}, attributes:["id"]})
                        req.session.idAdvogado = idAdvogado
                    
                    }

                    
                    req.session.userId = usuarioExiste.toJSON().id
                    req.session.nomeDoUser = usuarioExiste.toJSON().nome
                    req.session.sobrenomeDoUser = usuarioExiste.toJSON().sobrenome
                    res.send(["sucesso", "autorizado"])

                }else{

                    res.send(["erro", "nao autorizado"])
                }

            }else{

                res.send(["erro", "falha ao fazer o login"])

            }

    }else{

            res.send(["erro", "dados imcompletos"])
        }
})

app.get("/logar", async (req, res)=>{

    if(req.session.userId){ 
      
        res.redirect("/api/user/dashboard")
  
    }else{
              
        res.sendFile(path.join(__dirname, "..", "adminPages", "login.html"))
    }
})


app.put("/atualizar" , verificadorDaSessaoUser ,  async(req, res)=>{

    const {nome, email, telefone, sobrenome } = req.body
    const id = req.session.userId

    if(nome && email && telefone && sobrenome){

        try {

            await User.update({nome, email, telefone, sobrenome}, {
                where:{
                    id
                }
            })
    
            res.send(["sucesso", "dados atualizado com sucesso"])
            
        } catch (error) {

            res.send(["erro", "erro ao atualizar dados"])
            
        }
    }else{

        res.send(["erro", "dados imcompletos"])
    }
})


app.put("/atualizarSenha" , verificadorDaSessaoUser ,  async(req, res)=>{

    const {senhaAtual, novaSenha }= req.body
    const id = req.session.userId

    if(senhaAtual && novaSenha){

        try {

            const senhaEncriptada = (await User.findByPk(id)).toJSON().senha
            const senhaCorreta = await bcrypt.compare(senhaAtual, senhaEncriptada)

            if(senhaCorreta){
                const novaSenhaEncriptada = await bcrypt.hash(novaSenha, 10)

                await User.update({senha : novaSenhaEncriptada}, {
                    where:{
                        id
                    }
                })
        
                res.send(["sucesso", "dados atualizado com sucesso"])

            }else{

                res.send(["erro", "senha atual incorreta"])

            }
     
        } catch (error) {

            res.send(["erro", "erro ao atualizar dados"])
            
        }
    }else{

        res.send(["erro", "dados imcompletos"])
    }
})


app.post("/advogado/:id", verificadorDaSessaoSuperAdmin,async (req, res)=>{
 
    try {

        const advogado = (await Advogado.findByPk(req.params.id)).IdUser
        let user  = (await User.findByPk(advogado)) 
        
        user = user ? user : []
        res.send(user)
        
    } catch (error) {
        
        res.send(["erro", "falha ao proceder"])
        
    }
})


app.get("/dashboard", verificadorDaSessaoUser ,(req, res)=>{

    const privilegio = req.session.privilegio
    const privilegios = ["user", "admin", "superAdmin"]

    if(privilegio == privilegios[0]){

        res.sendFile( path.join(__dirname, "..", "adminPages", "dashboardUser1.html"))
        
    }else if(privilegio == privilegios[1] ){

        res.sendFile( path.join(__dirname, "..", "adminPages", "dashboardAdmin1.html"))

    }else if(privilegio == privilegios[2]){

        res.sendFile( path.join(__dirname, "..", "adminPages", "dashboardSuperAdmin.html"))
    }
})

app.get("/teste", (req, res)=>{

    console.log("ok", __dirname)
    res.send({nome: "ben"})
})


app.get("/lerUsers", verificadorDaSessaoSuperAdmin,  async (req, res)=>{

    const users = await User.findAll()
    res.send(users)
})

app.get("/lerUser", verificadorDaSessaoUser, async (req, res)=>{

    const id = req.session.userId
    try {
        
        const {nome, sobrenome, email, telefone} = (await User.findByPk(id, {attributes:["nome", "sobrenome", "email", "telefone"]})).toJSON()
        res.send({nome, sobrenome, email, telefone})
    } catch (error) {

        res.send(["erro", "erro ao buscar o user"])
    }
})


app.get("/logout", verificadorDaSessaoUser, (req, res)=>{

    try {
       
      req.session.destroy() 
      res.redirect("/")
      
    } catch (error) {
    
      res.redirect("/api/user/dashboard")
    }
})


module.exports = app