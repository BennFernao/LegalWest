let id_atual = ""

const botaoEnviar = document.querySelector(".criarConta")
const botaoDeletarAdvogado = document.getElementById("botaoDeletarAdvogado")


botaoDeletarAdvogado.addEventListener("click", (e)=>{

  

    if(id_atual){

        fetch(`/api/lawyers/deleteLawyer/${id_atual}`)
        .then((res)=> {
            console.log(res)
            return res.json()})
        .then((result)=>{

            if(result[0] == "erro"){
                console.log(result, "result")
                alert("ocorreu um erro ao eliminar o advogado, tente novamente")
                
            }else{

                inicializadorAdvogado()
                
                console.log(result)
            }
        })
        .catch((erro)=> {
            console.log(erro)
            alert("ocorreu um erro ao eliminar o advogado, tente novamente")
        
        })
    }
})



botaoEnviar.addEventListener("click", async (e)=>{
console.log("Correto")
e.preventDefault()
const nome = document.querySelector(".nomeUser").value
const sobrenome = document.querySelector(".sobrenomeUser").value
const email = document.querySelector(".emailUser").value
const telefone = document.querySelector(".telefoneUser").value




console.log(nome, sobrenome, email, telefone,  id_atual)

if(nome && sobrenome && email && telefone  ){

    const resposta =  await fetch("/api/user/adicionarUserAdmin", {
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

console.log("Dados incorretos")
}
})


const container = document.querySelector(".dadosDoAdvogado")

const botaoAtualizar = document.querySelector(".botaoAtualizar")
botaoAtualizar.addEventListener("click", async ()=>{

        let formularioAT = document.querySelector(".formularioATUALIZAR")
        formularioAT = new FormData(formularioAT)

        const resposta = await atualizarAdvogado(id_atual, formularioAT)

       

        if(!(resposta instanceof Error)){      
            setTimeout(()=> location.reload(), 1000 )
        }else{

            const alerta = document.querySelector(".alerta")
            alerta.innerHTML = "<p> Erro ao editar o advogado, tente novamente </p>"

        }

        async function atualizarAdvogado(idAdvogado, novosDados){

                const resposta = await  fetch(`/api/lawyers/editLawyer/${idAdvogado}`, {
                    method: "POST",
                    body: novosDados

                    }).then((res)=> res.json())
                        .then((res)=> res)
                        .catch((erro)=> new Error("Erro ao buscar dados"))

                console.log(resposta)

                return resposta
        }
})


const botaoAdicionar = document.querySelector(".adicionar")
botaoAdicionar.addEventListener("click", ()=>{

    let formularioAdd = document.querySelector(".formularioAdd")
    formularioAdd = new FormData(formularioAdd)
    
    fetch("/api/lawyers/addLawyer", {
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


                const div_1_2 = document.createElement("div")
                div_1_2.setAttribute("class", "d-flex justify-content-end align-items-center w-25")

                    const img_2 = document.createElement("img")
                    img_2.setAttribute("class", "img-fluid mr-3 h-100 ")
                    img_2.setAttribute("src", "/img/editIcon.svg")
                    img_2.setAttribute("data-bs-toggle", "modal" )
                    img_2.setAttribute("data-bs-target","#staticBackdrop" )
                    img_2.setAttribute("cod", advogado.id)
                    img_2.style.width = "25px"
                    img_2.style.height = "25px"
                    img_2.style.cursor = "pointer"

                    

                    img_2.addEventListener("click", ()=>{

                    id_atual = advogado.id

                    const id = img_2.getAttribute("cod")

                    fetch(`/api/lawyers/lerAdvogado/${id_atual}`, {
                            method:"GET",
                            credentials:"include",
                            headers:{"content-type": "application/json"}
                        }).then((res)=> res.json())
                        .then(res=>{

                            console.log(res)
                            

                            const modalEditar = document.getElementById("modal-editar")
                            const nome = document.querySelector(".nomeAdvogado")
                            const escritorio = document.querySelector(".escritorio")
                            const descricao = document.querySelector(".descricao")
                            
                            nome.setAttribute("value", res.nome  ) 
                            escritorio.setAttribute("value", res.escritorio  ) 
                            descricao.innerText = res.descricao
                            


                        })
                        .catch((error)=>{

                            

                            deleteLoadingText()
                            writeErrorText()
                        })





                    })

                


                    const img_3 = document.createElement("img")
                    img_3.setAttribute("class", "img-fluid mr-3 h-100")
                    img_3.setAttribute("src", "/img/deleteIcon.svg")
                    img_3.setAttribute("data-bs-toggle", "modal" )
                    img_3.setAttribute("data-bs-target","#staticBackdrop2" )
                    img_3.style.width = "25px"
                    img_3.style.height = "25px"
                    img_3.style.cursor = "pointer"
                    


                    img_3.addEventListener("click", ()=>{

                        id_atual = advogado.id

                        const modal_deletar = document.getElementById("modal-deletar")
                        
                        const paragrafo = document.createElement("p")
                        paragrafo.innerText =  `tem certeza que pretende eliminar o advogado ${advogado.nome} ?`

                        modal_deletar.innerHTML = ""
                        modal_deletar.appendChild(paragrafo)

                    })
                

                    const img_4 = document.createElement("img")
                    img_4.setAttribute("class", "img-fluid mr-3 h-100 ")
                    img_4.setAttribute("src", "/img/userCircle.svg")
                    img_4.setAttribute("data-bs-toggle", "modal" )
                    img_4.setAttribute("data-bs-target","#staticBackdrop4" )
                    img_4.setAttribute("cod", advogado.id)
                    img_4.style.width = "25px"
                    img_4.style.height = "25px"
                    img_4.style.cursor = "pointer"

                    

                    img_4.addEventListener("click", ()=>{

                    id_atual = advogado.id


                    fetch(`/api/user/advogado/${id_atual}`, {
                            method:"POST",
                            credentials:"include",
                            headers:{"content-type": "application/json"}
                        }).then((res)=> {

                            return res.json()})
                        .then(res=>{

                            

                            const modalUser = document.getElementById("modal-user")
                            const nome = document.querySelector(".nomeUser")
                            const sobrenome = document.querySelector(".sobrenomeUser")
                            const email = document.querySelector(".emailUser")
                            const telefone = document.querySelector(".telefoneUser")

                            nome.setAttribute("value", res.nome ? res.nome : ""  ) 
                            sobrenome.setAttribute("value", res.sobrenome ? res.sobrenome : ""  ) 
                            email.setAttribute("value",  res.email ? res.email : ""  ) 
                            telefone.setAttribute("value", res.telefone ? res.telefone : "" )

                            if(res.length > 0){

                                const botaoAdicionar = document.querySelector(".criarConta") 
                                botaoAdicionar.innerText = "Atualizar"
                            }

                        })
                        .catch((error)=>{

                            console.log(error)
                  
                        })





                    })

                

                div_1_2.appendChild(img_2)
                div_1_2.appendChild(img_3)
                div_1_2.appendChild(img_4)


        div_1.appendChild(div_1_1)
        div_1.appendChild(div_1_2)

        container.appendChild(div_1)

        }

function inicializadorAdvogado(){

    fetch("/api/lawyers/showLawyers", {
        method:"GET",
        credentials:"include",
        headers:{"content-type": "application/json"}
    }).then((res)=> res.json()) 
    .then(res=>{

        
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