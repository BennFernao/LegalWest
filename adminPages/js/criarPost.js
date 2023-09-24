

tinymce.init({
selector: 'textarea',
plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
});


const botaoEnviar = document.getElementById("botaoEnviar")

/*
botaoEnviar.addEventListener("click", async ()=>{

    const titulo = document.getElementById("titulo").value
    const autor = document.getElementById("autor").value
    const descricao = document.getElementById("descricao").value
    const html  = document.getElementById("html")

    

    if(titulo && autor && descricao && html){

        console.log(titulo, autor, descricao, html.getAttribute("value"))
        
        const form = document.getElementById("formPost")
        const resposta = await fetch("../posts/addPost", {
            method: "POST",
            body : new FormData(form)
        }).then((res)=> res.json())
        .catch((error)=> Error("erro  ao publicar o post"))

        console.log(resposta, "")

        if(resposta[0] == "sucesso"){
            const alerta = document.getElementById("alerta")
            alerta.setAttribute("class", "alert alert-primary")
            alerta.innerHTML = "<p>Post publicado com sucesso</p>"
            setTimeout(()=>{
                alerta.setAttribute("class", "")
                alerta.innerHTML = ""
            }, 3000)
        }else{

            console.log(resposta)

            const alerta = document.getElementById("alerta")
            alerta.setAttribute("class", "alert alert-danger")
            alerta.innerHTML = "<p>Erro publicar o post, tente novamente</p>"
            setTimeout(()=>{
                alerta.setAttribute("class", "")
                alerta.innerHTML = ""
            }, 3000)

        }
    }else{

        const alerta = document.getElementById("alerta")
            alerta.setAttribute("class", "alert alert-danger")
            alerta.innerHTML = "<p>Preencha todos os campos</p>"
            setTimeout(()=>{
                alerta.setAttribute("class", "")
                alerta.innerHTML = ""
            }, 3000)

    }


})


*/
console.log("ben")
function copiarTexto(text){


    const inputTemporario = document.createElement("input")
    inputTemporario.setAttribute("value", text)

    document.body.appendChild(inputTemporario)
    inputTemporario.select()
    document.execCommand("copy")
    document.body.removeChild(inputTemporario)

    

}

function inicializador(){

    fetch("/suasImagens", {
        method: "GET",
        headers:{"Content-Type":"application/json"}
    }).then((res)=> res.json())
    .then((res)=> {

        console.log(res)

        const divImagens = document.getElementById("modal-uploads")

        for (let i = 0; i < res.length; i++) {
            const nomeDoArquivo = res[i];

            const divLink = document.createElement("div")

            divLink.setAttribute("class", "d-flex")

            const link = document.createElement("img")
            link.setAttribute("src", `/img/${nomeDoArquivo}`)
            link.setAttribute("width", "150px")
            link.setAttribute("height", "150px")
            link.style.cursor = "pointer"
            


            link.addEventListener("click", ()=>{

                copiarTexto(link.getAttribute("src"))
            })


            divImagens.appendChild(link)
    
        }
    })
}

inicializador()

