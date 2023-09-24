
async function inicializadorConsultas(){

        async function buscarConsultas(){
    
                const resposta = await fetch("/consulta/lerMinhasConsultasAtivasUser").then((res)=> res.json())
                                                                    .catch((error)=> ["erro", "erro ao buscar dados"])
            
                
                return resposta 
            }
    
        function escreverConsultas(consultas, descritivos){


            
            const containerMinhasConsultas = document.querySelector(".minhasConsultas")
            
            consultas.forEach((consulta, i )=>{

                
                const div = document.createElement("div")
                div.className = "d-flex justify-content-between align-items-center w-100 p-2 mb-3"
                div.style.backgroundColor = "#FDFBFB"
    
                const nomeUser = document.createElement("p")
                nomeUser.innerText = `De ${consulta.user.nome}   ${consulta.user.sobrenome} para ${consulta.advogado.nome}    `

                const data = document.createElement("span")
                data.innerText  = descritivos[i].para 
                const div2 = document.createElement("div")
                div2.className = "d-flex flew-column justify-content-between align-items-center w-100 p-2 mb-3"

                div2.appendChild(nomeUser)
                div2.appendChild(data)
                div.appendChild(div2)


                containerMinhasConsultas.innerHTML = ""
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
    
                const containerMinhasConsultas = document.querySelector(".minhasConsultas")
    
                const nome = document.createElement("p")
                nome.innerText = "Você não tem consultas novas"
                containerMinhasConsultas.appendChild(nome)
                
            }else{
                escreverConsultas(consultas[1], consultas[0])
            }         
        }
    }
  
    








