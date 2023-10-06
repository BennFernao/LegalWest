let id_atual = ""

const botaoEnviar = document.querySelector(".criarConta")

botaoEnviar.addEventListener("click", async (e)=>{
console.log("Correto")
e.preventDefault()
const nome = document.querySelector(".nomeUser").value
const sobrenome = document.querySelector(".sobrenomeUser").value
const email = document.querySelector(".emailUser").value
const telefone = document.querySelector(".telefoneUser").value



if(nome && sobrenome && email && telefone  ){

    const resposta =  await fetch("/user/adicionarUserAdmin", {
        method: "POST",
        body: JSON.stringify({
            nome,
            sobrenome,
            telefone,
            email,
            idAdvogado : id_atual

        }),
        headers: {"content-type":"application/json"}
    }).then((res)=> res.json())
    .catch((error)=> Error("erro ao enviar dados"))

    console.log(resposta)
}else{


}
})


const container = document.querySelector(".dadosDoAdvogado")

const botaoAtualizar = document.querySelector(".botaoAtualizar")
botaoAtualizar.addEventListener("click", async ()=>{

let formularioAT = document.querySelector(".formularioAT")
formularioAT = new FormData(formularioAT)

const resposta = await atualizarAdvogado(id_atual, formularioAT)

if(!(resposta instanceof Error)){      
    setTimeout(()=> location.reload(), 1000 )
}else{

    const alerta = document.querySelector(".alerta")
    alerta.innerHTML = "<p> Erro ao editar o advogado, tente novamente </p>"

}

async function atualizarAdvogado(idAdvogado, novosDados){

        const resposta = await  fetch(`../lawyers/editLawyer/${id_atual}`, {
            method: "POST",
            body: formularioAT 

            }).then((res)=> res.json())
                .then((res)=> res)
                .catch((erro)=> new Error("Erro ao buscar dados"))

        return resposta
}

})


const botaoAdicionar = document.querySelector(".adicionar")
botaoAdicionar.addEventListener("click", ()=>{

    let formularioAdd = document.querySelector(".formularioAdd")
    formularioAdd = new FormData(formularioAdd)
    
    fetch("/lawyers/addLawyer", {
        method: "POST",
        body: formularioAdd  
    }).then((res)=> res.json())
    .then((res)=> {

        console.log(res)
        setTimeout(()=> location.reload(), 1000 )
    })
    .catch((erro)=> console.log(erro))
})


function escreverAdvogado(advogado){

        
        
        const div_1 = document.createElement("div")
        div_1.setAttribute("class", "d-flex justify-content-between  align-items-center w-100 mt-5 p-2 ")
        div_1.style.borderRadius = "5px"
        div_1.style.backgroundColor = "#FDFBFB"

        const div_1_1 = document.createElement("div")
        div_1_1.setAttribute("class", "mr-2 d-flex   align-items-center" )


                const img = document.createElement("img")
                img.setAttribute("class", "img-fluid mr-3 h-100")
                img.setAttribute("src", `/img/${advogado.urlImagemPerfil}`)
                img.style.width = "100px"
                img.style.borderRadius  = "5px"

                div_1_1.appendChild(img)

                const div_1_1_1 = document.createElement("div")

                    const nome = document.createElement("h5")
                    nome.innerText = advogado.nome

                    div_1_1_1.appendChild(nome)

                    const dataDeAtuazacao = document.createElement("p")
                    dataDeAtuazacao.innerText = `atualizado aos ${advogado.updatedAt.slice(0, 10)}, ${advogado.updatedAt.slice(11, 16)}`

                    div_1_1_1.appendChild(dataDeAtuazacao)

                div_1_1.appendChild(div_1_1_1)




        div_1.appendChild(div_1_1)
       

        container.appendChild(div_1)

        }

function inicializadorAdvogado(){

    fetch("/../lawyers/showLawyers", {
        method:"GET",
        credentials:"include",
        headers:{"content-type": "application/json"}
    }).then((res)=> res.json()) 
    .then(res=>{

        console.log(res)
        
        
        if(res.length > 0){
            console.log(res)

            for (let i = 0; i < res.length; i++) {
            
            escreverAdvogado(res[i]) 
            } 
        }else{

            
            container.innerHTML += "<p>Nenhum advogado registado até ao momento, registe!"
        }

        
    })
    .catch((error)=>{

        console.log(error)

    })

}

inicializadorAdvogado()