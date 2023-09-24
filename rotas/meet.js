const Consulta = require("../database/consulta/consultas")
const path =  require("path")

const app = require("express").Router()
const Axios = require("axios")

function retornarUmaPaginaIniciarReuniao(idConsulta, data){

  

    let diferencaFormatada = "`${dias % 30} dia(s):${horas % 24} horas :${minutos % 60} minutos:${segundos % 60} segundos`"
    let dataAtualFormatada = "`${anoAtual}-${mesAtual}-${diaAtual}T${horaAtual}:${minutoAtual}:${segundoAtual}`"

    const conteudoParte1 = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="utf-8">
        <title>JUSTICE - Free Lawyer Website Template</title>
        <meta content="width=device-width, initial-scale=1.0" name="viewport">
        <meta content="Free HTML Templates" name="keywords">
        <meta content="Free HTML Templates" name="description">
    
        <!-- Favicon -->
        <link href="/img/favicon.ico" rel="icon">
    
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
                               <a href="team.html" class="nav-item nav-link">Equipa</a>
                               <a href="locations.html" class="nav-item nav-link">Localizações</a>
                               <a href="contact.html" class="nav-item nav-link active">Contacto</a>
    
                               <div class="nav-item dropdown" >
                                   <a href="#" class="nav-link dropdown-toggle " data-toggle="dropdown">Quem somos</a>
                                   <div class="dropdown-menu rounded-0 m-0">
                                       <a href="service.html" class="dropdown-item">Serviços</a>
                                       <a href="about.html" class="dropdown-item">informações</a> 
                                       <a href="blog.html" class="dropdown-item">Blog</a>    
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
                                                 <a href="../en/contact.html" class="dropdown-item lang">English</a>
                                             </div>                                
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
                       <a href="index.html" class="nav-item nav-link text-white">Home</a>
                       <a href="team.html" class="nav-item nav-link text-white">Equipa</a>
                       <a href="locations.html" class="nav-item nav-link text-white">Localizações</a>
                       <a href="contact.html" class="nav-item nav-link  text-white">Contacto</a>
    
                       <div class="nav-item dropdown" >
                           <a href="#" class="nav-link dropdown-toggle text-white " data-toggle="dropdown">Quem somos</a>
                           <div class="dropdown-menu rounded-0 m-0 bg-secondary">
                               <a href="service.html" class="dropdown-item text-white">Serviços</a>
                               <a href="about.html" class="dropdown-item text-white">informações</a> 
                               <a href="blog.html" class="dropdown-item text-white">Blog</a>    
                           </div>
                       </div>
    
                   </div>
    
                   
                            
                  
    
                   <!--Div para tradução-->
                   <div class="d-flex mr-5">
                       <img src="/img/translate.svg" width="30px" />
                   
                       <div class ="navbar-nav mr-auto py-0 ml-auto">   
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
                                        <a href="../en/contact.html" class="dropdown-item lang">English</a>
                                    </div>
                                   
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
    
    
    <!-- Action start -->
    
    <div class="d-flex flex-column justify-content-center align-items-center" style="width: 100%;height: 80vh;">
    
    
        
        <button class="btn btn-primary mb-3 " id="createButton">
            iniciar na reunião
        </button>
        </a>
    
        <p>Você está <spam style="font-weight: bold;"  id="tempo">12:06:12  </spam> adiantado </p>
        
    
    </div>

    <!-- Action End  -->

    <script>

        const tempo = document.querySelector("#tempo")
        const idConsulta = "${idConsulta}"
        const dataMarcada = new Date("${data}")

        
        const createButton = document.querySelector("#createButton")

        // Função para calcular a diferença entre duas datas no formato "ano:mês:dia:hora:minuto:segundo"
        function calcularDiferencaDatas(data1, data2) {
        // Converter as datas para objetos Date
        const data1Obj = new Date(data1);
        const data2Obj = new Date(data2);


        // Calcular a diferença em milissegundos
        const sinal = (data2Obj.getTime() - data1Obj.getTime()) > 0 ? "+" : "-"
        const diferencaMs = Math.abs(data2Obj - data1Obj);

        // Extrair os componentes da diferença
        const segundos = Math.floor(diferencaMs / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
        const meses = Math.floor(dias / 30);
        const anos = Math.floor(meses / 12);

        // Formatar a diferença no mesmo formato
        const diferencaFormatada = ${diferencaFormatada};

        return [diferencaFormatada, sinal];

        }


        setInterval(()=>{

            const dataAtual = new Date()

            const anoAtual = dataAtual.getFullYear()
            const mesAtual  = (dataAtual.getMonth() + 1) < 10 ?  "0" + (dataAtual.getMonth() + 1)  : (dataAtual.getMonth() + 1)
            const diaAtual = dataAtual.getDate() < 10 ? "0" +  dataAtual.getDate()  : dataAtual.getDate()
            const horaAtual = dataAtual.getHours() < 10 ? "0" +  dataAtual.getHours()  : dataAtual.getHours()
            const minutoAtual = dataAtual.getMinutes() < 10 ? "0" +  dataAtual.getMinutes()  : dataAtual.getMinutes()
            const segundoAtual =  dataAtual.getSeconds() < 10 ? "0" +  dataAtual.getSeconds()  : dataAtual.getSeconds()

            
            const dataAtualFormatada = ${dataAtualFormatada}


            const anoMarcada = dataMarcada.getFullYear()
            const mesMarcada  = (dataMarcada.getMonth() + 1) < 10 ?  "0" + (dataMarcada.getMonth() + 1)  : (dataMarcada.getMonth() + 1)
            const diaMarcada = dataMarcada.getDate() < 10 ? "0" +  dataMarcada.getDate()  : dataMarcada.getDate()
            const horaMarcada = dataMarcada.getHours() < 10 ? "0" +  dataMarcada.getHours()  : dataMarcada.getHours()
            const minutoMarcada = dataMarcada.getMinutes() < 10 ? "0" +  dataMarcada.getMinutes()  : dataMarcada.getMinutes()
            const segundoMarcada =  dataMarcada.getSeconds() < 10 ? "0" +  dataMarcada.getSeconds()  : dataMarcada.getSeconds()

            const dataMarcadaFormatada = anoMarcada + "-" + mesMarcada + "-" + diaMarcada+"T"+ horaMarcada +":"+ minutoMarcada +":" + segundoMarcada
            
            console.log(dataAtualFormatada, dataMarcadaFormatada)

        
            const [diferenca ,sinal] = calcularDiferencaDatas(dataAtualFormatada, dataMarcadaFormatada)

            if(sinal != "+"){

                tempo.innerText = "Entrando para a reunião"
                fetch("/meet/verificarInicioDaReuniao/${idConsulta}")
                    .then((res)=> res.json())
                    .then(async (res)=>{

                        if(res[0] == "sucesso"){

                            const url = "https://api.videosdk.live/v2/rooms";
                            const options = {
                                method: "POST",
                                headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI5MmI1ZjEyNC0xMDEyLTRhYjItODk3Zi0yM2UwMjdlNmZmNjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MzI0OTU3NSwiZXhwIjoxODUxMDM3NTc1fQ.0l70V0QNCrhpNpGJ3pe2qOKQE7w81tJyh3cug0dh_Z8", "Content-Type": "application/json" },
                            };
                
                            const { roomId } = await fetch(url, options)
                                .then(async (response) => {
                
                                const res = await  response.json()
                                                           
                                return res
                            })
                                .catch((error) => alert("error", error));
                
                                meetingId = roomId;
                
                                const resposta = await registarId(meetingId, idConsulta)
                
                                if(resposta[0] == "erro"){
                
                                    
                                    alert("erro ao registar o meeting")
                
                                }else{
                                    
                                    location.href = "/meet/meuMeet/${idConsulta}"
                                }  
                        }

                       
                        


                       
                    })
                    .catch((erro)=>{
                        alert("erro ao iniciar a reuniao")
                    })

            }else{
                tempo.innerText = diferenca
            }

            

            
           
        }, 1000)



        // ficheiro para entrada da reunião

        createButton.addEventListener("click", async () => {


            const url = "https://api.videosdk.live/v2/rooms";
            const options = {
                method: "POST",
                headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI5MmI1ZjEyNC0xMDEyLTRhYjItODk3Zi0yM2UwMjdlNmZmNjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MzI0OTU3NSwiZXhwIjoxODUxMDM3NTc1fQ.0l70V0QNCrhpNpGJ3pe2qOKQE7w81tJyh3cug0dh_Z8", "Content-Type": "application/json" },
            };

            const { roomId } = await fetch(url, options)
                .then(async (response) => {

                const res = await  response.json()
                
                
                return res})
                .catch((error) => alert("error", error));

                meetingId = roomId;

                const resposta = await registarId(meetingId, idConsulta)

                if(resposta[0] == "erro"){

                    
                    alert("erro ao registar o meeting")

                }else{
                    
                    location.href = "/meet/meuMeet/${idConsulta}"
                }
                
        });


        async function registarId(idReuniao, idConsulta){

            const resposta = await fetch("/meet/registarid", {
                method:"POST",
                body: JSON.stringify({idReuniao, idConsulta}),
                headers: {"content-type": "application/json"}
                }).then((res)=>res.json())
                 .catch((erro)=> ["erro", "erro ao regitar o id"])
     
            return resposta  
        }

     
    </script>
</body>





</html>


` 
    return conteudoParte1 
}

function retornarPaginaMeuMeet(idReuniao, token, nomeDoUser){

    const vParticipante = "`v-${participant.id}`"
    const fParticipant = "`f-${participant.id}`"
    const aParticipant = "`a-${participant.id}`"
    const fPId = "`f-${pId}`"
    const vPId = "`v-${pId}`"
    const nome = "`Name : ${name}`"
    const aPId = "`a-${pId}`"
    const fLocalParticipant = "`f-${meeting.localParticipant.id}`"


    const conteudo = `
    
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta digital</title>
    <link href="/css/videoCallPageStyle.css" rel="stylesheet" type="text/css" >
</head>

<body >
    


    <div  id="videoContainer"  >
           
    </div>


  
    
    <div id="divNomeDoCliente" style=" width:150px; background-color:  black;border-radius: 10px; padding: 5px; position: fixed;left: 5px;top:5px">
        <p  style="color:#D3EFF8;text-align: center;">Carregando</p>
    </div> 
    

    <div class="flexDiv flexCentralizada"  >
        <p id="textDivOtherParticipant">Aguarde pelo outro participante</p>
    </div>
  

    <div class="flexDiv flexCentralizada" style="position: relative;" id="divOpcoesDeChamada">
        <div style="display: flex; flex-direction: column; position:fixed; bottom: 20px;">
            <div class="flexDiv flexCentralizada " style="background-color: #D3EFF8;padding: 5px; border-radius: 5px; margin-bottom: 25px; "  >

                <div class=" margemElementar flexCentralizada divOpcaoDeTerminarChamada"  id="leaveBtn">
                    <img src="/img/iconChamada.svg" class="icon" />
                </div>
                

                <div class="divOpcaoDeChamada margemElementar flexCentralizada " id="toggleMicBtn">
                    <img src="/img/iconAudio.svg" class="icon" id="toggleMicIcon"/>
                </div>

                <div class="divOpcaoDeChamada margemElementar flexCentralizada " id="toggleWebCamBtn">
                    <img src="/img/iconVideocam.svg" class="icon" id="toggleWebCamIcon"/>
                </div>
                
            </div>
            <div class="flexDiv flexCentralizada ">


                <div class="margemElementar divDeOpcoesDeTela "  id="participantLocalContainer">

                
                    
                </div>

            </div>

            <div class="flexDiv flexCentralizada" >
                <p id="textDiv" ></p>
            </div>


        </div>
    </div>

    <div class="flexDiv flexCentralizada"  >
        <p id="textoDeAviso"></p>
    </div>


    <script src="https://sdk.videosdk.live/js-sdk/0.0.63/videosdk.js"></script>
    
    <script src="/socket.io/socket.io.js"></script>
    

   
    <script>

                // Elementos do dom que permitem algumas ações

       const joinButton = document.getElementById("joinBtn");
       const leaveButton = document.getElementById("leaveBtn");
       const toggleMicButton = document.getElementById("toggleMicBtn");
       const toggleWebCamButton = document.getElementById("toggleWebCamBtn");
       const createButton = document.getElementById("createMeetingBtn");
       const textDiv = document.getElementById("textDiv");
       const divNomeDoCliente = document.getElementById("divNomeDoCliente")
       const textDivOtherParticipant = document.getElementById("textDivOtherParticipant")

       const videoContainer = document.getElementById("videoContainer");
       const divParticipantLocal = document.getElementById("participantLocalContainer")
       const divOpcoesDeChamada = document.getElementById("divOpcoesDeChamada")
       const textoDeAviso = document.getElementById("textoDeAviso")
      


       const toggleMicIcon = document.getElementById("toggleMicIcon")
       const toggleWebCamIcon = document.getElementById("toggleWebCamIcon")

        const socket = io()

        socket.on("connect_error", (err)=>{

                    videoContainer.style.display = "none"
                    divParticipantLocal.style.display = "none"
                    textDivOtherParticipant.style.display = "none"
                    divOpcoesDeChamada.style.display = "none"
                    divNomeDoCliente.style.display = "none"
                    textoDeAviso.innerText = err.message
                    document.querySelector("body").style.display = "block"

                    console.log(err.message)
                })

     socket.on("connect", ()=>{

        // leave Meeting Button Event Listener
        document.querySelector("body").style.display = "block"
        leaveButton.addEventListener("click", async () => {

            
            meeting?.leave();
            videoContainer.style.display = "none";
            
            });


   

       const TOKEN = "${token}";

       // Variaveis úteis para a reunião

       let meeting = null;
       let meetingId = "${idReuniao}";
       let isMicOn = false;
       let isWebCamOn = false;
       let name = "${nomeDoUser}"



        async function inicializar(){
               
               textDiv.textContent = "Carregando...";
               initializeMeeting();

                }

                inicializar()

      

       // Initialize meeting
       function initializeMeeting() {

                window.VideoSDK.config(TOKEN);

                meeting = window.VideoSDK.initMeeting({
                    meetingId: meetingId, // required
                    name : "ben", // required
                    micEnabled: true, // optional, default: true
                    webcamEnabled: true, // optional, default: true
                });


                meeting.join();

                // creating local participant
               
                createLocalParticipant();

                

                // setting local participant stream
                meeting.localParticipant.on("stream-enabled", (stream) => {
                    setTrack(stream, null, meeting.localParticipant, true);
                });

                meeting.on("meeting-joined", () => {
                    textDiv.textContent = null;

                 
                });

                meeting.on("meeting-left", () => {
                    videoContainer.innerHTML = "";
                });

                //  participant joined
                meeting.on("participant-joined", (participant) => {


                    textDivOtherParticipant.innerHTML = ""

                    let videoElement = createVideoElement(
                    participant.id,
                    participant.displayName,
                    false
                    );
                    let audioElement = createAudioElement(participant.id);

                    participant.on("stream-enabled", (stream) => {
                    setTrack(stream, audioElement, participant, false);
                    });
                    videoContainer.appendChild(videoElement);
                    videoContainer.appendChild(audioElement);

                });

                // participants left
                meeting.on("participant-left", (participant) => {
                    let vElement = document.getElementById(${fParticipant});
                    vElement.remove(vElement);

                    let aElement = document.getElementById(${aParticipant});
                    aElement.remove(aElement);
                });
                }

       // creating video element
       function createVideoElement(pId, name, local) {

            let videoFrame = document.createElement("div");
            videoFrame.setAttribute("id", ${aPId});
            videoFrame.setAttribute("width", "100%");
            videoFrame.setAttribute("height", "100%")

            

            //create video
            let videoElement = document.createElement("video");
            videoElement.classList.add("video-frame");
            videoElement.setAttribute("id", ${vPId});
            videoElement.setAttribute("playsinline", true);
            videoElement.setAttribute("width", "100%");
            videoElement.setAttribute("height", "100%")
            videoFrame.appendChild(videoElement);

            let displayName = document.createElement("div");
            displayName.style.display = "flex"
            displayName.style.flexDirection = "row"
            displayName.style.justifyContent = "center"
            displayName.style.alignItems = "center"

            if(local){
                displayName.innerHTML = ${nome};
            }else{
                divNomeDoCliente.innerText = ${nome};
            }
            

            videoFrame.appendChild(displayName);
            return videoFrame;
        }

       // creating audio element
       function createAudioElement(pId) {

           let audioElement = document.createElement("audio");
           audioElement.setAttribute("autoPlay", "false");
           audioElement.setAttribute("playsInline", "true");
           audioElement.setAttribute("controls", "false");
           audioElement.setAttribute("id", ${aPId});
           audioElement.style.display = "none";

           return audioElement;
       }

       // creating local participant
       function createLocalParticipant() {
        
           let localParticipant = createVideoElement(
               meeting.localParticipant.id,
               "Você",
               true
           );
           divParticipantLocal.appendChild(localParticipant);
           console.log("criado o participante local")
       }

       // setting media track
       function setTrack(stream, audioElement, participant, isLocal) {
       
       if (stream.kind == "video") {
           isWebCamOn = true;
           const mediaStream = new MediaStream();
           mediaStream.addTrack(stream.track);
           let videoElm = document.getElementById(${vParticipante});
           videoElm.srcObject = mediaStream;
           videoElm
           .play()
           .catch((error) =>
               console.error("videoElem.current.play() failed", error)
           );
       }

       if (stream.kind == "audio") {
           if (isLocal) {
           isMicOn = true;
           } else {
           const mediaStream = new MediaStream();
           mediaStream.addTrack(stream.track);
           audioElement.srcObject = mediaStream;
           audioElement
               .play()
               .catch((error) => console.error("audioElem.play() failed", error));
           }
       }
       }



       // Toggle Mic Button Event Listener
       toggleMicButton.addEventListener("click", async () => {
           if (isMicOn) {
               // Disable Mic in Meeting
               meeting?.muteMic();
               toggleMicIcon.src = "/img/mic_off.svg"
           } else {
               // Enable Mic in Meeting
               meeting?.unmuteMic();
               toggleMicIcon.src = "/img/iconAudio.svg"
           }
           isMicOn = !isMicOn;
       });

       // Toggle Web Cam Button Event Listener
       toggleWebCamButton.addEventListener("click", async () => {
           if (isWebCamOn) {
               // Disable Webcam in Meeting
               meeting?.disableWebcam();
               toggleWebCamIcon.src = "/img/videocam_off.svg"

               let vElement = document.getElementById(${fLocalParticipant});
               vElement.style.display = "none";

           } else {
               // Enable Webcam in Meeting
               meeting?.enableWebcam();
               toggleWebCamIcon.src = "/img/iconVideocam.svg"

               let vElement = document.getElementById(${fLocalParticipant});
               vElement.style.display = "inline";
           }
           isWebCamOn = !isWebCamOn;
       });


    })
    </script>
    
</body>


</html>
    `

    return conteudo
}


app.get("/ben/:idConsulta", async (req, res)=>{


    const {idConsulta} = req.params
    const {nomeDoUser} = req.session
    const consulta = await Consulta.findOne({where:{id: idConsulta}, attributes:["para", "estado", "idReuniao"]})


    if(consulta){
     
        const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI5MmI1ZjEyNC0xMDEyLTRhYjItODk3Zi0yM2UwMjdlNmZmNjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MzI0OTU3NSwiZXhwIjoxODUxMDM3NTc1fQ.0l70V0QNCrhpNpGJ3pe2qOKQE7w81tJyh3cug0dh_Z8"

        if(consulta.idReuniao){
    
            const conteudo = retornarPaginaMeuMeet(consulta.idReuniao,token, nomeDoUser)
            res.send(conteudo)

        }else{

            const url = "https://api.videosdk.live/v2/rooms";
            const options = {
                method:"post",
                headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI5MmI1ZjEyNC0xMDEyLTRhYjItODk3Zi0yM2UwMjdlNmZmNjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MzI0OTU3NSwiZXhwIjoxODUxMDM3NTc1fQ.0l70V0QNCrhpNpGJ3pe2qOKQE7w81tJyh3cug0dh_Z8", "Content-Type": "application/json" },
            };
        
            let roomId;
            await Axios({url, ...options}) 
                .then(response =>response.data)
                .then(res=> {
        
                    roomId = res.roomId   
              })
              .catch(error => {
                     console.error('Erro:', error);
              });
        
        
              if(roomId){
                await Consulta.update({idReuniao : roomId}, {where:{id : consulta.id}})
                const conteudo = retornarPaginaMeuMeet(roomId, options.headers.Authorization, nomeDoUser )
                res.send({roomId})

              }else{

                res.send({erro:"erro"})

              }

        }


    }else{

        
        res.redirect("/meetInexistente")

    }

    
})

app.get("/iniciarReuniao/:id", async (req, res)=>{

    const {id} = req.params
    const consulta = await Consulta.findByPk(id, {attributes:["para", "estado"]})

    if(consulta){

        
        const estadoValidos = ["lido", "enviado"]

        if(estadoValidos.includes(consulta.estado)){

            const dataAtualEmMilisegundos = new Date().getTime()
            const dataMarcadaMilisegundos = new Date(consulta.para).getTime()


            if(dataMarcadaMilisegundos > dataAtualEmMilisegundos){

                const conteudo = retornarUmaPaginaIniciarReuniao(id, consulta.para)
                res.send(conteudo)

            }else{
                const trintaMinutosEmMilisegundos = 1200000
                if(dataAtualEmMilisegundos - dataMarcadaMilisegundos < trintaMinutosEmMilisegundos ){

                    res.redirect(`/meet/meuMeut/${id}`)

                }else{

                    await Consulta.update({estado: "atendido"}, {where: {id:id}})
                    res.redirect("/meetRealizado")
                }
            }



        }else{


            if(consulta.estado == "atendido"){

                res.redirect("/meetRealizado")

            }else{

                res.redirect("/meetCancelado")
            }

        }



    }else{

        
        res.redirect("/meetInexistente")

    }
    
})


app.get("/verificarInicioDaReuniao/:id", async (req, res)=>{

    const consulta = await Consulta.findOne( {attributes:["para"], where: {id: req.params.id, estado: "enviado"}})

    if(consulta){
        const dataAtual = new Date().getTime()
        const dataMarcada = new Date(consulta.para).getTime()

        if(dataAtual > dataMarcada){

            res.send(["sucesso"])
        }
        
        else{
            res.send(["erro", "Reunião marcada para mais tarde"])
        }
    }else{

        res.send(["erro", "consulta inexistente"])
    }
    
})


app.post("/registarId", async (req, res)=>{

    const {idReuniao, idConsulta } = req.body

    
    if(idConsulta && idReuniao){

        try {
            
            const consulta = await Consulta.findByPk(idConsulta)

            if(consulta){

                await Consulta.update({idReuniao : idReuniao}, {where: {id: idConsulta}})
                res.send(["sucesso", "id registado com sucesso"])
                
            }else{
                res.send(["erro", "consulta inexistente"])
            }

        } catch (error) {

            res.send(["erro", "Erro interno, tente novamente"])

        }

    }else{

        res.send(["erro", "dados imcompletos"])
    }
})

app.post("/buscarId", async (req, res)=>{

    const {id : idConsulta} = req.body

    
    if(idConsulta){

        try {

            
            
            const consulta = await Consulta.findByPk(idConsulta, {attributes: ["idReuniao"]})

            console.log(consulta)

            if(consulta){


                res.send({idMeeting : consulta.idReuniao})
                
            }else{

                res.send(["erro", "dados incorretos"])
            }

        } catch (error) {

            res.send(["erro", "Erro interno, tente novamente"])
            
        }

    }else{
        res.send(["erro", "dados imcompletos"])
    }

})

app.get("/meuMeet/:idConsulta", async (req, res)=>{

    const {idConsulta} = req.params
    const {userId, idAdvogado, privilegio, nomeDoUser} = req.session

    const privilegiosPermitidos = ["user", "admin"]
    const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI5MmI1ZjEyNC0xMDEyLTRhYjItODk3Zi0yM2UwMjdlNmZmNjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MzI0OTU3NSwiZXhwIjoxODUxMDM3NTc1fQ.0l70V0QNCrhpNpGJ3pe2qOKQE7w81tJyh3cug0dh_Z8"
    

    if(privilegiosPermitidos.includes(privilegio)){

        let consulta;

        if(idAdvogado){

            consulta = await Consulta.findOne({where:{id: idConsulta, idAdvogado: idAdvogado}, attributes:["para", "estado", "idReuniao"]})

        }else{
            
            consulta = await Consulta.findOne({where:{id: idConsulta, idUser: userId}, attributes:["para", "estado", "idReuniao"]})
        }

   
        if(consulta){
     
            const estadoValidos = ["lido", "enviado"]
    
            if(estadoValidos.includes(consulta.estado)){
    
                const dataAtualEmMilisegundos = new Date().getTime()
                const dataMarcadaMilisegundos = new Date(consulta.para).getTime()
    
    
                if(dataMarcadaMilisegundos > dataAtualEmMilisegundos){
                    
                    res.redirect(`/meet/iniciarReuniao/${idConsulta}`)
    
    
                }else{
                    const trintaMinutosEmMilisegundos = 1200000
    
    
                    if(dataAtualEmMilisegundos - dataMarcadaMilisegundos < trintaMinutosEmMilisegundos ){
    
    
                        if(consulta.idReuniao){
    
                            const conteudo = retornarPaginaMeuMeet(consulta.idReuniao ,token , nomeDoUser)
                            res.send(conteudo)
                
                        }else{
                
                            const url = "https://api.videosdk.live/v2/rooms";
                            const options = {
                                method:"post",
                                headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI5MmI1ZjEyNC0xMDEyLTRhYjItODk3Zi0yM2UwMjdlNmZmNjIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MzI0OTU3NSwiZXhwIjoxODUxMDM3NTc1fQ.0l70V0QNCrhpNpGJ3pe2qOKQE7w81tJyh3cug0dh_Z8", "Content-Type": "application/json" },
                            };
                        
                            let roomId;
                            await Axios({url, ...options}) 
                                .then(response =>response.data)
                                .then(res=> {
                        
                                    roomId = res.roomId   
                              })
                              .catch(error => {
                                     console.error('Erro:', error);
                              });
                        
                        
                              if(roomId){
                                await Consulta.update({idReuniao : roomId}, {where:{id : consulta.id}})
                                const conteudo = retornarPaginaMeuMeet(roomId, options.headers.Authorization, nomeDoUser )
                                res.send({roomId})
                
                              }else{
                
                                res.send({erro:"erro"})
                
                              }
                
                        }
    
    
                    }else{
    
                        await Consulta.update({estado: "cancelado"}, {where: {id:idConsulta}})
                        res.redirect("/meetAtendido")
                    }
                }
    
    
    
            }else{
    
    
                if(consulta.estado == "atendido"){
    
                    res.redirect("/meetAtendido")
    
                }else{
    
                    res.redirect("/meetCancelado")
                }
    
            }
    
    
    
        }else{
    
            
            res.redirect("/meetInexistente")
    
        }

    }else{
        res.redirect("/naoPermitido")
    }
})







module.exports = app