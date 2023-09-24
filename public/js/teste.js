

const participacao = [1,0,1,0,1,1,1,0]
const participacaoAtual = [1,1,0,0,1,1,1,1]


function diferencialDeEstado(arrayA, arraB){

    const  itensAdicionais = []
    const itensEliminatorios = []

     arrayA.forEach((element, i) => {

        if(element != arraB[i]){
            if(arraB[i]){

                itensAdicionais.push(i)

            }else{
                itensEliminatorios.push(i)
            }
        }
    });

    return {itensAdicionais, itensEliminatorios}


}




