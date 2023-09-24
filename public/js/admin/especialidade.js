async function inicializadorEspecialidade(){


    const conteudo = document.querySelector("#containerEspecialidades")
    // const alertaEspecialidade = document.querySelector(".alertaEspecialidade")

    
    const resposta = await fetch("/especialidade/lerEspecialidades")
        .then((res)=> res.json())
        .catch((error)=> ["erro", "erro ao enviar os dados"]) 
    
    

    if(!(resposta[0] == "erro")){

        if(resposta.length == 0){
            conteudo.innerText = "Nenhuma especiadade registada até o momento"
        }else{

                conteudo.innerHTML = ""
                resposta.forEach((elemento, i)=>{

                    const div = document.createElement("div")
                    div.className = "d-flex justify-content-between align-items-center w-100 p-2 mb-3"
                    div.style.backgroundColor = "#FDFBFB"

                    const paragrafo = document.createElement("h6")
                    paragrafo.innerText = elemento.nome

                    div.appendChild(paragrafo)

                    const div_1 = document.createElement("div")
                    div_1.className = "d-flex justify-items-start align-items-center"



                    const imageAdvogado = document.createElement("img")
                    imageAdvogado.src= "/img/advogado.svg"
                    imageAdvogado.className = "img-fluid mr-3 h-100"
                    imageAdvogado.style.width = "30px"
                    imageAdvogado.style.height = "30px"
                    imageAdvogado.style.cursor = "pointer"
                    imageAdvogado.setAttribute("data-bs-toggle", "modal")
                    imageAdvogado.setAttribute("data-bs-target","#staticBackdrop11" )

                    imageAdvogado.addEventListener("click", async ()=>{

                        
                        const res = await fetch(`/especialidade/lerAdvogadosEspecializados/${elemento.id}`)
                                                                    .then((res)=> res.json())
                                                                    .catch((error)=> ["erro","Erro ao buscar dados"])

                        
                                                                    
                        if(!(res[0]== "erro")){


                            const conteudoAdvogadosEspecializados = document.querySelector(".conteudoAvogadosEspecializados")
                            conteudoAdvogadosEspecializados.innerHTML = ""
                            
                            const todosadvogados = res[1]
                            const advogadosEspecializados = res[0]

                            

                            const idsAdvogadosEspecializados = advogadosEspecializados.map((adv, i)=>{

                                return adv.id
                            })

                            console.log(advogadosEspecializados)



                            // sinalizador
                            const sinalizacao = todosadvogados.map((adv, i)=>{


                                if(idsAdvogadosEspecializados.includes(adv.id)){

                                    return 1
                                }else{
                                    return 0
                                }
                            })


                            sinalizacao.forEach((sinal, i)=>{

                                    const input = document.createElement("input")
                                    input.type = "checkbox"
                                    input.disabled = true
                                    input.style.marginLeft = "10px"
                                    input.style.marginRight = "2px"

                                    const label = document.createElement("label")
                                    label.innerText = todosadvogados[i].nome

                                    input.addEventListener("click", (e)=>{
                                        if(input.checked){
                                            estadoAtualizado[i] = 1
                                        }else{
                                            estadoAtualizado[i] = 0
                                        }

                                        
                                    })

                                if(sinal == 1){

                                    const div = document.createElement("div")
                                    div.style.display = "block"
                                    div.appendChild(label)
                                    div.appendChild(input)

                                    conteudoAdvogadosEspecializados.appendChild(div)
                                    


                                }else{

                                    input.checked = false

                                    const div = document.createElement("div")
                                    div.style.display = "block"
                                    div.appendChild(label)
                                    div.appendChild(input)

                                                                        
                                    conteudoAdvogadosEspecializados.appendChild(div)
                                }                                        
                            })



                        }else{

                            const alerta = document.querySelector(".alertaAdvogadosEspecializados")
                            alerta.className = "alert alert-danger alertaAdvogadosEspecializados"
                            alerta.innerText = "Erro ao atualizar os dados"
                        }
                        

                        
                    })

                    /*
                    const botaoAdvogadosDaEspecialidade = document.querySelector(".botaoAdvogadosDaEspecialidade")
                    botaoAdvogadosDaEspecialidade.addEventListener("click", async ()=>{

                                          
                            
                            const res = await fetch(`/especialidade/advogados/${elemento.id}`)
                                                                    .then((res)=> res.json())
                                                                    .catch((error)=> ["erro", "erro ao enviar os dados"])  
                                                                    
                            console.log(res)
                        })
                    */

 
                    div_1.appendChild(imageAdvogado)
                    div.appendChild(div_1)

                    conteudo.appendChild(div)

                    const botaoAtualizarEspecialidade = document.querySelector(".botaoAtualizarEspecialidade")
                    botaoAtualizarEspecialidade.addEventListener("click", async ()=>{

                            const novoNome =  document.querySelector(".novoNomeDaEspecialidade").value                
                            
                            const res = await fetch(`/especialidade/editarEspecialidade/${elemento.id}`, 
                                                                    {
                                                                        body: JSON.stringify({nome  : novoNome }),
                                                                        method: "PUT",
                                                                        headers: {"content-type":"application/json"}

                                                                    })
                                                                    .then((res)=> res.json())
                                                                    .catch((error)=> ["erro", "erro ao enviar os dados"])  
                                                                    
                                    console.log(res)
                        })}) }
    
    
        }else{

        alertaEspecialidade.innerText = "ocorreu um erro ao buscar dados"
        alertaEspecialidade.className = "alert alert-danger mt-3"

    }
    


}


inicializadorEspecialidade()

const botaoAdicionarEspecialidade = document.querySelector(".adicionarEspecialidade")
const alertaEspecialidade = document.querySelector(".alertaEspecialidade")


botaoAdicionarEspecialidade.addEventListener("click", async ()=>{

    console.log("Especialidade")
    const nome = document.querySelector(".nomeDaEspecialidade").value
    if(nome){

        const resposta = await fetch("/especialidade/adicionar", {
            body :JSON.stringify({nome}),
            method: "POST",
            headers: {"content-type": "application/json"}
        }).then((res)=> res.json())
        .catch((error)=> ["erro", "erro ao enviar os dados"])

        console.log("resposta")

        if(!(resposta[0] == "erro")){

            alertaEspecialidade.innerText = "Correto"
            alertaEspecialidade.className = "alert alert-success mt-3"

        }else{

            alertaEspecialidade.innerText = "Erro ao registar a especialidade"
            alertaEspecialidade.className = "alert alert-danger mt-3"

        }

    }else{
        alertaEspecialidade.innerText = "Escreva o nome da especialidade"
        alertaEspecialidade.className = "alert alert-danger mt-3"
    }

})



function diferencialDeEstado(arrayA, arraB){

    const  itensAdicionais = []
    const itensEliminatorios = []

     arrayA.forEach((element, i) => {

        if(element != arraB[i]){
            if(arraB[i]){

                itensAdicionais.push(i)

            }else{
                itensEliminatorios.push(i)
            }
        }
    });

    return [itensAdicionais, itensEliminatorios]


}