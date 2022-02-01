//From localStorage take every choosen items and displaye it to the page
//Dynamically creating elements of the products
"use strict";
var panier = JSON.parse(localStorage.getItem("cart"));
console.log(panier);

for (let i = 0; i < panier.length; i++) {
  // Block description
  const description = document.createElement("div");
  description.className = "cart_description";
  description.textContent = panier[i].name;
  var cartItems = document.getElementById("cart__items");
  cartItems.appendChild(description);

  // Block image
  const image = document.createElement("img");
  image.className = "cart_image";
  image.setAttribute("src", panier[i].imageUrl);
  description.appendChild(image);

  // Block price
  const price = document.createElement("div");
  const priceHeader = document.createElement("p"); //creating header for color
  priceHeader.textContent = "Price:";
  description.appendChild(priceHeader);
  price.className = "cart_price";
  price.textContent = panier[i].price + "€";
  description.appendChild(price);

  //Block color
  const color = document.createElement("p");
  const colorHeader = document.createElement("p"); //creating header for color
  colorHeader.textContent = "Color:";
  description.appendChild(colorHeader);
  color.className = "color_name";
  color.textContent = panier[i].colorChoice;
  //Retrieving name of a color from to LS for the chosen product
  colorHeader.appendChild(color);

  // Block quantity
  const quantity = document.createElement("input");
  quantity.id = "qty";
  const quantityHeader = document.createElement("p"); //creating header for quantity
  quantityHeader.textContent = "Qty:";
  description.appendChild(quantityHeader);
  quantity.type = "number";
  quantity.value = panier[i].quantity;
  quantity.setAttribute("min", "1");
  quantity.setAttribute("max", "100");
  quantity.className = "product_quantity";
  quantity.onchange = function () {
    panier[i].quantity = quantity.value;
    localStorage.setItem("cart", JSON.stringify(panier)); //adding new quantity to localStorage
    calculateSum();
  };
  quantityHeader.appendChild(quantity);

  // Block "remove" button
  const removeButton = document.createElement("button");
  removeButton.className = "remove_button";
  removeButton.textContent = "Delete";
  description.appendChild(removeButton);
  removeButton.onclick = function () {
    removeItems(i);
  };

  // Block "commande" button
  const commandButton = document.getElementById("order");
  commandButton.onclick = function (event) {
    if (
      firstName.value != "" &&
      lastName.value != "" &&
      address.value != "" &&
      city.value != "" &&
      email.value != ""
    ) {
      event.preventDefault();
      createOrder(); // A function that sends users data to server with POST method
      window.location.href =
        "http://127.0.0.1:5500/front/html/confirmation.html";
    } else {
      alert("You have to fill the form!");
    }
  };

  // Adding total value
  function calculateSum() {
    let totalValue = document.getElementById("totalPrice");
    let sum = 0;
    for (let i = 0; i < panier.length; i++) {
      sum = sum + panier[i].quantity * panier[i].price;
      totalValue.textContent = sum;
    }
  }
  calculateSum();

  // Remove products from locaclStorage
  function removeItems(i) {
    panier.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(panier));
    window.location.reload();
  }

  //Adding data to server

  /* 
POST / api / products / order
Send a command to save it . Products being an array of product id.The command sent must be in the following JSON format:
{
    contact{
	    firstName: <string>,
	    lastName: <string>,
	    address: <string>,
	    city; <string>,
	    email: <string>
	},
	products: [<string>]
}
*/

  //Checking form validation
  let validNameInput = /[0-9]/;
  let mailValid = /[@]/;
  let mailbValid = /[.]/;
  let validAdressInput = /^[a-zA-Z][0-9]{5}(-[0-9]{4})?$/;

  // Function createOrder will send users data to the server with metod POST
  function createOrder(event) {
    let isFormInput = true;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    debugger;

    if (validNameInput.test(firstName)) {
      alert("Your first name is not correct");
      isFormInput = false;
      event.preventDefault();
    }
    if (validNameInput.test(lastName)) {
      alert("Your last name is not correct");
      isFormInput = false;
      event.preventDefault();
    }
    if (validNameInput.test(city)) {
      alert("Your city is not correct");
      isFormInput = false;
      event.preventDefault();
    }
    if (mailbValid.test(email) == false) {
      alert("Your e-mail is not correct");
      isFormInput = false;
      event.preventDefault();
    }
    if (mailValid.test(email) == false) {
      alert("Your e-mail is not correct");
      isFormInput = false;
      event.preventDefault();
    }
    if (validAdressInput.test(address)) {
      alert("Your adresse is not correct");
      isFormInput = false;
      event.preventDefault();
    }
    if (isFormInput) {
      // newCustomer is an object which will be changed into string with JSON.stringify
      // Data to be sent to the POST request
      const newCustomer = {
        contact: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          email: email,
        },
        products: panier,
      };

      const newCustomerData = JSON.stringify(newCustomer);

      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newCustomerData,
      }).then((response) => {
        return response.json();
      });
    }
  }
}
