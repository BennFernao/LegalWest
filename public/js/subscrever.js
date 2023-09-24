const botaoSubscrever = document.getElementById("botaoSubscrever")
botaoSubscrever.addEventListener("click", async ()=>{

    const email = document.getElementById("emailASubscrever").value
    const alerta = document.getElementById("alertaSubscrever")
   

    if(email ){


            alerta.setAttribute("class", "alert alert-primary d-block")
            alerta.innerHTML = "<p>Cadastrando</p>"

            
            const resposta = await fetch("/email/subscrever", {
                method: "POST",
                body : JSON.stringify({email}),
                headers:{"Content-Type":"application/json"}
            }).then((res)=> res.json())
            .catch((error)=> Error("erro ao enviar a messagem"))

          

            if(resposta[0] == "sucesso"){
                
    
                alerta.setAttribute("class", "alert alert-primary d-block")
                alerta.innerHTML = "<p>Subscrito com sucesso</p>"
                setTimeout(()=>{
                    alerta.setAttribute("class", "")
                    alerta.innerHTML = ""
                }, 3000)
            }else{
                
                
                
                alerta.setAttribute("class", "alert alert-danger d-block")
                alerta.innerHTML = `<p>${resposta[1]}</p>`
                setTimeout(()=>{
                    alerta.setAttribute("class", "")
                    alerta.innerHTML = ""
                }, 3000)

            }
            }else{

                
                alerta.setAttribute("class", "alert alert-danger")
                alerta.innerHTML = "<p>Preencha o seu email</p>"
                setTimeout(()=>{
                    alerta.setAttribute("class", "")
                    alerta.innerHTML = ""
                }, 3000)

            }

})

