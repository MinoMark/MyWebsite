// Product list
const products = [
  {robux:100,price:0.75},{robux:200,price:1.50},{robux:400,price:3},
  {robux:800,price:6},{robux:1000,price:7.5},{robux:1700,price:12.75},
  {robux:2000,price:15},{robux:4500,price:33.75},{robux:10000,price:75},
  {robux:22000,price:165},{robux:25000,price:190},{robux:30000,price:235}
];

const shop = document.getElementById("shop");
let currentProduct = null;
let buyerDisplay="", buyerUsername="", buyerEmail="";

// Create product cards
products.forEach(p=>{
  const card = document.createElement("div");
  card.className="card";
  card.innerHTML=`
    <img src="images/robux.png" class="product-image">
    <div class="product-title">R$ ${p.robux.toLocaleString()}</div>
    <div class="price">$${p.price}</div>
    <button class="buy">Buy</button>
  `;
  card.querySelector(".buy").onclick=()=>openPopup(p);
  shop.appendChild(card);
});

// Popup functions
function openPopup(product){
  currentProduct=product;
  document.getElementById("popup").style.display="flex";
  document.getElementById("popupTitle").innerText="Buy R$ "+product.robux.toLocaleString()+" for $"+product.price;
}
function closePopup(){document.getElementById("popup").style.display="none"; resetPopup();}

// Step navigation
function goEmailStep(){
  buyerDisplay=document.getElementById("display").value.trim();
  buyerUsername=document.getElementById("username").value.trim();
  if(!buyerDisplay||!buyerUsername){alert("Enter both Display Name & Username");return;}
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}
function goPaymentStep(){
  buyerEmail=document.getElementById("email").value.trim();
  if(!buyerEmail){alert("Enter your email");return;}
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");
}

// Back buttons
function backToStep1(){document.getElementById("step2").classList.add("hidden");document.getElementById("step1").classList.remove("hidden");}
function backToStep2(){document.getElementById("step3").classList.add("hidden");document.getElementById("step2").classList.remove("hidden");}
function backToStep3(){document.getElementById("step4").classList.add("hidden");document.getElementById("step3").classList.remove("hidden");}

// Payment type
document.getElementById("payment").addEventListener("change",function(){
  if(this.value==="group"){document.getElementById("groupInfo").classList.remove("hidden");} 
  else {document.getElementById("groupInfo").classList.add("hidden");}
});

// Check payment step
function checkPaymentStep(){
  const payment=document.getElementById("payment").value;
  if(!payment){alert("Please select a payment method");return;}
  if(payment==="gamepass"){document.getElementById("step3").classList.add("hidden");document.getElementById("step4").classList.remove("hidden");} 
  else {finishOrder();}
}

// Finish order
function finishOrder(){
  const payment=document.getElementById("payment").value;
  let gamepassInfo="";
  if(payment==="gamepass"){
    gamepassInfo=document.getElementById("gamepassLink").value.trim();
    if(!gamepassInfo){alert("Enter Gamepass ID or link");return;}
  }
  const templateParams={display:buyerDisplay,username:buyerUsername,email:buyerEmail,robux:currentProduct.robux,price:currentProduct.price,payment:payment,gamepass:gamepassInfo};
  emailjs.send("service_kcx3gp6","service_kcx3gp6",templateParams)
  .then(r=>{document.getElementById("step3").classList.add("hidden");document.getElementById("step4").classList.add("hidden");document.getElementById("success").classList.remove("hidden");})
  .catch(e=>{console.log(e);alert("Error sending order.");});
}

// Reset popup
function resetPopup(){
  ["step1","step2","step3","step4"].forEach(id=>document.getElementById(id).classList.add("hidden"));
  document.getElementById("step1").classList.remove("hidden");
  document.getElementById("success").classList.add("hidden");
  document.getElementById("groupInfo").classList.add("hidden");
  ["display","username","email","payment","gamepassLink"].forEach(id=>document.getElementById(id).value="");
}

// Scroll hero
function scrollToShop(){document.getElementById("shop-section").scrollIntoView({behavior:"smooth"});}
