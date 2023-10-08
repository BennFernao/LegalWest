const botaoSubscrever = document.getElementById("botaoSubscrever")
botaoSubscrever.addEventListener("click", async ()=>{

        const email = document.getElementById("emailASubscrever").value
        const alerta = document.getElementById("alertaSubscrever")
       

        if(email ){
                
                const resposta = await fetch("/api/email/subscrever", {
                    method: "POST",
                    body : JSON.stringify({email}),
                    headers:{"Content-Type":"application/json"}
                }).then((res)=> res.json())
                .catch((error)=> Error("error"))

              

                if(resposta[0] == "sucesso"){
                    
                    
                    alerta.setAttribute("class", "alert alert-primary d-block")
                    alerta.innerHTML = "<p>successfully subcrited </p>"
                    setTimeout(()=>{
                        alerta.setAttribute("class", "")
                        alerta.innerHTML = ""
                    }, 3000)
                }else{
                    
                    
                    
                    alerta.setAttribute("class", "alert alert-danger d-block")
                    alerta.innerHTML = `<p>Error sending data</p>`
                    setTimeout(()=>{
                        alerta.setAttribute("class", "")
                        alerta.innerHTML = ""
                    }, 3000)

                }
                }else{

                    
                    alerta.setAttribute("class", "alert alert-danger")
                    alerta.innerHTML = "<p>Fill in your email</p>"
                    setTimeout(()=>{
                        alerta.setAttribute("class", "")
                        alerta.innerHTML = ""
                    }, 3000)

                }

    })



