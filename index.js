require("dotenv").config()

// importacao de bibliotecas necessárias
const express = require("express")
const app = express()
const {createServer} = require("http")
const server = createServer(app)
const {Server} = require("socket.io")
const io = new Server(server)
const path = require("path")
const fs = require("fs")


// importacao da connecao ao banco de dados
const connetion = require("./database/connection")

const redisClient = require("./redis/connect")
const connect_redis = require("connect-redis").default
const redisStore = new  connect_redis({client:redisClient})

const session = require('express-session');

// abrindo cors
const cors = require("cors")

// Middlewares
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: [process.env.dominio],
    credentials: true
}))

    // Inicialização do middleware express expression
app.use(session({
  secret: process.env.secretForSession,
  resave: false,
  saveUninitialized: true,
  cookie : {maxAge : 1000*60*60*24, httpOnly:true}, // 1 dia
  store: redisStore
}));



// importacao de todas os endpoints
const lawyerEndpoints = require("./rotas/advogados")
const postsEndpoints = require("./rotas/resumoDoPost")
const adminEndpoints = require("./rotas/admin")
const emailEndpoints = require("./rotas/emails")
const userEndpoints = require("./rotas/user")
const consultaEndpoints = require("./rotas/consulta")
const horarioEndpoints = require("./rotas/horario")
const especialidadeEndpoints = require("./rotas/especialidade")
const meetEndpoints = require("./rotas/meet")


// middlewares
app.use("/lawyers" , lawyerEndpoints)
app.use("/posts", postsEndpoints)
app.use("/admin", adminEndpoints)
app.use("/email", emailEndpoints)
app.use("/user", userEndpoints)
app.use("/consulta", consultaEndpoints)
app.use("/horario", horarioEndpoints)
app.use("/especialidade", especialidadeEndpoints)
app.use("/meet", meetEndpoints)


// Importação de todos modelos dos banco de dados
const lawyerModel = require("./database/advogado/model")
const postModel = require("./database/posts/post")
const adminModel = require("./database/admin/admin")
const Email = require("./database/email/email")
const User = require("./database/user/model")
const Consulta = require("./database/consulta/consultas")
const Horario = require("./database/horarios/model")
const Especialidade = require("./database/especialidade/model")



io.engine.use(session({
    secret: process.env.secretForSession,
    resave: false,
    saveUninitialized: true,
    cookie : {maxAge : 1000*60*60*24, httpOnly:true}, // 1 dia
    store: redisStore
  }))


const usersAtivos = []


io.use((socket, next)=>{

    const userId = socket.request.session.userId

    if(userId){

            if(usersAtivos.includes(userId)){
                next(new Error("feche  demais janelas para continuares"))
            }else{

                usersAtivos.push(userId)
                next()

            }

    }else{

        const error = new Error("Não permitido")
        next(error)
    }
})


io.on("connection", (socket)=>{

    console.log("conectado", socket.request.session, socket.id)
    
    socket.on("disconnect", ()=>{
        const userId = socket.request.session.userId
        const indiceDoIdDoUser = usersAtivos.indexOf(userId)
        usersAtivos.splice(indiceDoIdDoUser, 1)
        console.log("desconectado", usersAtivos)
    })
})



// lib para upload de ficheiros
const multer = require("multer")
const storage = multer.diskStorage({

    destination: function(req, file, cb){

        cb(null, path.join(__dirname, "./public/img") )
    } ,
    filename: function(req, file, cb){
        
        const extensao =  file.originalname.match( /\.([^.]+)$/gmi)[0]
        
        const numeroAleatorio = Date.now()
        
        
        const nomeDoArquivo = `${numeroAleatorio}.${extensao}`
       



        cb(null, nomeDoArquivo)
    }
})

const upload = multer({storage})



// inicializar o app, gravando os dados padrão
async function inicializarApp(){

    const horarioPadrao = ["01:30","08:00", "20:00"].toString()
    const diasDeAtuacaoPadrao = [1,1,1,1,1,0,1].toString()

    try {
        const horarios = await Horario.findAll()
        const users = await User.findAll()
        
        if(horarios.length == 0){
            await Horario.create({dias: diasDeAtuacaoPadrao, horario: horarioPadrao})
            console.log("Horário default criado com sucesso")
        }

        if(users.length == 0){
            const bcrypt = require("bcrypt")

            const nome = process.env.nome 
            const sobrenome = process.env.sobrenome
            const email = process.env.email 
            const telefone = process.env.telefone
            let senha = process.env.senha 
            senha = await bcrypt.hash(senha, 10)
    
            await User.create({nome, sobrenome,  email, telefone, senha, privilegio : "superAdmin"})
        }


    } catch (error) {
        console.log(error)
        console.log("Erro ao criar o horário default")
        
    }
}


connetion.sync({alter: true})
                .then(()=>{
                        inicializarApp()
                        console.log("Banco de dados inicializado com sucesso")
                    })
                .catch((erro)=>{
                        console.log("Erro ao inicializar o banco de dados", erro)
                    })




//
app.get("/suasImagens", (req, res)=>{

    try {
    
    let nomesDosArquivos = ""
    let tipos = ""
        
    fs.readdir(__dirname + "/public/img", (err, arquivos)=>{


        res.send(arquivos)
    })



    } catch (error) {

        res.send([])
            
    }
})


// ??
app.get("/", (req, res)=>{

    res.send({nome: "ben"})
})


// ??
app.post("/upload", upload.single("imagem") ,async (req, res)=>{

    console.log(req.file)

    if(req.file.filename){
        res.send(["sucesso", "adicionado com sucesso"])
    }else{
        res.send(["erro", "erro ao adicionar o ficheiro"])
    }
})


app.get("/marcarConsulta", (req, res)=>{


    if(req.session.userId){

        res.sendFile(path.join(__dirname,  "otherPages", "marcarConsulta.html"))

    }else{

        res.sendFile(path.join(__dirname,  "otherPages", "loginParaConsulta.html"))
        
    }
    
})

app.get("/enmarcarConsulta", (req, res)=>{


    if(req.session.userId){

        res.sendFile(path.join(__dirname,  "otherPages", "marcarConsultaen.html"))

    }else{

        res.sendFile(path.join(__dirname,  "otherPages", "loginParaConsultaen.html"))
        
    }
    
})

app.get("/enerrorPage", (req, res)=>{
    console.log("ok")
    res.sendFile(path.join(__dirname, "errorPages", "enerrorPage.html"))
})


app.get("/meetCancelado", (req, res)=>{

    res.sendFile(path.join(__dirname,  "errorPages", "erroMeetCancelado.html"))
   
})

app.get("/meetAtendido", (req, res)=>{

    res.sendFile(path.join(__dirname,  "errorPages", "erroMeetRealizado.html"))
   
})

app.get("/meetInexistente", (req, res)=>{

    
    res.sendFile(path.join(__dirname,  "errorPages", "erroMeet.html"))
})


app.get("/ben", async (req, res)=>{


    const users =  await User.findAll()
    res.send({users})
})



app.all("*", (req, res)=>{

    // Qualquer rota não definida retornará a página de erro
    res.sendFile(path.join(__dirname, "errorPages", "paginaNaoEncontrada.html"))
})

const PORT = process.env.PORT
server.listen(PORT, ()=> console.log(`Servidor inicializado na porta ${PORT}`))