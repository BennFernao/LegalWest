const Video = require("../database/video/model")
const express = require("express")
const app = express()

const path = require("path")
const verificadorDaSessaoUser = require("../midleware/verificadorDaSessao")
const verificadorDaSessaoSuperAdmin = require("../midleware/verificadorDaSessaoSuperAdmin")

const multer = require("multer")
const { Op } = require("sequelize")
const fs = require("fs")
const redisClient = require("../redis/connect")

const storage = multer.diskStorage({

    destination: function(req, file, cb){

        cb(null, path.join(__dirname, "../public/img") )
    } ,
    filename: function(req, file, cb){
        
        const extensao =  file.originalname.match( /\.([^.]+)$/gmi)[0]
        
        const numeroAleatorio = (Math.round((Number.MAX_SAFE_INTEGER * (Date.now()) * (Math.random())))).toString().slice(0,16)
        
        
        const nomeDoArquivo = `${numeroAleatorio}.${extensao}`
        console.log(nomeDoArquivo)



        cb(null, nomeDoArquivo)
    }
})

const upload = multer({storage})




// adicionar um user
app.post("/adicionarVideo", upload.fields([{name:"thumbnail", maxCount:1}, {name:"video", maxCount:1}]) ,async (req, res)=>{

    const {titulo, descricao} = req.body
    const video = req.files["video"][0]
    const thumbnail = req.files["thumbnail"][0]

    if(video && thumbnail && titulo && descricao){

        try {
            
        const {filename : srcVideo} = video 
        const {filename : srcThumbnail} = thumbnail

        await Video.create({titulo, descricao, srcVideo, srcThumbnail})
        res.send(["sucesso", "video salvo com sucesso"])

        } catch (error) {
            res.send(["erro", "erro ao salvar o video"])     
        }
    
    }
    else{
        res.send(["erro", "dados imcompletos"])
    }
})

app.get("/lerVideos",   async (req, res)=>{

    try {


        let videos_no_cache = await redisClient.get("videos")

        if(videos_no_cache){

            videos_no_cache = JSON.parse(videos_no_cache)
            res.send(videos_no_cache)
        }else{

            const videos = await Video.findAll()
            await redisClient.set("videos",JSON.stringify(videos))
            res.send(videos)
        }


    } catch (error) {

         res.send(["erro", "ocorreu um erro ao ler os videos"])         
    }
})


app.put("/atualizar/:id" ,   async(req, res)=>{

    const {titulo, descricao} = req.body
    const id = req.params.id

   

    if(titulo, descricao, id){

        try {

            await Video.update({titulo , descricao}, {
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



app.get("/lerVideo/:id",  async (req, res)=>{

    const id = req.params.id
    try {
        
        let video = await Video.findByPk(id)
        
        if(video){

            res.send(video)
        }else{
            res.send(["erro", "video nao encontrado"])
        }


    } catch (error) {

        res.send(["erro", "erro ao buscar o video"])
    }
})

app.delete("/deleteVideo/:id",  async (req, res)=>{

    const id = req.params.id

     if(id){

     try {

        let video  = await Video.findByPk(id)


        if(video){

            let {srcThumbnail, srcVideo} = video.toJSON()
            await Video.destroy({where:{id}})

            
            fs.unlink(path.join(__dirname, "..", "public", "img", srcThumbnail), (err)=>{
                if(err) console.log("erro ao deletar arquivo")
            })
            fs.unlink(path.join(__dirname, "..", "public", "img", srcVideo), (err)=>{
                if(err) console.log("erro ao deletar arquivo")
            })


            res.send(["sucesso", "Dados enviados com sucesso"])

                
        }else{

            res.send(["erro", "dados incorretos"])
        }

        } catch (error) {
    
            console.log(error)
            res.send(["erro", "erro ao deletar video"])    
        }

     }else{

        res.send(["erro", "dados incorretos"])
     }
})


app.get("/apresentarVideo/:id", async (req, res)=>{

    const id = req.params.id 
    

    if(id){

        const video = await Video.findByPk(id)

        if(video){

            const srcVideo = video.srcVideo 
            
            const outros_videos = await Video.findAll({limit:4})
          
            let conteudoParaOutrosVideos;

            if(outros_videos){
                
                conteudoParaOutrosVideos = outros_videos.reduce((total, item)=>{

                    const atag =`<a href="${item.id}">
                                    <img src="/img/${item.srcThumbnail}" style="width: 150px;height: 200px; "/>
                                 </a> `

                    return total + atag ; 
                    
                }, "<h6>Outros videos</h6><div>")
            }

            conteudoParaOutrosVideos += "  </div>" 

            let conteudo = `<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="utf-8">
                <title>LegalWest</title>
                <meta content="width=device-width, initial-scale=1.0" name="viewport">
                <meta content="Free HTML Templates" name="keywords">
                <meta content="Free HTML Templates" name="description">
            
                <!-- Favicon -->
                <link href="/img/logo.png" rel="icon">
            
                <!-- Google Web Fonts -->
                <link rel="preconnect" href="https://fonts.gstatic.com">
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@300;500;700&display=swap" rel="stylesheet"> 
            
                <!-- Font Awesome -->
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
            
                <!-- Libraries Stylesheet -->
                <link href="/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
                <link href="/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />
            
                <!-- Customized Bootstrap Stylesheet -->
                <link href="/css/style.css" rel="stylesheet">
            </head>
            
            <body>
                <!-- Header Start -->
                <div >
                    <!--Barra de contactos-->
                <div class=" bg-secondary border-bottom d-none d-lg-flex ">
                    <div class="col-lg-7 text-left">
                        <div class="h-100 d-inline-flex align-items-center py-2 px-3">
                            <i class="fa fa-envelope text-primary mr-2"></i>
                            <small class="text-primary">info@Legalwest.eu</small>
                        </div>
                        <div class="h-100 d-inline-flex align-items-center py-2 px-2">
                            <i class="fa fa-phone-alt text-primary mr-2"></i>
                            <small class="text-primary">Angola : + 244 937 579 404, Portugal : +351 21 317 36 60</small>
                        </div>
                    </div>
                    <div class="col-lg-5 text-right">
                        <div class="d-inline-flex align-items-center p-2">
                            <a class="btn btn-sm btn-outline-primary btn-sm-square mr-2" href="">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a class="btn btn-sm btn-outline-primary btn-sm-square mr-2" href="">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a class="btn btn-sm btn-outline-primary btn-sm-square mr-2" href="">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                            <a class="btn btn-sm btn-outline-primary btn-sm-square mr-2" href="">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a class="btn btn-sm btn-outline-primary btn-sm-square mr-2" href="">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            
            
                <!--Barra de navegação-->
                <div class="bg-secondary w-100">   
                    <nav class="navbar navbar-expand-lg   navbar-light " >
            
            
                        <!--Logotipo para ecras menores que lg-->
            
                        <a href="index.html" class="navbar-brand d-flex d-lg-none">
                            <img src="/img/LegalWest.png" alt="teste" class="img-fluid" width="120px" />              
                        </a>
            
                        <!--O botão toggle para ecras menores que lg-->
                        <button type="button" class="navbar-toggler bg-primary" data-toggle="collapse" data-target="#navbarCollapse">
                            <span class="navbar-toggler-icon"></span>
                        </button>
            
            
                        <!--NavBar collapse para telas menores que só aparecerão no lg-->
                        <div class="collapse w-100  " id="navbarCollapse">
                            <div class="d-sm-block d-lg-none">
                                <!--Navegação-->
                                <div class=" p-4">
                                    <div class="navbar-nav mr-auto py-0 ml-auto " >
                                        <a href="/index.html" class="nav-item nav-link  text-white">Home</a>
                                        <a href="/team.html" class="nav-item nav-link text-white">Equipa</a>
                                        <a href="/locations.html" class="nav-item nav-link text-white">Localizações</a>
                                        <a href="/contact.html" class="nav-item nav-link text-white">Contacto</a>
            
                                        <div class="nav-item dropdown" >
                                            <a href="#" class="nav-link dropdown-toggle active" data-toggle="dropdown">Quem somos</a>
                                            <div class="dropdown-menu rounded-0 m-0 bg-secondary">
                                                <a href="/service.html" class="dropdown-item text-white">Serviços</a>
                                                <a href="/about.html" class="dropdown-item text-white">informações</a> 
                                                <a href="/blog.html" class="dropdown-item text-white">Blog</a>
                                                <a href="/video.html" class="dropdown-item text-white">video</a>    
                                            </div>
                                        </div>
            
                                        <div class="d-flex justify-content-start align-items-start mt-3 ">
                                            <img src="/img/translate.svg" width="30px" />
                                        
                                            <div class ="navbar-nav mr-auto py-0 ml-3">   
                                                <div class="nav-item dropdown" >
                                                <div class="nav-link dropdown-toggle d-flex justify-content-center align-items-center" data-toggle="dropdown" >
                                                <div class="d-flex justify-content-center align-items-center">
                                                    <img src="/img/portugal.png" style="width: 20px; height: 20px;margin-right: 2px;"/> 
                                                    <a href="#"  >
                                                        Português
                                                    </a>
                                                </div>
                                                </div>
                                                    <div class=" dropdown-menu rounded-0 m-0">
                                                        <div class="d-flex justify-content-center align-items-center">
                                                            <img src="/img/english.png" style="width: 20px; height: 20px;margin-right: 2px;"/> 
                                                            <a href="/en/video.html" class="dropdown-item lang">English</a>
                                                        </div>                                
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
            
                                    </div>
                                </div>
            
                                <!--Div para a tradução-->
                                <a href="/api/marcarConsulta" class="btn btn-primary mr-5 ml-4 mb-2" >Marcar Consulta</a>
                                <div class="divLogin ml-4">
                                    <a href="/api/user/logar">
                                    <button class="btn btn-outline-primary mr-3">
                                        <div class="d-flex justify-content-center align-items-center">
                                            <img src="/img/user.svg" class="mr-2 usernameIcon" width="30px" />
                                            <span class="username">Entrar</span>
                                        </div>             
                                    </button>
                                </a>
                                </div>
                            </div>
                        </div>
            
            
                        <!--NavBar para telas lg e maiores-->
                        <div class="d-none d-lg-flex flex-row justify-content-start align-items-center w-100 " >
            
                            <!--Logotipo-->
                            <img src="/img/LegalWest.png" alt="Logotipo Legalwest" width="100px" class="img-fluid d-none d-lg-flex" >
            
                            <!--Navegacao-->
                            <div class="navbar-nav mr-auto py-0 " >
                                <a href="/index.html" class="nav-item nav-link text-white">Home</a>
                                <a href="/team.html" class="nav-item nav-link text-white">Equipa</a>
                                <a href="/locations.html" class="nav-item nav-link text-white">Localizações</a>
                                <a href="/contact.html" class="nav-item nav-link text-white">Contacto</a>
            
                                <div class="nav-item dropdown" >
                                    <a href="#" class="nav-link dropdown-toggle active" data-toggle="dropdown">Quem somos</a>
                                    <div class="dropdown-menu rounded-0 m-0 bg-secondary">
                                        <a href="/service.html" class="dropdown-item text-white">Serviços</a>
                                        <a href="/about.html" class="dropdown-item text-white">informações</a> 
                                        <a href="/blog.html" class="dropdown-item text-white">Blog</a>   
                                        <a href="/video.html" class="dropdown-item text-white">videos</a> 
                                    </div>
                                </div>
            
                            </div>
            
                            
                            <a href="/api/marcarConsulta" class="btn btn-primary mr-5" >Marcar Consulta</a>           
                            
            
                            <!--Div para tradução-->
                            <div class="d-flex mr-5">
                                <img src="/img/translate.svg" width="30px" />
                            
                                <div class ="navbar-nav mr-auto py-0 ml-auto">   
                                    <div class="nav-item dropdown " >
                                        <div class="d-flex justify-content-center align-items-center nav-link dropdown-toggle text-white" data-toggle="dropdown">
                                            <img src="/img/portugal.png"  style="width: 20px; height: 20px;margin-right: 2px;" />
                                            <a href="#" class="text-white" >
                                                Português
                                            </a>
                                            
                                        </div>
                                        <div class="dropdown-menu rounded-0 m-0 bg-secondary ">
            
                                            <div class="dropdown-item d-flex justify-content-center align-items-center  text-white" >
                                                <img src="/img/english.png" class=""  style="width: 20px; height: 20px;margin-right: 2px;" />
                                                <a href="/en/blog.html"  class="text-white" >
                                                    English
                                                </a>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
            
                            <!--Div para o login-->
            
                            <div class="divLogin1">
                                <a href="/api/user/logar">
                                <button class="btn btn-outline-primary mr-3">
                                    <div class="d-flex justify-content-center align-items-center">
                                        <img src="/img/user.svg" class="mr-2 usernameIcon1" width="30px" />
                                        <span class="username1">Entrar</span>
                                    </div>             
                                </button>
                            </a>
                            </div>
                        
                        </div>
                    </nav>
                </div>
            
            
            
            </div>
            <!-- Header End -->
            
            
            
                <!-- recent posts -->
                    <div class="p-5 d-flex flex-column justify-content-center align-items-center m-5" style="background-color: #fff;margin-bottom: 30px;"> 
            
                        <video width="640" height="360" style="max-width:100%;" controls>
                            <source src="/img/${srcVideo}" type="video/mp4">
                            Seu navegador não suporta a reprodução de vídeo.
                        </video>
                        
            
                        <div style=" width: 640px;max-width:100%;margin-top:10px;">  
                            <h5  >Novo Video</h5>
                            <p>Teste numero um </p>
                        </div>
            
            
                        <div style=" width: 640px;max-width:100%;margin-top:30px;">
                            ${conteudoParaOutrosVideos}
                        </div>
                    </div>
            
                <!-- recent posts -->
            
            
            
                <!-- Footer Start -->
                <div class="container-fluid bg-secondary text-white pt-5 px-sm-3 px-md-5" style="margin-top: 90px;">
                    <div class="row mt-5">
                        <div class="col-lg-4">
                            <div class="d-flex justify-content-lg-center p-4" style="background: rgba(256, 256, 256, .05);">
                                <i class="fa fa-2x fa-map-marker-alt text-primary"></i>
                                <div class="ml-3">
                                    <h5 class="text-white">Nosso escritório</h5>
                                    <p class="m-0">123 Kinaxixi, Luanda, Angola</p>
            
                                    <p>34 Camp. Pequeno, Lisboa, Portugal</p>
                                    
                                    <p>123 Escritorio, Fortaleza, Brazil</p>
                                    
                                
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="d-flex justify-content-lg-center p-4" style="background: rgba(256, 256, 256, .05);">
                                <i class="fa fa-2x fa-envelope-open text-primary"></i>
                                <div class="ml-3">
                                    <h5 class="text-white">Email </h5>
                                    <p class="m-0">info@examplo.com</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="d-flex justify-content-lg-center p-4" style="background: rgba(256, 256, 256, .05);">
                                <i class="fa fa-2x fa-phone-alt text-primary"></i>
                                <div class="ml-3">
                                    <h5 class="text-white">Telefone</h5>
                                    <p class="m-0">+244 943 934 934</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row pt-5">
                        <div class="col-lg-5 col-md-6 mb-5">
                            <a href="index.html" class="navbar-brand">
                                <h2 class="m-0 mt-n2 display-4 text-primary text-uppercase">Legalwest</h2>
                            </a>
                            <p>Legalwest é uma rede internacional de prestadores de serviços jurídicos, focada na facilitação e incremento de relações globais, muito especialmente no espaço Lusófono.
                                Acompanhando a realidade empresarial cada vez mais multinacional, visa disponibilizar aos representados um mais fácil acompanhamento nas suas importantes decisões.</p>
                            <div class="d-flex justify-content-start mt-4">
                                <a class="btn btn-lg btn-outline-light btn-lg-square mr-2" href="#"><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-lg btn-outline-light btn-lg-square mr-2" href="#"><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-lg btn-outline-light btn-lg-square mr-2" href="#"><i class="fab fa-linkedin-in"></i></a>
                                <a class="btn btn-lg btn-outline-light btn-lg-square" href="#"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6 mb-5">
                            <h4 class="font-weight-semi-bold text-primary mb-4">Links Populares</h4>
                            <div class="d-flex flex-column justify-content-start">
                                <a class="text-white mb-2" href="index.html"><i class="fa fa-angle-right mr-2"></i>Home</a>
                                <a class="text-white mb-2" href="about.html"><i class="fa fa-angle-right mr-2"></i>Sobre Nós</a>
                                <a class="text-white mb-2" href="service.html"><i class="fa fa-angle-right mr-2"></i>Serviços</a>
                                <a class="text-white mb-2" href="team.html"><i class="fa fa-angle-right mr-2"></i>Equipa</a>
                                <a class="text-white" href="contact.html"><i class="fa fa-angle-right mr-2"></i>Contactos</a>
                            </div>
                        </div>
            
                        <div class="col-lg-3 col-md-6 mb-5">
                            <div class="d-flex mb-4 justify-content-start align-items-center">
                                <h4 class="font-weight-semi-bold text-primary mr-3 ">Newsletter</h4>
                                <a href="/blog.html"><span>ver artigos</span></a>
            
                            </div>
            
                            <p>Coloque o seu email e receba as noticias do legalWest .</p>
                            <div class="w-100">
                                <div class="input-group">
                                    <input type="text" class="form-control border-0" style="padding: 25px;" placeholder="Seu email" id="emailASubscrever">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary px-4" id="botaoSubscrever">Assinar</button>
                                    </div>
            
                                </div>
            
                                <div id="alertaSubscrever">
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row p-4 mt-5 mx-0 w-100" style="background: rgba(256, 256, 256, .05);">
                        <div class="d-flex col-12 justify-content-between align-items-center">
                            <p class="m-0 text-white">&copy; <a class="font-weight-bold" href="#">LW</a>.Todos Direitos Reservados.</p>
                            <div class="d-flex">
                                <a href="/termos.html"> <span class="font-weight-bold mr-5"  href="#">Termos e condições</span></a>
                                <a href="/politicas.html"><span class="font-weight-bold " href="#">Politicas e privacidade</span></a>
                            </div>
            
                        </div>
            
                    </div>
                </div>
                <!-- Footer End -->
            
            
                <!-- Back to Top -->
                <a href="#" class="btn btn-primary px-3 back-to-top"><i class="fa fa-angle-double-up"></i></a>
            
                <div id="teste">
            
                </div>
            
            
                <!-- JavaScript Libraries -->
                <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
                <script src="/js/verificarUser.js"></script>
                <script src="/js/utils.js"></script>
                <script src="/js/subscricoes/pt.js" ></script>

                <script>
                    scrollTo(0, 30)
                </script>
            
            </body>
            
            </html>`

            res.send(conteudo)


        }else{
            res.redirect("/jka3")
        }

    }else{

        res.redirect("/yusae")
    }
  })



module.exports = app