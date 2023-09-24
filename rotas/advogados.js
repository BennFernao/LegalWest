
const express = require("express")
const app = express()
const Advogado = require("../database/advogado/model")
const path = require("path")

const multer = require("multer")
const verificadorDeSessao = require("../midleware/verificadorDaSessao")

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

app.post("/addLawyer", verificadorDeSessao,  upload.single("imagem"), async (req , res)=>{

    const {nome, descricao, escritorio} = req.body
    console.log(nome, descricao, escritorio)
    

    if(nome && descricao && escritorio){

        try {

            const urlImagemPerfil = req.file.filename
            
             await Advogado.create({nome, descricao, escritorio, urlImagemPerfil})
             console.log("acerto")
            res.send(["sucesso", "advogado adicionado com sucesso"])
            
        } catch (error) {
            console.log("erro 1")
            res.send(["erro", "erro ao salvar os dados"])         
        }

    }else{
        console.log("erro 2")
        res.send(["erro", "erro na introdução dos dados"])
    }
})

app.get("/especialidadeDoAdvogado/:id", async (req, res)=>{

    try {
        const id = req.params.id
        if(id){

            const advogado = await Advogado.findByPk(req.params.id)
            let especialidades = await advogado.getEspecialidades()
            especialidades = especialidades.lenght > 0 ? especialidades  : []
        
            res.send(especialidades)

        }else{
            res.send(["erro", "forneça o id da especialidade"])
        }

    } catch (error) {
        res.send(["erro", "erro ao buscar os dados"])
    }
})


app.get("/nossoAdvogado/:id", async (req, res)=>{

    const id = req.params.id 

    try {
    
    const advogado = await Advogado.findByPk(id)

    if(advogado){

        let  conteudo = `
    

        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="utf-8">
            <titleLegalwest</title>
            <meta content="width=device-width, initial-scale=1.0" name="viewport">
            <meta content="Free HTML Templates" name="keywords">
            <meta content="Free HTML Templates" name="description">
        
            <!-- Favicon -->
            <link href="img/favicon.ico" rel="icon">
        
            <!-- Google Web Fonts -->
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Roboto:wght@300;500;700&display=swap" rel="stylesheet"> 
        
            <!-- Font Awesome -->
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
        
            <!-- Libraries Stylesheet -->
            <link href="../lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
            <link href="../../lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />
        
            <!-- Customized Bootstrap Stylesheet -->
            <link href="../../css/style.css" rel="stylesheet">
        </head>
        
        <body>
        <!-- Header Start -->
        <div class="container-fluid   ">
            <div >
                <div class="row position-relative">
    
                    <div class="col-lg-12">
    
                        <!--Barra de contactos-->
                        <div class="row bg-secondary border-bottom d-none d-lg-flex ">
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
                        
                        <nav class="navbar navbar-expand-lg z-3 position-relative bg-white navbar-light px-3  ">
    
    
                            <!--Logotipo para ecras menores que lg-->
    
                            <a href="index.html" class="navbar-brand d-flex d-lg-none">
                                <img src="./img/logotipo.png" alt="teste" class="img-fluid" width="120px" />              
                            </a>
    
                            <!--O botoa toggle para ecras menores que lg-->
                            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span class="navbar-toggler-icon"></span>
                            </button>
    
    
                            <!--NavBar collapse para telas menores que só aparecerão no lg-->
                            <div class="collapse w-100  " id="navbarCollapse">
                                <div class="d-sm-block d-lg-none">
                                    <!--Navegação-->
                                    <div class=" p-4">
                                        <div class="navbar-nav mr-auto py-0 ml-auto " >
                                            <a href="index.html" class="nav-item nav-link ">Home</a>
                                            <a href="team.html" class="nav-item nav-link ">Equipa</a>
                                            <a href="locations.html" class="nav-item nav-link active">Localizações</a>
                                            <a href="contact.html" class="nav-item nav-link">Contacto</a>
            
                                            <div class="nav-item dropdown" >
                                                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Quem somos</a>
                                                <div class="dropdown-menu rounded-0 m-0">
                                                    <a href="service.html" class="dropdown-item">Serviços</a>
                                                    <a href="about.html" class="dropdown-item">informações</a> 
                                                    <a href="blog.html" class="dropdown-item">Blog</a>    
                                                </div>
                                            </div>
    
                                            <div class="d-flex justify-content-start align-items-start mt-3 ">
                                                <img src="/img/translate.svg" width="30px" />
                                            
                                                <div class ="navbar-nav mr-auto py-0 ml-3">   
                                                    <div class="nav-item dropdown " >
                                                
                                                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
                                                            Português
                                                        </a>
                                                        <div class="dropdown-menu rounded-0 m-0">
                                                            <a href="../en/index.html" class="dropdown-item lang">English</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
            
                                        </div>
                                    </div>
    
                                    <!--Div para a tradução-->
                                    <div>
                                        <a href="/user/login">
                                        <button class="btn btn-outline-primary mr-3">
                                            <div class="d-flex justify-content-center align-items-center">
                                                <img src="/img/user.svg" class="mr-2" width="30px" />
                                                <span class="username"></span>
                                            </div>             
                                        </button>
                                    </a>
                                    </div>
                                </div>
                            </div>
    
    
                            <!--NavBar para telas lg e maiores-->
                            <div class="d-none d-lg-flex flex-row justify-content-start align-items-center w-100" >
    
                                <!--Logotipo-->
                                <img src="/img/logotipo.png" alt="Logotipo Legalwest" width="100px" class="img-fluid d-none d-lg-flex" >
    
                                 <!--Navegacao-->
                                <div class="navbar-nav mr-auto py-0  " >
                                    <a href="index.html" class="nav-item nav-link  active">Home</a>
                                    <a href="team.html" class="nav-item nav-link ">Equipa</a>
                                    <a href="locations.html" class="nav-item nav-link">Localizações</a>
                                    <a href="contact.html" class="nav-item nav-link">Contacto</a>
    
                                    <div class="nav-item dropdown" >
                                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Quem somos</a>
                                        <div class="dropdown-menu rounded-0 m-0">
                                            <a href="service.html" class="dropdown-item">Serviços</a>
                                            <a href="about.html" class="dropdown-item">informações</a> 
                                            <a href="blog.html" class="dropdown-item">Blog</a>    
                                        </div>
                                    </div>
    
                                </div>
    
                                <div class="btn btn-secondary mr-5">
                                    <a>Marcar Consulta</a>           
                                </div>
    
                                 <!--Div para tradução-->
                                <div class="d-flex mr-5">
                                    <img src="/img/translate.svg" width="30px" />
                                
                                    <div class ="navbar-nav mr-auto py-0 ml-auto">   
                                        <div class="nav-item dropdown " >
                                            
                                            <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
                                                Português
                                            </a>
                                            <div class="dropdown-menu rounded-0 m-0">
                                                <a href="../en/index.html" class="dropdown-item lang">English</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <!--Div para o login-->
    
                                  <div>
                                    <a href="/user/login">
                                    <button class="btn btn-outline-primary mr-3">
                                        <div class="d-flex justify-content-center align-items-center">
                                            <img src="/img/user.svg" class="mr-2" width="30px" />
                                            <span class="username1"></span>
                                        </div>             
                                    </button>
                                   </a>
                                  </div>
                            
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <!-- Header End -->
        
        
            <!-- Page Header Start -->
            <div style="margin-top:50px" class="container"> 
                <div class="row">
                    <div class="col-sm-12 col-lg-6 ">
                        <img  class="img-fluid w-100 h-75" src="/img/${advogado.urlImagemPerfil}" style="border-radius:5px;">
        
                    </div>
                    <div class="col-sm-12 col-lg-6 p-3">
                        <p>Advogado </p>
                        <h4 class="text-secondary">${advogado.nome}</h4>
                        <p>${advogado.escritorio}</p>
        
                        <p>${advogado.descricao}</p>
                    </div>
        
                </div>
        
            </div>
            <!-- Page Header End -->
        
        
            <!-- Back to Top -->
            <a href="#" class="btn btn-primary px-3 back-to-top"><i class="fa fa-angle-double-up"></i></a>
        
        
            <!-- Footer Start -->
            <div class="container-fluid bg-secondary text-white pt-5 px-sm-3 px-md-5" style="margin-top: 90px;">
               <div class="row mt-5">
                   <div class="col-lg-4">
                       <div class="d-flex justify-content-lg-center p-4" style="background: rgba(256, 256, 256, .05);">
                           <i class="fa fa-2x fa-map-marker-alt text-primary"></i>
                           <div class="ml-3">
                               <h5 class="text-white">Nosso escritório</h5>
                               <p class="m-0">123 Kinaxixi, Luanda, Angola</p>
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
                           <a class="text-white mb-2" href="../../index.html"><i class="fa fa-angle-right mr-2"></i>Home</a>
                           <a class="text-white mb-2" href="../../about.html"><i class="fa fa-angle-right mr-2"></i>About</a>
                           <a class="text-white mb-2" href="../../service.html"><i class="fa fa-angle-right mr-2"></i>Services</a>
                           <a class="text-white mb-2" href="../../team.html"><i class="fa fa-angle-right mr-2"></i>Attorney</a>
                           <a class="text-white" href="../../contact.html"><i class="fa fa-angle-right mr-2"></i>Contact</a>
                       </div>
                   </div>
       

               </div>
               <div class="row p-4 mt-5 mx-0" style="background: rgba(256, 256, 256, .05);">
                   <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
                       <p class="m-0 text-white">&copy; <a class="font-weight-bold" href="#">LW</a>.Todos Direitos Reservados.</p>
                   </div>
       
               </div>
           </div>
           <!-- Footer End -->
        
        
            <!-- JavaScript Libraries -->
         
            <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
            <script src="../lib/easing/easing.min.js"></script>
            <script src="../lib/waypoints/waypoints.min.js"></script>
            <script src="../lib/owlcarousel/owl.carousel.min.js"></script>
            <script src="../lib/tempusdominus/js/moment.min.js"></script>
            <script src="../lib/tempusdominus/js/moment-timezone.min.js"></script>
            <script src="../../../lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>
        
            <!-- Contact Javascript File -->
            <script src="../mail/jqBootstrapValidation.min.js"></script>
            <script src="../mail/contact.js"></script>
            
        
        
        <script src="js/main.js"></script>
        
            <!-- Template Javascript -->
        
        </body>
        
        </html>
            
            
            
        
            
                            `
            res.send(conteudo)

    }else{

            res.redirect("/team.html")
    }
            
    } catch (error) {
        
        res.send(["erro", "erro ao ler o advogado, tente novamente"])
    }
})

app.get("/showLawyers", async (req , res)=>{

    try {        
            let todosAdvogados = await Advogado.findAll()
                
            res.send(todosAdvogados)
            
    } catch (error) {
            
            res.send(["erro", "erro ao buscar os dados"])
            
        }
})

app.get("/lerAdvogado/:id", async (req , res)=>{
        
    try {        
            const id = req.params.id 
            if(id){
                let todosAdvogados = await Advogado.findByPk(req.params.id)
                todosAdvogados = JSON.parse(JSON.stringify(todosAdvogados))      
                res.send(todosAdvogados)

            }else{

                res.send(["erro", "dados imcompletos"])
            }

            
    } catch (error) {
            res.send(["erro", "erro ao buscar os dados"])
            
        }
})


app.post("/editLawyer/:id", verificadorDeSessao,  upload.single("imagem"), async (req, res)=>{

    const {nome, escritorio, descricao} = req.body
    const id = req.params.id

    try {

        if(req.file){

            const urlImagemPerfil = req.file.filename

            const updated =  await Advogado.update({nome, escritorio, descricao, urlImagemPerfil }, {
                where:{
                    id
                }
            })
    
            res.send(["sucesso", "Dados atualizados com sucesso"])

        }else{

            const updated =  await Advogado.update({nome, escritorio, descricao }, {
                where:{
                    id
                }
            })
    
            res.send(["sucesso", "Dados atualizados com sucesso"])
        }


        
    } catch (error) {

        res.send(["erro", "erro ao buscar os dados"])  
    }
})

app.get("/deleteLawyer/:id",verificadorDeSessao, async (req, res)=>{

    const id = req.params.id

    try {

        const updated =  await Advogado.destroy({where:{
            id
        }})

        res.send(["sucesso", "Advogado eliminado com sucesso"])
        
    } catch (error){

        console.log(error)
        res.send(["erro", "erro ao buscar os dados"])
    }
})

module.exports = app