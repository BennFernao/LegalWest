

const containerMinhasConsultas = document.querySelector(".minhasConsultas")
const containerHorario = document.querySelector(".containerHorario")
const horarioDisponiveis = document.querySelector(".horarioDisponiveis")
const horarioContainer = document.querySelector(".horarioContainer")

async function inicializadorConsultas(){

  
        containerMinhasConsultas.innerHTML = ""


        async function buscarConsultas(){
    
                const resposta = await fetch("/consulta/consultasAtivas").then((res)=> res.json())
                                                                    .catch((error)=> ["erro", "erro ao buscar dados"])

                
                return resposta
    
            }
    
        function escreverConsultas(consultas){

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
                horarioElement.className = "col-lg-3"


                const acaoElement = document.createElement("span")
                acaoElement.innerText = "Acao"
                acaoElement.style.color = "#000"
                acaoElement.className = "col-lg-3"



                
                divCabecalho.appendChild(advogadoElement)
                divCabecalho.appendChild(SolicitanteElement)
                divCabecalho.appendChild(horarioElement)
                divCabecalho.appendChild(acaoElement)
                

                containerMinhasConsultas.appendChild(divCabecalho)
            }

            const containerMinhasConsultas = document.querySelector(".minhasConsultas")

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
                div.className = "row  p-2 mb-3"
                div.style.backgroundColor = "#FDFBFB"
    
                const nomeUser = document.createElement("p")
                nomeUser.innerText = `${consulta.user.nome}   ${consulta.user.sobrenome}`
                nomeUser.className = "col-lg-3"

                const advogadoSolicitado = document.createElement("p")
                advogadoSolicitado.innerText = `${consulta.advogado.nome} `
                advogadoSolicitado.className = "col-lg-3"

                
                const horario = document.createElement("span")
                horario.innerText  = consulta.horario
                horario.className = "col-lg-3"

                const acao = document.createElement("button")
                acao.innerText  = "Ver"
                acao.className = "col-lg-3 btn btn-primary"
                

                acao.addEventListener("click", ()=>{

                    console.log(consulta)
                    location.href = "/meet/iniciarReuniao/"+ consulta.id
                })

                
                

                const div2 = document.createElement("div")
                div2.className = "d-flex flew-column justify-content-between align-items-center w-100 p-2 mb-3"

                div2.appendChild(nomeUser)
                div2.appendChild(advogadoSolicitado)
                div2.appendChild(horario)
                div2.appendChild(acao)



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
                const [descritivos, principaisDadosDaConsulta ] = consultas

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

                console.log(dadosDaConsultaCompactados)
                
                escreverConsultas(dadosDaConsultaCompactados)
            }         
        }
}
    







