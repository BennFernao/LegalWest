
const nome = document.querySelector(".nome")
const email = document.querySelector(".email")
const telefone = document.querySelector(".telefone")
const username = document.querySelector(".username")

async function inicializadorDadosDoUser(){



    const dadosDoUser = await buscarDadosDoUsuario()
    
    if(dadosDoUser[0] == "erro"){
        const alerta = document.querySelector(".alertaDadosDoUser")
        alerta.innerText = "Erro ao buscar os dados do usuário, tente novamente"
    }else{

        escreverDadosDoUser(dadosDoUser)
        escreverDadosParaModal(dadosDoUser)

    }

    function escreverDadosParaModal(user){

        const nomeModalUser = document.querySelector(".nomeModalUser")
        const sobrenomeModalUser = document.querySelector(".sobrenomeModalUser")
        const emailModalUser = document.querySelector(".emailModalUser")
        const telefoneModalUser = document.querySelector(".telefoneModalUser")

        

        nomeModalUser.value = user.nome 
        sobrenomeModalUser.value = user.sobrenome
        emailModalUser.value = user.email
        telefoneModalUser.value = user.telefone 


        async function atualizarDados(url, dados){

            const resposta = await fetch(url, {method: "PUT", headers:{"content-type":"application/json"}, body : JSON.stringify(dados)})
                                    .then(res=> res.json())
                                    .catch((error)=> ["erro", "erro ao buscar dados"])
            return resposta

        }

        const botaoAtualizarDadosDoUserModal = document.querySelector(".botaoAtualizarDadosDoUsuario")
        botaoAtualizarDadosDoUserModal.addEventListener("click", async ()=>{

            const nome = document.querySelector(".nomeModalUser").value
            const sobrenome = document.querySelector(".sobrenomeModalUser").value
            const email = document.querySelector(".emailModalUser").value
            const telefone = document.querySelector(".telefoneModalUser").value

            const dados = {nome, sobrenome, email, telefone }
            const resposta = await  atualizarDados("/user/atualizar", dados)
            const alerta = document.querySelector(".alertaModalUser")
            alerta.style.display = "block"

            if(resposta[0] == "erro"){

                alerta.className = "alert alert-danger alerta"
                alerta.innerText = resposta[1]

            }else{

                alerta.innerText = "Dados atualizados com sucesso"
                alerta.className = "alert alert-success alerta"
                setTimeout(()=>{
                    location.reload()
                }, 2000)
            }

        })
    

        const botaoAtualizarSenhaDoUserModal = document.querySelector(".botaoAtualizarSenhaDoUsuario")
        botaoAtualizarSenhaDoUserModal.addEventListener("click", async ()=>{

            const senhaAtual = document.querySelector(".senhaAtualUser").value
            const novaSenha = document.querySelector(".novaSenhaUser").value


            const dados = {senhaAtual, novaSenha }
            const resposta = await  atualizarDados("/user/atualizarSenha", dados)
            const alerta = document.querySelector(".alertaModalSenha")
            alerta.style.display = "block"

            if(resposta[0] == "erro"){

                alerta.className = "alert alert-danger alerta"
                alerta.innerText = resposta[1]

            }else{

                alerta.innerText = "Dados atualizados com sucesso"
                alerta.className = "alert alert-success alerta"
                setTimeout(()=>{
                    location.reload()
                }, 2000)
            }

        })
    
    
    }

    async function buscarDadosDoUsuario(){

        const resposta = await fetch("/user/lerUser" )
            .then((res )=> res.json())
            .catch((erro)=> ["erro", "erro ao buscar dados"])

        return resposta
    }

    function escreverDadosDoUser(user){



        username.innerText = user.nome  + " " + user.sobrenome


        nome.innerText = user.nome + " " + user.sobrenome

        email.innerText = user.email 
        telefone.innerText = user.telefone 
      
        }
    }

inicializadorDadosDoUser()


