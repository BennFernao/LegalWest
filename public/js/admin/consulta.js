
const containerMinhasConsultas = document.querySelector(".minhasConsultas")
const containerHorario = document.querySelector(".containerHorario")
const horarioDisponiveis = document.querySelector(".horarioDisponiveis")
const horarioContainer = document.querySelector(".horarioContainer")

async function inicializadorConsultas(){

        containerMinhasConsultas.innerHTML = ""
   

        async function buscarConsultas(){
    
                const resposta = await fetch("/consulta/lerMinhasConsultasAtivas").then((res)=> res.json())
                                                                    .catch((error)=> ["erro", "erro ao buscar dados"])

                console.log(resposta, )
                return resposta
    
            }
    
        function escreverConsultas(consultas, descritivos){

            console.log(descritivos)
    
            const containerMinhasConsultas = document.querySelector(".minhasConsultas")
            consultas.forEach((consulta, i )=>{

                

                const div = document.createElement("div")
                div.className = "d-flex justify-content-between align-items-center w-100 p-2 mb-3"
                div.style.backgroundColor = "#FDFBFB"
    
                const nomeUser = document.createElement("p")
                nomeUser.innerText = `De ${consulta.user.nome}   ${consulta.user.sobrenome} para ${consulta.advogado.nome}    `

                const data = document.createElement("span")
                data.innerText  = descritivos[i].para 

                //novos itens

                const link = document.createElement("a")
                link.href = `/meet/${descritivos[i].id}`

                const textoDoLink = document.createElement("span")
                textoDoLink.innerText  = "entrar"

                link.appendChild(textoDoLink)


                const div2 = document.createElement("div")
                div2.className = "d-flex flew-column justify-content-between align-items-center w-100 p-2 mb-3"

                div2.appendChild(nomeUser)
                div2.appendChild(data)
                div2.appendChild(link)
                div.appendChild(div2)



                containerMinhasConsultas.appendChild(div)
    
            })
        }
    
    
        const consultas = await buscarConsultas()
        
        if(consultas[0] == "erro"){
    
            const containerMinhasConsultas = document.querySelector(".minhasConsultas")
    
            const nome = document.createElement("p")
            nome.innerText = "Erro ao buscar consultas"
            containerMinhasConsultas.appendChild(nome)
            
        }else{
    
    
            if(consultas.length == 0){
    

    
                const nome = document.createElement("p")
                nome.innerText = "Você não tem consultas novas"
                containerMinhasConsultas.appendChild(nome)
                
            }else{
                escreverConsultas(consultas[1], consultas[0])
            }         
        }
    }
    

