const usernameIcon1 = document.querySelector(".usernameIcon1")
const usernameIcon = document.querySelector(".usernameIcon")

const divLogin1 = document.querySelector(".divLogin1")
const divLogin = document.querySelector(".divLogin")



divLogin1.addEventListener("mouseleave", ()=>{
  
    usernameIcon1.src = "/img/user.svg"
})

divLogin1.addEventListener("mouseenter", ()=>{

    usernameIcon1.src = "/img/person.svg"  
})



divLogin.addEventListener("mouseleave", ()=>{
   
    usernameIcon.src = "/img/user.svg"
})

divLogin.addEventListener("mouseenter", ()=>{

    usernameIcon.src = "/img/person.svg"
    
})
