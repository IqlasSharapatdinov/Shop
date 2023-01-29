function parseId() {
  let url_str = location.href;
  let url = new URL(url_str);
  let id = url.searchParams.get("id");
  return Number(id);
}

async function fetchData() {
  // url dan id ni shigarip alamiz
  let id = parseId();
  try {
    let response = await fetch("data.json");
    let data = await response.json();

    //id boyinsha tasip beredi
    let current = data.find((obj) => obj.id === id);
    return current;
  } catch (e) {
    console.log(e);
  }
}

async function render() {
  let data = await fetchData();
  let body = document.querySelector(".main");

  let cardHTML = generateCardHTML(data);

  body.innerHTML = cardHTML;

  let basket_btn = document.querySelector(".basket_btn");
  basket_btn.addEventListener("click", addToBasket);
}

async function addToBasket() {
  let data = await fetchData();
  let basket = localStorage.getItem("basket");
  if (basket === null) {
    let arr = [data];
    localStorage.setItem("basket", JSON.stringify(arr));
  } else {
    basket = JSON.parse(basket);
    basket.push(data);
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

function generateCardHTML(data) {
  return `
     <div class = "item"> 
         <img src ="./img/${data.img}">
         <h2>${data.name}</h2>
         <p>Seriynniy nomer : ${data.id} </p>
         <p>${data.description}</p>    
         <p>${data.salary} ₸</p>
         <button class='basket_btn'>Korzinaga saliw</button>
     </div>
    `;
}

render();
