let id_atual = ""




const container = document.querySelector(".dadosDoAdvogado")



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
                    img_2.setAttribute("src", "/img/eye.svg")
                    img_2.setAttribute("data-bs-toggle", "modal" )
                    img_2.setAttribute("data-bs-target","#staticBackdrop" )
                    img_2.setAttribute("cod", advogado.id)
                    img_2.style.width = "25px"
                    img_2.style.height = "25px"
                    img_2.style.cursor = "pointer"

                    

                    img_2.addEventListener("click", ()=>{

                    id_atual = advogado.id

                    const id = img_2.getAttribute("cod")

                    fetch(`../lawyers/lerAdvogado/${id_atual}`, {
                            method:"GET",
                            credentials:"include",
                            headers:{"content-type": "application/json"}
                        }).then((res)=> res.json())
                        .then(res=>{

                            

                            const modalEditar = document.getElementById("modal-editar")
                            const nome = document.querySelector(".nomeUser")
                            const escritorio = document.querySelector(".escritorio")
                            const descricao = document.querySelector(".descricao")

                           
                            nome.innerText = res.nome  
                            escritorio.innerText = res.escritorio  
                            descricao.innerText = res.descricao

                        })
                        .catch((error)=>{

                           

                            deleteLoadingText()
                            writeErrorText()
                        })





                    })



                

                div_1_2.appendChild(img_2)


        div_1.appendChild(div_1_1)
        div_1.appendChild(div_1_2)

        container.appendChild(div_1)

        }

function inicializador(){

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

inicializador()