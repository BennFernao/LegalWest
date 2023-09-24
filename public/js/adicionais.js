
const container = document.getElementById("teste")

const card = document.createElement("div")
card.setAttribute("class", "card")


const imageCard = document.createElement("img")
imageCard.setAttribute("class", "card-img-top")
imageCard.setAttribute("src", "./img/about.jpg")
imageCard.setAttribute("alt", "Teste")


const bodyCard = document.createElement("div")
bodyCard.setAttribute("class", "card-body")


const titleCard = document.createElement("h5")
titleCard.setAttribute("class", "card-title")
titleCard.innerText = "Artigo de 45/85"

const textCard = document.createElement("p")
textCard.setAttribute("class", "card-text")
textCard.innerText = "Estamos no caminho certo bro"


const linkCard = document.createElement("a")
linkCard.setAttribute("class", "btn btn-primary")
linkCard.setAttribute("href", "#")
linkCard.innerText = "seguir"

// introducao 1
bodyCard.appendChild(titleCard)
bodyCard.appendChild(textCard)
bodyCard.appendChild(linkCard)

// introdução 2
card.appendChild(imageCard)
card.append(bodyCard)

// introducao 3

//container.appendChild(card)














