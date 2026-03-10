// PRODUCT LIST
const products = [
  {robux:100,price:0.75},{robux:200,price:1.50},{robux:400,price:3},
  {robux:800,price:6},{robux:1000,price:7.5},{robux:1700,price:12.75},
  {robux:2000,price:15},{robux:4500,price:33.75},{robux:10000,price:75},
  {robux:22000,price:165},{robux:25000,price:190},{robux:30000,price:125}
];

const shop = document.getElementById("shop");
let currentProduct = null;
let buyerDisplay = "";
let buyerUsername = "";
let buyerEmail = "";

// CREATE PRODUCT CARDS
products.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="images/robux.png" class="product-image">
    <div class="product-title">R$ ${p.robux.toLocaleString()}</div>
    <div class="price">$${p.price}</div>
    <button class="buy">Buy</button>
  `;
  card.querySelector(".buy").onclick = () => openPopup(p);
  shop.appendChild(card);
});

// OPEN POPUP
function openPopup(product){
  currentProduct = product;
  document.getElementById("popup").style.display="flex";
  document.getElementById("popupTitle").innerText =
    "Buy R$ "+product.robux.toLocaleString()+" for $"+product.price;
}

// CLOSE POPUP
function closePopup(){
  document.getElementById("popup").style.display="none";
  resetPopup();
}

// STEP NAVIGATION
function goEmailStep(){
  buyerDisplay = document.getElementById("display").value.trim();
  buyerUsername = document.getElementById("username").value.trim();
  if(!buyerDisplay || !buyerUsername){
    alert("Please enter both Display Name and Username");
    return;
  }
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}

function goPaymentStep(){
  buyerEmail = document.getElementById("email").value.trim();
  if(!buyerEmail){
    alert("Please enter your email");
    return;
  }
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");
}

// PAYMENT TYPE SHOW/HIDE GROUP
document.getElementById("payment").addEventListener("change", function(){
  if(this.value==="group"){
    document.getElementById("groupInfo").classList.remove("hidden");
  } else {
    document.getElementById("groupInfo").classList.add("hidden");
  }
});

// FINISH ORDER + SEND EMAIL
function finishOrder(){
  const paymentMethod = document.getElementById("payment").value;
  if(!paymentMethod){
    alert("Please select a payment method");
    return;
  }

  const templateParams = {
    display: buyerDisplay,
    username: buyerUsername,
    email: buyerEmail,
    robux: currentProduct.robux,
    price: currentProduct.price,
    payment: paymentMethod
  };

  emailjs.send("service_kcx3gp6", "service_kcx3gp6", templateParams)
  .then(function(response){
    console.log("SUCCESS", response);
    document.getElementById("step3").classList.add("hidden");
    document.getElementById("success").classList.remove("hidden");
  }, function(error){
    console.log("FAILED", error);
    alert("Error sending order. Try again later.");
  });
}

// RESET POPUP
function resetPopup(){
  document.getElementById("step1").classList.remove("hidden");
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("success").classList.add("hidden");
  document.getElementById("groupInfo").classList.add("hidden");

  document.getElementById("display").value = "";
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("payment").value = "";
}

