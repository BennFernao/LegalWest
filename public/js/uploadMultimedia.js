

function adicionarMultimedia(file){

    const form = new FormData()
    form.append("imagem", file)

    const resposta = fetch("/upload", {
        method:"POST",
        body: form
    }).then((res)=> res.json())
    .catch((erro)=> ["erro", "erro ao buscar dados"])

    return  resposta
}