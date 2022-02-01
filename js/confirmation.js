// PayPal div / NOT IN USE !
"use strict";
var div = document.getElementById("limitedWidthBlock");

//'Thank you for your order" message
var messageDiv = document.createElement("div");
messageDiv.id = "message_div";
var message = document.createElement("p");
message.textContent = 'Merci pour votre confiance ! Votre "KANAP" !';
message.id = "message";

//Continuer achat
var newDiv = document.createElement("div");
newDiv.id = "new_div";
var p = document.createElement("p");
var p1 = document.createElement("p");
p1.textContent = "Continuer achat?";
p1.onclick = function () {
  localStorage.removeItem("cart");
  window.location.href = "http://127.0.0.1:5500/front/html/index.html";
};
p1.style.cursor = "pointer";
newDiv.appendChild(p1);

//Proceder au paiment
p.textContent = "Proceder au paiement?";
newDiv.appendChild(p);
var img = document.createElement("img");
img.src =
  "https://i0.wp.com/bamboocycles.com/wp-content/uploads/2020/05/paypal-logo.png?ssl=1";
img.style.width = "170px";
img.style.height = "90px";
img.style.cursor = "pointer";

//Appending new elements
newDiv.appendChild(img);
div.appendChild(newDiv);
div.appendChild(messageDiv);
messageDiv.appendChild(message);

//Order number
var panier = JSON.parse(localStorage.getItem("cart"));
console.log(panier);
for (let i = 0; i < panier.length; i++) {
  const orderNumber = document.getElementById("orderId");
  orderNumber.textContent = panier[i]._id;
}
