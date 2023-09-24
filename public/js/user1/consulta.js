async function inicializadorHorario(){
      

    async function buscarHorarios(){

            const resposta = await fetch("/horario/lerHorarioAtual").then((res)=> res.json())
                                                                .catch((error)=> ["erro", "erro ao buscar dados"])


            if(!(resposta[0] == "erro")){

                let {dias , horario} = resposta
                
            
                dias = dias.split(",")
                dias = dias.map((valor, i)=>{
                    return parseInt(valor)
                })

                horario = horario.split(",")

                
                return {dias, horario}
                

            }else{

                return "erro"
            }

        }

async function EscreverHorarios(dias, horarios){

        const diasDeSemana = ["Segunda Feira", "Terça Feira","Quarta Feira","Quinta Feira","Sexta Feira", "Sábado", "Domingo"]
        let diasDeAtuacao = dias
        let horario = horarios
        

        diasDeSemana.forEach((valor, i)=>{


                

                const div = document.createElement("div")
                div.setAttribute("class", "form-check mb-2" )

                const input = document.createElement("input")
                input.className ="form-check-input"
                input.type = "checkbox"
                input.id = "flexCheckChecked"
                input.checked = diasDeAtuacao[i] ?  true : false

                const botaoSalvar = document.querySelector(".botaoSalvarHorario")

                                        
                botaoSalvar.addEventListener("click", async  (e)=>{
                    const resposta = await fetch("/horario/atualizar", {
                        method : "PUT",
                        body:JSON.stringify({horario , dias: diasDeAtuacao}),
                        headers:{"content-type": "application/json"}
                    }).then((res=> res.json()))
                    .catch((erro)=> Error("erro"))     
                })


                input.addEventListener("change",  (e)=>{

                    setTimeout(()=>{
                        botaoSalvar.style.display = "block"
                    }, 1000 )
                    
                    

                    if(input.checked){
                        diasDeAtuacao[i] = 1
                    }else{
                        diasDeAtuacao[i] = 0
                    }

                    
                })
                

                const label = document.createElement("label")
                label.className = "form-check-label"
                label.for = "flexCheckChecked"
                label.innerText = diasDeSemana[i]

                div.appendChild(input)
                div.appendChild(label)

              
                containerHorario.appendChild(div)
    })


        const items =["Intervalo de consultas","Hora Inicial", "Hora Final"]


        const botaoSalvar = document.querySelector(".botaoSalvarHorario")
        botaoSalvar.addEventListener("click", async  (e)=>{
                const resposta = await fetch("/horario/atualizar", {
                    method : "PUT",
                    body:JSON.stringify({horario , dias: diasDeAtuacao}),
                    headers:{"content-type": "application/json"}
                }).then((res=> res.json()))
                .catch((erro)=> Error("erro"))

                console.log(resposta)
            })

        
        horario.forEach((valor, i)=>{

            const input = document.createElement("input")
            input.className = "form-control"
            input.type = "time"
            input.value = valor



            input.addEventListener("change", (e)=>{

                setTimeout(()=>{
                        botaoSalvar.style.display = "block"
                }, 1000)

                
                horario[i] = input.value 
                const intervaloDeHoras = converterParaMinutos(horario[0])
                const horasDisponiveis = calcularHoras(horario[1], horario[2], intervaloDeHoras)

                const horarioDisponiveis = document.querySelector(".horarioDisponiveis")
                horarioDisponiveis.innerHTML = ""
                horasDisponiveis.forEach((value, index)=>{

                    const horario = document.createElement("p")
                    horario.innerText = value

                    horarioDisponiveis.appendChild(horario)   
                })

                
            })

            const label = document.createElement("label")
            label.innerText = items[i]
            label.style.marginTop = "10px"

            horarioContainer.appendChild(label)
            horarioContainer.appendChild(input)

        })
        const intervaloDeHoras = converterParaMinutos(horario[0])
        const horasDisponiveis = calcularHoras(horario[1], horario[2], intervaloDeHoras)


        horasDisponiveis.forEach((value, index)=>{

            const horario = document.createElement("p")
            horario.innerText = value

            horarioDisponiveis.appendChild(horario)   
        })

        // Função para calcular a diferença entre duas horas
        function calcularDiferencaHoras(hora1, hora2) {
                // Extrai os valores de hora e minutos
                var parts1 = hora1.split(":");
                var hours1 = parseInt(parts1[0]);
                var minutes1 = parseInt(parts1[1]);

                var parts2 = hora2.split(":");
                var hours2 = parseInt(parts2[0]);
                var minutes2 = parseInt(parts2[1]);

                // Converte as horas para minutos
                var time1InMinutes = hours1 * 60 + minutes1;
                var time2InMinutes = hours2 * 60 + minutes2;

                // Calcula a diferença em minutos
                var diffInMinutes = Math.abs(time1InMinutes - time2InMinutes);

                // Converte a diferença de volta para o formato de hora
                var diffHours = Math.floor(diffInMinutes / 60);
                var diffMinutes = diffInMinutes % 60;

                // Formata a diferença para exibição
                var formattedDiff = (diffHours < 10 ? "0" : "") + diffHours + ":" + (diffMinutes < 10 ? "0" : "") + diffMinutes;

                return formattedDiff;
            }

        function somarHoras(hora1, hora2){
            // Extrai os valores de horas e minutos do input

                var inputTime1 = hora1
                var inputTime2 = hora2

                // Converte os valores de hora em minutos
                var time1Parts = inputTime1.split(":");
                var time1Hours = parseInt(time1Parts[0]);
                var time1Minutes = parseInt(time1Parts[1]);
                var time1InMinutes = time1Hours * 60 + time1Minutes;

                var time2Parts = inputTime2.split(":");
                var time2Hours = parseInt(time2Parts[0]);
                var time2Minutes = parseInt(time2Parts[1]);
                var time2InMinutes = time2Hours * 60 + time2Minutes;

                // Soma os tempos em minutos
                var totalMinutes = time1InMinutes + time2InMinutes;

                // Converte o resultado de volta para o formato de hora
                var hours = Math.floor(totalMinutes / 60);
                var minutes = totalMinutes % 60;

                // Formata a hora para exibição
                var formattedTime = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;

                // Exibe o resultado
                return formattedTime

        }

        function converterParaMinutos(hora) {
            // Extrai os valores de hora e minutos
            var parts = hora.split(":");
            var hours = parseInt(parts[0]);
            var minutes = parseInt(parts[1]);

            // Converte as horas para minutos e retorna o resultado como um número inteiro
            var totalMinutes = hours * 60 + minutes;
            return totalMinutes;
            }

        function calcularHoras(horaInicial, horaFinal, intervalo) {
            var resultado = [];
            var horaAtual = horaInicial;

            while (horaAtual <= horaFinal) {
                resultado.push(horaAtual);

                // Extrai os valores de hora e minutos da hora atual
                var parts = horaAtual.split(":");
                var hours = parseInt(parts[0]);
                var minutes = parseInt(parts[1]);

                // Converte as horas para minutos e adiciona o intervalo
                var timeInMinutes = hours * 60 + minutes;
                timeInMinutes += intervalo;

                // Converte o tempo de volta para o formato de hora
                hours = Math.floor(timeInMinutes / 60);
                minutes = timeInMinutes % 60;

                // Formata a hora para exibição
                horaAtual = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
            }

            return resultado;
    }


    }

}

const containerMinhasConsultas = document.querySelector(".minhasConsultas")


async function inicializadorConsultas(){

        
        containerMinhasConsultas.innerHTML = ""


        inicializadorHorario()

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
    







