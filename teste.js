function estruturar(arrayDisponibilidade, consultasMarcadas){


    console.log(arrayDisponibilidade, consultasMarcadas)

    

    const diasDeSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado" ]

    const diaDeSemana = (new Date()).getDay()
    const dataDeHoje =  new Date().toLocaleDateString()


    // transformando os dias padronizados em dias atuais
    let diasPermitidos = diasDeSemana.slice(diaDeSemana, 7).concat(diasDeSemana.slice(0, diaDeSemana))
    let arrayDisponibilidadeAjustada = arrayDisponibilidade.slice(diaDeSemana, 7).concat(arrayDisponibilidade.slice(0, diaDeSemana))

    arrayDisponibilidadeAjustada = arrayDisponibilidade.map((dia,pos)=>{

        const posicaoDoDia = diasDeSemana.indexOf(dia)

        return {
            nomeDoDia : dia,
            posicaoOriginal : posicaoDoDia
        }

    })


    // Pegando as datas por ordem dos dias de disponibilidade
    const suasDatas = arrayDisponibilidade.map((item, i)=>{

        return   new Date(Date.now()+(i*1000*60*60*24)).toLocaleDateString()
    })

    
    
    const horariosMarcados = consultasMarcadas.map((item, i)=>{

        
        const data = converterUTCParaLocal(item.para)
       
        const diaDaConsulta = new Date(data).getDay()

        
        let horaDaConsulta = new Date(data).getHours()
        let minutos = new Date(data).getMinutes()



        horaDaConsulta = horaDaConsulta > 10 ? horaDaConsulta : "0" + horaDaConsulta.toString()
        minutos = minutos > 10 ? minutos : "0" + minutos.toString()


        return {
            diaDaConsulta,
            data:horaDaConsulta +":"+minutos        
        }
    })


    const estrutura = []

    console.log(arrayDisponibilidade)

    arrayDisponibilidadeAjustada.forEach((item, pos)=>{

        if(item){

            estrutura.push({
            diaDeSemana : diasPermitidos[pos],
            data : suasDatas[pos],
            disponibilidade : 1,
            horariosOcupados : []
            }) 

        }else{

            estrutura.push({
            diaDeSemana : diasPermitidos[pos],
            data : suasDatas[pos],
            disponibilidade : 0,
            horariosOcupados : []
            }) 

        }



    })


    
    

    
    horariosMarcados.forEach((item, pos)=>{
        
        estrutura[item.diaDaConsulta].horariosOcupados.push(item.data)
    })

   
    

    return estrutura
    }
