const divDeNavegacao = document.querySelector(".divDeNavegacao")
let itensDeNavegacao = [{
    estado: 1,
    texto : "User",
    srcImagem : "/img/user.svg",
    classInicial : "userNav",
    imagemSecundaria : "/img/userSecundario.svg",
    conteudo : document.querySelector(".dadosDoUser"),
    inicializador : function (){ console.log("ben")}
},{
    estado: 0,
    texto : "Consultas",
    srcImagem : "/img/consulta.svg",
    imagemSecundaria : "/img/consultaSecundario.svg",
    classInicial : "consultaNav",
    conteudo : document.querySelector(".dadosDaConsulta"),
    inicializador: inicializadorConsultas

},{
    estado: 0,
    texto : "Histórico",
    srcImagem : "/img/historico.svg",
    imagemSecundaria : "/img/historicoSecundario.svg",
    classInicial : "historicoNav",
    conteudo : document.querySelector(".dadosDoHistorico"),
    inicializador : inicializadorHistorico
}]


function escreverItemsDeNavegacao(listaDeItens){
    
    listaDeItens.forEach((item, index)=>{

    let elemento = document.createElement("div")  

    elemento.style.cursor = "pointer"  
    elemento.style.borderRadius = "5px"

        
    if(item.estado){
        elemento.className = `${item.classInicial} text-black w-100 d-flex justify-content-start align-items-end p-3 bg-primary fw-bold `
    }else{
        elemento.className = `${item.classInicial} text-black w-100 d-flex justify-content-start align-items-end p-3 fw-semibold text-black-50` 
    }


    elemento.addEventListener("click", ()=>{
        
        item.inicializador()

        itensDeNavegacao = itensDeNavegacao.map((item, i)=>{
            if(i == index ){
                let {estado, texto, conteudo, srcImagem, imagemSecundaria, classInicial, inicializador} = item
                conteudo.style.display = "block"
                estado = 1

                return {estado, texto, conteudo, srcImagem, imagemSecundaria, classInicial, inicializador}
            }else{

            

            let {estado, texto, conteudo, srcImagem, imagemSecundaria, classInicial, inicializador} = item
                conteudo.style.display = "none"
                estado = 0
                
                return {estado, texto, conteudo, srcImagem, imagemSecundaria, classInicial, inicializador}
            }
        })



        divDeNavegacao.innerHTML = ""
        
        
        
        escreverItemsDeNavegacao(itensDeNavegacao)
        

    })

    const imagem = document.createElement("img")

    imagem.style.width = "25px"
    imagem.style.height = "25px"

    imagem.className = "mr-1"
    
    imagem.src = item.estado ?  item.srcImagem : item.imagemSecundaria

    const texto = document.createElement("span")
    texto.innerHTML = item.texto


    // Adicionando a imagem e o texto no elemento

    elemento.appendChild(imagem)
    elemento.appendChild(texto)

    //adicionando o elemento na div

    divDeNavegacao.appendChild(elemento)
    })


}

escreverItemsDeNavegacao(itensDeNavegacao)
