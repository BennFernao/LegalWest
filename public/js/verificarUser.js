const username = document.querySelector(".username")
const username1 = document.querySelector(".username1")


fetch("/api/user/verificarUser").then((res)=> res.json())
                            .then(res=>{
                                if(res[0] == "erro"){

                                    username.innerText = "Entrar"
                                    username1.innerText = "Entrar"
                                }else{
                                    username.innerText = res.nome
                                    username1.innerText = res.nome
                                }                   
                            }).catch((erro)=>{
                                username.innerText = "Entrar"
                                username1.innerText = "Entrar"
                            })