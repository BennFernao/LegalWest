

const botaoEnviarContacto = document.getElementById("botaoEnviarContacto")

botaoEnviarContacto.addEventListener("click", async ()=>{

    const nome = document.getElementById("nomeParaContacto").value
    const email = document.getElementById("emailParaContacto").value
    const servico = document.getElementById("servicoParaContacto").value
    const  data = document.getElementById("dataParaContacto").value 
    const hora = document.getElementById("horaParaContacto").value

    const alertaParaContacto = document.getElementById("alertaParaContacto")
    alertaParaContacto.setAttribute("class", "alert alert-warning text-center")
    alertaParaContacto.innerHTML = "<p>Enviando...</p>"

    
    if(nome && email && hora && data && servico ){

        const resposta = await fetch("/api/email/fazerUmPedido", {
            method: "POST",
            body : JSON.stringify({nome, email, data , hora, servico}),
            headers:{"Content-Type":"application/json"}
        }).then((res)=> res.json())
        .catch((error)=> Error("erro ao enviar a messagem"))

        if(resposta[0] == "sucesso"){
            
            alertaParaContacto.setAttribute("class", "alert alert-primary")
            alertaParaContacto.innerHTML = "<p>Messagem enviada com sucesso, contactaremos em breve</p>"
            document.getElementById("nomeParaContacto").value = ""
            document.getElementById("emailParaContacto").value = ""
            document.getElementById("servicoParaContacto").value = ""
            document.getElementById("dataParaContacto").value  = ""
            document.getElementById("horaParaContacto").value = ""

            setTimeout(()=>{

                alertaParaContacto.setAttribute("class", "")
                alertaParaContacto.innerHTML = ""
            }, 10000)
        }else{

            
            alertaParaContacto.setAttribute("class", "alert alert-danger")
            alertaParaContacto.innerHTML = "<p>Erro ao enviar a  mensagem, tente novamente</p>"
            setTimeout(()=>{
                alerta.setAttribute("class", "")
                alerta.innerHTML = ""
            }, 3000)

        }
    }else{

        
            alertaParaContacto.setAttribute("class", "alert alert-danger")
            alertaParaContacto.innerHTML = "<p>Preencha todos os campos</p>"
            setTimeout(()=>{
                alertaParaContacto.setAttribute("class", "")
                alertaParaContacto.innerHTML = ""
            }, 3000)

    }


})

