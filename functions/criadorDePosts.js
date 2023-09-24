
function criadorDePosts (titulo, data, urlImagem, conteudo){

    const htmlCompleto = `

    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{titulo}</title>
        </head>
        <body>

            <h1>${titulo}</h1>
            <p>Aos ${data}</p>
            <img src="urlImagem"  alt="Imagem descritiva"/>
            ${conteudo}      
        </body>
        </html>
        `
}