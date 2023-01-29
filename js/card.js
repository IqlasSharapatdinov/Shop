function parseId(){
    let url_str = location.href
    let url = new URL(url_str)
    let id = url.searchParams.get("id")
    return Number(id)
}


async function fetchData(){
    try{
        let response = await fetch("data.json")
        let data = await response.json()

        let id = parseId()
        
        let current = data.find((obj)=>obj.id === id)
        return current
    }catch(e){
        console.log(e);
    }
}

async function render(){
    let data = await fetchData()
    let body = document.querySelector(".content")

    let cardHTML = generateCardHTML(data)

    body.innerHTML = cardHTML

    let basket_btn = document.querySelector(".basket_btn")
    basket_btn.addEventListener("click",addToBasket)
}

async function addToBasket(){
    let data = await fetchData()
    let basket = localStorage.getItem("basket")
    if(basket === null){
        let arr = [data]
        localStorage.setItem('basket', JSON.stringify(arr));
    }else{
        basket = JSON.parse(basket)
        basket.push(data)
        localStorage.setItem('basket', JSON.stringify(basket));
    }
}

function generateCardHTML(data){
    return `
        <div class="item">
            <img src="./img/${data.img}">
            <h2>${data.name}</h2>
            <p>${data.description}</p>
            <p>${data.price}</p>
            <button class='basket_btn'>Добавить в корзину</button>
        </div>
    `
}

render()