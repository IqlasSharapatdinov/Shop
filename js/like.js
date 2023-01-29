function getData(){
    let data = localStorage.getItem("likes")
    if(data == null){
        return []
    }
    return JSON.parse(data)
}

function render(){
    let content = document.querySelector(".main")

    let likes =  document.createElement("div")
    likes.classList.add("likes_items")
    content.appendChild(likes)

    let data = getData()
    let cardsHTML = data.map((item)=>generateCardHTML(item)).join("")

    likes.innerHTML = cardsHTML

    let likes_btn = document.querySelectorAll(".like-btn")
    likes_btn.forEach((like)=>{
        like.addEventListener("click",onDeleteCard)
    })
}

function onDeleteCard(e){
    let current = e.currentTarget
    let textId = current.previousSibling.previousSibling.innerHTML
    let id = Number(textId.split(" : ")[1])

    let items = JSON.parse(localStorage.getItem("likes"))
    let data = items.filter((item)=>item.id !== id)
    
    localStorage.setItem("likes",JSON.stringify(data))
    location.reload()
}


function generateCardHTML(data){
    return `
        <div class="item">
            <img src="./img/${data.img}">
            <h2>${data.name}</h2>
            <p>${data.description}</p>
            <p>${data.price}</p>
            <p>Сериный номер : ${data.id}</p>
            <button class='like-btn'>Удалить</button>
        </div>
    `
}

render()