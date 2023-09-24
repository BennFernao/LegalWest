const arquivoUpload  = document.getElementById("arquivoUpload")
const divImagens = document.getElementById("modal-uploads")
const botaoVerPosts = document.querySelector(".botaoVerPosts")
const botaoEscreverPosts = document.querySelector(".botaoEscreverPosts")



const alertaSobrePosts = document.querySelector(".alertaSobrePosts")
const principal = document.querySelector(".posts")
const divPosts = document.querySelector(".divPosts")
const divEscreverPost = document.querySelector(".divEscreverPost")
const botaoEliminarArtigo = document.querySelector(".botaoEliminarArtigo")

let idPostAEliminar = null

botaoVerPosts.addEventListener("click", ()=>{
  escreverArtigosRegistados()
})

botaoEscreverPosts.addEventListener("click", ()=>{

  visualizarDivEscreverArtigo()
})

botaoEliminarArtigo.addEventListener("click", ()=>{

  eliminarPost(idPostAEliminar)
})




function visualizarDivEscreverArtigo(){
  
  divPosts.style.display = "none"
  divEscreverPost.style.display = "block"
}

function limparArea (element){
    element.innerHTML =""
  }

function copiarTexto(text){

    const inputTemporario = document.createElement("input")
    inputTemporario.setAttribute("value", text)

    document.body.appendChild(inputTemporario)
    inputTemporario.select()
    document.execCommand("copy")
    document.body.removeChild(inputTemporario)

    

}

function inicializadorUploads(){

    fetch("/suasImagens", {
        method: "GET",
        headers:{"Content-Type":"application/json"}
    }).then((res)=> res.json())
    .then((res)=> {


      divImagens.style.display = "flex"
      divImagens.style.flexWrap = "wrap"


        for (let i = 0; i < res.length; i++) {


            const nomeDoArquivo = res[i];

            const divLink = document.createElement("div")
            divLink.style.display = "flex"
            divLink.style.flexWrap = "wrap"
            divLink.style.position = "relative"

            divLink.setAttribute("class", "d-flex")

            const link = document.createElement("img")
            link.setAttribute("src", `/img/${nomeDoArquivo}`)
            link.setAttribute("width", "150px")
            link.setAttribute("height", "150px")
            link.style.cursor = "pointer"


            const div = document.createElement("button")
            div.style.position = "absolute"
            div.style.top = "20px"
            div.style.display = "none"
            div.className = "btn btn-primary"

            divLink.addEventListener("mouseenter" , ()=>{
              div.style.display = "block"
              div.innerText = "clique para copiar"
            })

            divLink.addEventListener("mouseleave" , ()=>{
              div.style.display = "none"
              div.innerText = ""
            })
     

          
            divLink.addEventListener("click", ()=>{

                textoCopiado = location.origin+""+link.getAttribute("src")
                div.innerText = "copiado"
                  
            })

            let textoCopiado = null
            const close = document.querySelector("#close")
            close.addEventListener("click", ()=>{

              if(textoCopiado){
                copiarTexto(textoCopiado)
              }
              
            })

                              // 

            
            

          divLink.appendChild(link)
          divLink.appendChild(div)
          divImagens.appendChild(divLink)
    
        }
    })
}

  arquivoUpload.addEventListener("change", async (e)=>{

    const file = e.target.files[0]
    console.log(file)
    const resposta = await adicionarMultimedia(file)
    const imagens = document.querySelector("#modal-uploads")
    limparArea(imagens)
    inicializadorUploads()

})

function inicializadorArtigo(){

    tinymce.init({
        selector: '.textarea',
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
        });

        inicializadorUploads()

}

function definirIdDoPostAEditar(id){
  console.log(id, "ok")
  idPostAEliminar = id

}

function eliminarPost(id){

  

  fetch(`/posts/deletePost/${id}`)
  .then((res)=> res.json())
  .then((res)=> {
    console.log(res)
    principal.innerHTML = ""
    escreverArtigosRegistados()
  })

}



function escreverArtigosRegistados(){
  

  divEscreverPost.style.display = "none"
  divPosts.style.display = "block"


  fetch("/posts/showSomePosts").then((res)=> res.json())
  .then((res)=>{

      if(!(res[0] == "erro")){
        

          for (let i = 0; i < res.length; i++) {

                  const element = res[i];
                  
                  


                  const div = document.createElement("div")
                  div.innerHTML  =`

                      
                      <div class="col-md-4 col-lg-4  w-100   mb-5" >
                          
                          <div class="card mb-3 border-light" > 

                                      <img src="/img/${element.urlImagem}" class="img-fluid rounded-start  w-100  alt="..."  style="height:300px" >                 
                                      
                                      <div class="card-body">

                                              
                                              <span class="d-block">Por ${element.autor} </span>
                                              <p>Aos ${element.createdAt.slice(11, 16)},  ${element.createdAt.slice(0, 10)}  </p>
                                              <h5 class="card-title text-secondary text-uppercase">${element.titulo}</h5>
                                              <button class="btn btn-outline-primary mr-3 " onclick="definirIdDoPostAEditar('${element.id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop24">Eliminar</button>
                                      </div>
                              
                          </div>       
                      </div>
                                  
                  `

                  principal.innerHTML += div.innerHTML
              }

      }else{     
        console.log(res)   
          alertaSobrePosts.innerHTML = "<p> Error sending data, try later </p>"     
      }

  }).catch((error)=>{
    console.log(error)
      alertaSobrePosts.innerHTML = "<p> Error sending data, try later </p>"
      
  })
}


    






      