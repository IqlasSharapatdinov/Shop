//data.json акпаратты шыгарып алады
async function fetchData(){
    try{
        let res = await fetch('data.json')
        let data = await res.json()
        render(data)
    }catch(e){
        console.log(e);
    }
}


///экран бетыне корсетеды
function render(data){

    let body = document.querySelector(".items")
    //create cards div for every element
    let cardsHTML = document.createElement("div")

    //add class cards to div
    cardsHTML.classList.add("cards")


    //added to body our cards div
    body.appendChild(cardsHTML)

    let cards = data.map(e=>{
        e.isLike = true
        return generateCardHTML(e)
    }).join("")


    cardsHTML.innerHTML = cards

    let titleCards = document.createElement('h3')
    
    titleCards.innerHTML = "Товары"
    cardsHTML.insertAdjacentElement("beforebegin",titleCards)


    addDeleteEvent()
    changePageEvent()
    addLikeEvent()
}

function addLikeEvent(){
    let likes = document.querySelectorAll(".btn-like")
    likes.forEach((like)=>{
        like.addEventListener('click',onLikeCard)
    })
}

async function onLikeCard(e){
    let currentBtn = e.currentTarget
    let id = currentBtn.nextSibling.nextSibling.innerHTML
    let parseId = Number(id.split(" : ")[1])
    let data = await getDataById(parseId)
    let likes = localStorage.getItem("likes")
    if(likes == null){
        let arr = [data]
        localStorage.setItem("likes",JSON.stringify(arr))
    }else{
        likes = JSON.parse(likes)
        likes.push(data)
        localStorage.setItem('likes', JSON.stringify(likes));
    }
}

async function getDataById(id){
    try {
        let res = await fetch("data.json")
        let data = await res.json()
        let currentData = data.find((item)=>item.id === id)
        return currentData
    } catch (error) {
        console.log(error);
    }
}

//addEventListener баска бетке ауысу
function changePageEvent(){
    let images = document.querySelectorAll(".img")
    images.forEach(img=>{
        img.addEventListener('click',onChangePage)
    })
}

function onChangePage(e){
    let image =  e.currentTarget
    //have to change
    let id = image.nextSibling.nextSibling.innerHTML
    let parseId = id.split(" : ")[1]

    location.href = `card.html?id=${parseId}`
}

//addEventListener удалить ету ушын
function addDeleteEvent(){
    let buttons = document.querySelectorAll(".btn")
    buttons.forEach(button=>{
        button.addEventListener("click",onDeleteCard)
    })
}



function changeIsLike(id){
    fetch('data.json')
    .then(response => response.json())
    .then(json => {
      return json.map(e=>{
        if (e.id == id) {
            e.isLike = true
        }

        return e
      })
    })
    .then(res=>{
        console.log(res);
    })
}


//удалить карту
function onDeleteCard(e){
    let currentButton = e.currentTarget
    currentButton.closest('.card').remove()
}


//html code жасап береды объетан
function generateCardHTML(data) {
    return `
        <div class='card' id=${data.id}>
            <img src="./img/${data.img}" class='img'>
            <h4>${data.name}</h4>
            <p>${data.description}</p>    
            <p>${data.salary} тг</p>
            <button class='btn'>Удалить</button>
            <button class='btn-like'>Like</button>
            <p>Сериный номер : ${data.id} </p>
        </div>
    `
}

//start app
fetchData()