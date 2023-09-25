async function inicializadorHistorico(){

    async function buscarConsultas(){

            const resposta = await fetch("/api/consulta/historicoRecente").then((res)=> res.json())
                                                                .catch((error)=> ["erro", "erro ao buscar dados", error])
        
            console.log(resposta )
            return resposta 
        }

    function escreverConsultas(consultas){

        const containerMinhasConsultas = document.querySelector(".meuHistorico")

        function escreverDataTitulo (titulo){

            const divTitulo = document.createElement("div")
            divTitulo.style.display = "flex"
            divTitulo.style.flexDirection = "row"
            divTitulo.style.justifyContent = "center"
            divTitulo.style.alignItems = "center"
            divTitulo.style.width = "50px"
            divTitulo.style.height = "50px"
            divTitulo.style.borderRadius = "20px"
            divTitulo.style.backgroundColor = "#141e32"

            const elementoTitulo = document.createElement("h6")
            elementoTitulo.innerText = titulo
            elementoTitulo.style.color = "#ffffff"
            elementoTitulo.style.fontWeight = "bold"

            divTitulo.appendChild(elementoTitulo)

            containerMinhasConsultas.appendChild(divTitulo)
        }

        function escreverCabecalho(){

            const divCabecalho = document.createElement("div")
            divCabecalho.className = "row"
            divCabecalho.style.width = "100%"
            divCabecalho.style.height = "20px"
            divCabecalho.style.marginTop = "40px"
            divCabecalho.style.marginBottom = "4px"
            
            divCabecalho.style.borderRadius = "20px"
            divCabecalho.style.backgroundColor = "#fff"


            const advogadoElement = document.createElement("span")
            advogadoElement.innerText = "Advogado Solicitado"
            advogadoElement.style.color = "#000"
            advogadoElement.className = "col-lg-3"

            const SolicitanteElement = document.createElement("span")
            SolicitanteElement.innerText = "Solicitante"
            SolicitanteElement.style.color = "#000"
            SolicitanteElement.className = "col-lg-3"

            const horarioElement = document.createElement("span")
            horarioElement.innerText = "Horario"
            horarioElement.style.color = "#000"
            horarioElement.className = "col-lg-2"


            const dataElement = document.createElement("span")
            dataElement.innerText = "Data"
            dataElement.style.color = "#000"
            dataElement.className = "col-lg-2"

            const estadoElement = document.createElement("span")
            estadoElement.innerText = "Estado"
            estadoElement.style.color = "#000"
            estadoElement.className = "col-lg-2"



            
            divCabecalho.appendChild(advogadoElement)
            divCabecalho.appendChild(SolicitanteElement)
            divCabecalho.appendChild(horarioElement)
            divCabecalho.appendChild(dataElement)
            divCabecalho.appendChild(estadoElement)
            

            containerMinhasConsultas.appendChild(divCabecalho)
        }


        let tituloDaData = consultas[0].data
        escreverDataTitulo(tituloDaData)
        escreverCabecalho()

        consultas.forEach((consulta, i )=>{

            if(consulta.data !== tituloDaData){
                escreverDataTitulo(consulta.data)
                tituloDaData = consulta.data
                escreverCabecalho()
            }


  
            const div = document.createElement("div")
            div.className = "d-flex justify-content-between align-items-center w-100 p-2 mb-3"
            div.style.backgroundColor = "#FDFBFB"

            const nomeUser = document.createElement("p")
            nomeUser.innerText = `${consulta.user.nome}   ${consulta.user.sobrenome}`
            nomeUser.className = "col-lg-3"

            const advogadoSolicitado = document.createElement("p")
            advogadoSolicitado.innerText = `${consulta.advogado.nome} `
            advogadoSolicitado.className = "col-lg-3"

            
            const horario = document.createElement("span")
            horario.innerText  = consulta.horario
            horario.className = "col-lg-2"


            const data = document.createElement("span")
            data.innerText  = new Date(consulta.para).toLocaleDateString()
            data.className = "col-lg-2"

            const estado = document.createElement("span")
            estado.innerText  = consulta.estado
            estado.className = "col-lg-2"


            const div2 = document.createElement("div")
            div2.className = "row w-100"

            div2.appendChild(nomeUser)
            div2.appendChild(advogadoSolicitado)
            div2.appendChild(horario)
            div2.appendChild(data)
            div2.appendChild(estado)

            div.appendChild(div2)


            containerMinhasConsultas.appendChild(div)

        })
    }
   
    const consultas = await buscarConsultas()
    
    if(consultas[0] == "erro"){

        const containerMinhasConsultas = document.querySelector(".meuHistorico")

        const nome = document.createElement("p")
        nome.innerText = "Erro ao buscar consultas"
        containerMinhasConsultas.appendChild(nome)
        
    }else{

        const containerMinhasConsultas = document.querySelector(".meuHistorico")
        containerMinhasConsultas.innerHTML = ""


        if(consultas.length == 0){

            const nome = document.createElement("p")
            nome.innerText = "Você não tem consultas realizadas"
            containerMinhasConsultas.appendChild(nome)
            
        }else{

            const [descritivos, principaisDadosDaConsulta ] =  consultas

            let datas = descritivos.map((descritivo, _)=>{

                const {para} = descritivo
                const dataEmMilisegundos = new Date(para).getTime()
                return dataEmMilisegundos

            })

            let dadosDaConsultaCompactados = principaisDadosDaConsulta.map((pDado, i)=>{

                const novoPDado = {...pDado, data: datas[i]}
                return novoPDado
            })



            dadosDaConsultaCompactados.sort((a, b)=> a.data -b.data)

            dadosDaConsultaCompactados  = dadosDaConsultaCompactados.map((item, i)=>{
                let dataEmNovoFormato = new Date(item.data)
                horario = dataEmNovoFormato.getHours()+ "h:" + dataEmNovoFormato.getMinutes() + "m"
                dataEmNovoFormato = dataEmNovoFormato.getDate() + "/" + (dataEmNovoFormato.getMonth()+1)
                

                return {...item, data: dataEmNovoFormato, horario, ...descritivos[i]}
            })

            
            
            escreverConsultas(dadosDaConsultaCompactados)
        }         
    }
}




