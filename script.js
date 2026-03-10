const products=[

{robux:100,price:0.75},
{robux:200,price:1.50},
{robux:400,price:3},
{robux:800,price:6},
{robux:1000,price:7.5},
{robux:1700,price:12.75},
{robux:2000,price:15},
{robux:4500,price:33.75},
{robux:10000,price:75},
{robux:22000,price:165},
{robux:25000,price:190},
{robux:30000,price:125}

];


const shop=document.getElementById("shop");

let currentProduct=null;


/* CREATE PRODUCT CARDS */

products.forEach(p=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="images/robux.png" class="product-image">

<div class="product-title">

R$ ${p.robux.toLocaleString()}

</div>

<div class="price">

$${p.price}

</div>

<button class="buy">Buy</button>

`;

card.querySelector(".buy").onclick=()=>openPopup(p);

shop.appendChild(card);

});


/* POPUP */

function openPopup(product){

currentProduct=product;

document.getElementById("popup").style.display="flex";

document.getElementById("popupTitle").innerText=

"Buy R$ "+product.robux.toLocaleString()+" for $"+product.price;

}


function closePopup(){

document.getElementById("popup").style.display="none";

resetPopup();

}


function nextStep(){

document.getElementById("step1").classList.add("hidden");

document.getElementById("step2").classList.remove("hidden");

}


/* PAYMENT TYPE */

document.getElementById("payment").addEventListener("change",function(){

if(this.value==="group"){

document.getElementById("groupInfo").classList.remove("hidden");

}else{

document.getElementById("groupInfo").classList.add("hidden");

}

});


function finishOrder(){

document.getElementById("step2").classList.add("hidden");

document.getElementById("success").classList.remove("hidden");

}


/* RESET */

function resetPopup(){

document.getElementById("step1").classList.remove("hidden");

document.getElementById("step2").classList.add("hidden");

document.getElementById("success").classList.add("hidden");

document.getElementById("groupInfo").classList.add("hidden");

}