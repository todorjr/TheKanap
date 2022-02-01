/* CONNECTING TO THE SERVER (API) 
 APPLYING ONE PRODUCT DESCRIPTIONS
 GETTING NEW PARAMETERS FROM SERVER */
"use strict";
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("id");

fetch(`http://127.0.0.1:3000/api/products/${myParam}`)
  .then((response) => response.json())
  .then((data) => {
    createOneProduct(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

/*Here we have to create dynamically page with choosen product!
image,name,price,description,colors*/

//function createOneProduct will get one of the product data and that data will be declared in 'product'//
function createOneProduct(product) {
  const image = document.getElementById("image"); //GETTING SOURCE FOR IMAGE
  image.src = product.imageUrl;

  const title = document.getElementById("title"); //GETTING TITLE NAME FOR HEADER
  title.textContent = product.name;
  title.classList.add("title");

  const price = document.getElementById("price"); //GETTING PRICE
  price.textContent = product.price;

  const description = document.getElementById("description"); //GETTING DESCRIPTION
  description.textContent = product.description;

  const colors = document.getElementById("colors"); //GETTING LIST OF COLORS FOR PRODUCT
  product.colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.innerText = color;
    colors.appendChild(option);
  });
  const button = document.getElementById("addToCart"); //CREATING BUTTON ELEMENT AND ADDING FUNCTION TO IT
  button.addEventListener("click", () => {
    const quantity = document.getElementById("quantity");
    product.quantity = quantity.value;
    const colorChoice = document.getElementById("colors");
    product.colorChoice = colorChoice.value;
    var selectProduct = [];

    if (localStorage.getItem("cart")) {
      selectProduct = JSON.parse(localStorage.getItem("cart"));
    }

    // Looping throw array to find the same id and color ,and if exist,update just a quantity

    let isProductFound = false;

    for (var i = 0; i < selectProduct.length; i++) {
      debugger;
      if (
        product._id == selectProduct[i]._id &&
        product.colorChoice == selectProduct[i].colorChoice
      ) {
        selectProduct[i].quantity++;
        isProductFound = true;
        break;
      }
    }

    if (!isProductFound) {
      selectProduct.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(selectProduct));
    console.log(selectProduct);
  });
}
