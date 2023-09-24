const botaoEnviar = document.getElementById("botaoEnviar")

botaoEnviar.addEventListener("click", async ()=>{

        const nome = document.getElementById("nome").value
        const email = document.getElementById("email").value
        const servico = document.getElementById("servico").value
        const hora  = document.getElementById("hora").value
        const data = document.getElementById("data").value

        

        if(nome && email && servico && hora && data ){
            
           
            const resposta = await fetch("/email/fazerUmPedido", {
                method: "POST",
                body : JSON.stringify({nome , email , servico , hora , data }),
                headers:{"Content-Type":"application/json"}
            }).then((res)=> res.json())
            .catch((error)=> Error("Error  sending data, try later"))

            if(resposta[0] == "sucesso"){
                const alerta = document.getElementById("alerta")
                alerta.setAttribute("class", "alert alert-primary")
                alerta.innerHTML = "<p>Message sent sucessfully</p>"
                setTimeout(()=>{
                    alerta.setAttribute("class", "")
                    alerta.innerHTML = ""
                }, 3000)
            }else{

                console.log(resposta)

                const alerta = document.getElementById("alerta")
                alerta.setAttribute("class", "alert alert-danger")
                alerta.innerHTML = "<p>Error  sending data, try later</p>"
                setTimeout(()=>{
                    alerta.setAttribute("class", "")
                    alerta.innerHTML = ""
                }, 3000)

            }
        }else{

            const alerta = document.getElementById("alerta")
                alerta.setAttribute("class", "alert alert-danger")
                alerta.innerHTML = "<p>fill in all fields</p>"
                setTimeout(()=>{
                    alerta.setAttribute("class", "")
                    alerta.innerHTML = ""
                }, 3000)

        }
    })