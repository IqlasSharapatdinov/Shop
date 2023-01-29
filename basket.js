function getData() {
  let json = localStorage.getItem("basket");
  if (json === null) {
    return [];
  }
  return JSON.parse(json);
}

function render() {
  let body = document.querySelector(".main");

  let baskets = document.createElement("div");
  let data = getData();

  baskets.classList.add("baskets");
  let cardHTML = data
    .map((obj) => {
      return generateCardHTML(obj);
    })
    .join("");

  body.appendChild(baskets);

  baskets.innerHTML = cardHTML;

  let deleteButtons = document.querySelectorAll(".basket_btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", onDeleteCard);
  });
}

function onDeleteCard(e) {
  let current = e.currentTarget;
  let textId = current.previousSibling.previousSibling.innerHTML;
  console.log(textId);
  let id = Number(textId.split(":")[1]);

  let items = JSON.parse(localStorage.getItem("basket"));
  let data = items.filter((item) => item.id !== id);

  localStorage.setItem("basket", JSON.stringify(data));
  location.reload();
}

function generateCardHTML(data) {
  return `
       <div class = "item"> 
           <img src ="./img/${data.img}">
           <h2>${data.name}</h2>
           <p>${data.description}</p>    
           <p>${data.salary}</p>
           <p>Seriynniy nomer:${data.id} </p>
           <button class='basket_btn'>Korzinadan oshiriw</button>
       </div>
      `;
}

render();
