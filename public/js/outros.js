async function inicializadorConsultas(){

    async function buscarConsultas(){

            const resposta = await fetch("/consulta/minhasConsultas").then((res)=> res.json())
                                                                .catch((error)=> ["erro", "erro ao buscar dados"])
            return resposta

            }

    function escreverConsultas(consultas){

        const containerMinhasConsultas = document.querySelector(".minhasConsultas")
        consultas.forEach((consulta)=>{

            const nome = document.createElement("p")
            nome.innerText = "Ben Fernao"
            containerMinhasConsultas.appendChild(nome)

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
            escreverConsultas(consultas)
        }         
    }
}

inicializadorConsultas()