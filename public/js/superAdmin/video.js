let id_atual_video = ""


const botaoDeletarVideo = document.getElementById("botaoDeletarVideo")
const containerVideo = document.querySelector(".dadosDoVideo")


botaoDeletarVideo.addEventListener("click", (e)=>{


  
    if(id_atual_video){

        console.log(0)

        fetch(`/api/video/deleteVideo/${id_atual_video}`, {method: "delete"})
        .then((res)=> {
            
            return res.json()})

        .then((result)=>{

            if(result[0] == "erro"){
                console.log(result)
                alert("ocorreu um erro ao eliminar o video, tente novamente")
                
            }else{

                containerVideo.innerHTML = ""
                inicializadorVideo()
                
                console.log(result)
            }
        })
        .catch((erro)=> {
            console.log(erro)
            alert("ocorreu um erro ao eliminar o advogado, tente novamente")
        
        })
    }
})


const botaoAtualizarVideo = document.querySelector(".botaoAtualizarVideo")
botaoAtualizarVideo.addEventListener("click", async ()=>{

        const titulo = document.querySelector(".tituloVideoAEditar").value
        const descricao  = document.querySelector(".descricaoVideoAEditar").value 

        const resposta = await atualizarVideo(id_atual_video, {titulo, descricao})

        if(!(resposta instanceof Error)){  

            const alerta = document.querySelector(".alertaVideoAEditar")
            alerta.innerHTML = "<p> Dados editados com sucesso </p>"

            containerVideo.innerHTML = ""

            inicializadorVideo()

        }else{

            console.log(resposta)
            const alerta = document.querySelector(".alertaVideoAEditar")
            alerta.innerHTML = "<p> Erro ao editar dados do video, tente novamente </p>"

        }

        async function atualizarVideo(idVideo, novosDados){

                const resposta = await  fetch(`/api/video/atualizar/${idVideo}`, {
                    method: "PUT",
                    body: JSON.stringify(novosDados),
                    headers:{
                        "content-type":"application/json"
                    }
                    }).then((res)=> res.json())
                        .then((res)=> {


                            if(res[0] == "erro"){
                                return new Error()
                            }
                            return res

                        }
                        
                         )
                        .catch((erro)=> {
                            console.log(erro)

                            return new Error("Erro ao buscar dados")
                        })

                return resposta
        }
})


const botaoAdicionarVideo = document.querySelector(".botaoAdicionarVideo")
botaoAdicionarVideo.addEventListener("click", ()=>{

    
    let formularioAdd = document.querySelector(".formularioAdicionarVideo")
    formularioAdd = new FormData(formularioAdd)
    
    fetch("/api/video/adicionarVideo", {
        method: "POST",
        body: formularioAdd  

    }).then((res)=> res.json())
    .then((res)=> {

        alert(res[1])
        setTimeout(()=> location.reload(), 1000 )
    })
    .catch((erro)=> {alert("ocorreu um erro ao adicionar um video")})
})



function escreverVideo(video){

        
        const div_1 = document.createElement("div")
        div_1.setAttribute("class", "d-flex justify-content-between  align-items-center w-100 mt-5 p-2 ")
        div_1.style.borderRadius = "5px"
        div_1.style.backgroundColor = "#FDFBFB"

        const div_1_1 = document.createElement("div")
        div_1_1.setAttribute("class", "mr-2 d-flex   align-items-center")


                const img = document.createElement("img")
                img.setAttribute("class", "img-fluid mr-3 h-100")
                img.setAttribute("src", `/img/${video.srcThumbnail}`)
                img.style.width = "100px"
                img.style.borderRadius  = "5px"

                div_1_1.appendChild(img)

                const div_1_1_1 = document.createElement("div")

                    const nome = document.createElement("h5")
                    nome.innerText = video.titulo

                    div_1_1_1.appendChild(nome)

                    const dataDeAtuazacao = document.createElement("p")
                    dataDeAtuazacao.innerText = `atualizado aos ${video.updatedAt.slice(0, 10)}, ${video.updatedAt.slice(11, 16)}`

                    div_1_1_1.appendChild(dataDeAtuazacao)

                div_1_1.appendChild(div_1_1_1)


                const div_1_2 = document.createElement("div")
                div_1_2.setAttribute("class", "d-flex justify-content-end align-items-center w-25")

                    const img_2 = document.createElement("img")
                    img_2.setAttribute("class", "img-fluid mr-3 h-100 ")
                    img_2.setAttribute("src", "/img/editIcon.svg")
                    img_2.setAttribute("data-bs-toggle", "modal" )
                    img_2.setAttribute("data-bs-target","#staticBackdrop35" )
                    img_2.setAttribute("cod", video.id)
                    img_2.style.width = "25px"
                    img_2.style.height = "25px"
                    img_2.style.cursor = "pointer"

                    

                    img_2.addEventListener("click", ()=>{

                    id_atual_video = video.id

                    const id = img_2.getAttribute("cod")

                    fetch(`/api/video/lerVideo/${id_atual_video}`, {
                            method:"GET",
                            credentials:"include",
                            headers:{"content-type": "application/json"}
                        }).then((res)=> res.json())
                        .then(res=>{

                            console.log(res)
                            const nome = document.querySelector(".tituloVideoAEditar")
                            const descricao = document.querySelector(".descricaoVideoAEditar")
                            
                            
                            nome.setAttribute("value", res.titulo ) 
                            descricao.setAttribute("value", res.descricao) 
                            

                        })
                        .catch((error)=>{
                            console.log(error)
                            
                            alert("Erro ao buscar dados do video ")
                        })

                    })

                


                    const img_3 = document.createElement("img")
                    img_3.setAttribute("class", "img-fluid mr-3 h-100")
                    img_3.setAttribute("src", "/img/deleteIcon.svg")
                    img_3.setAttribute("data-bs-toggle", "modal" )
                    img_3.setAttribute("data-bs-target","#staticBackdrop33" )
                    img_3.style.width = "25px"
                    img_3.style.height = "25px"
                    img_3.style.cursor = "pointer"
                    


                    img_3.addEventListener("click", ()=>{

                        id_atual_video = video.id

                        const modal_deletar = document.getElementById("modal-deletar-video")
                        
                        const paragrafo = document.createElement("p")
                        paragrafo.innerText =  `tem certeza que pretende eliminar o video "${video.titulo}" ?`

                        modal_deletar.innerHTML = ""
                        modal_deletar.appendChild(paragrafo)

                    })
                

            
                div_1_2.appendChild(img_2)
                div_1_2.appendChild(img_3)
                


        div_1.appendChild(div_1_1)
        div_1.appendChild(div_1_2)

        containerVideo.appendChild(div_1)

}

function inicializadorVideo(){

    
    fetch("/api/video/lerVideos", {
        method:"GET",
        credentials:"include",
        headers:{"content-type": "application/json"}
    }).then((res)=> res.json()) 
    .then(res=>{

    if(res[0] !== "erro"){

        console.log(res)


        if(res.length > 0){

            containerVideo.innerHTML = ""
            for (let i = 0; i < res.length; i++) {   
                
                escreverVideo(res[i]) 
            } 

        }else{
           
            containerVideo.innerHTML = "<p>Nenhum video registado até ao momento, registe!"
        }

    }else{

        alert("Erro ao ler video")
            
    }

        
    })
    .catch((error)=>{

        console.log(error)
        alert("Erro ao buscar dados")

    })

}

inicializadorVideo()