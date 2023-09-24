const arquivoUpload  = document.getElementById("arquivoUpload")
const divImagens = document.getElementById("modal-uploads")

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




    






      