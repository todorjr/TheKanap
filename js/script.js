/* CONNECTING TO THE SERVER (API) 
 INSERTING THE ITEMS 
 FOR PAGE "ACCUEIL" */
"use strict";
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    createAllProducts(data);
  })
  .catch((error) => {
    console.error(error);
  });

//HERE WE HAVE TO CREATE DYNAMICALLY CONTAINER WITH ALL PRODUCTS

//FUNCTION createAllProducts WILL GET ALL OF THE DATA AND THAT DATA WILL BE DECLARED IN 'products'//
function createAllProducts(products) {
  const productContainer = document.getElementById("items");
  products.forEach((product) => {
    const link = document.createElement("a");
    link.href = `./product.html?id=${product._id}`;

    const article = document.createElement("article"); //CREATING ELEMENT 'ARTICLE' AND WITH APPEND METHOD PUTTING ON THE SITE
    link.appendChild(article);

    const image = document.createElement("img"); //CREATING ELEMENT 'IMAGE' AND WITH APPEND METHOD PUTTING ON THE SITE
    image.src = product.imageUrl; //ADDING SOURCE,ALT,HEIGHT AND WIDTH ATTRIBUTES
    image.alt = product.altTxt;
    image.heigth = 120;
    image.width = 120;

    article.appendChild(image);

    const header = document.createElement("h3"); //CREATING ELEMENT 'HEADER' AND WITH APPEND METHOD PUTTING ON THE SITE
    header.textContent = product.name;
    article.appendChild(header);
    header.classList.add("productName");

    const paragraph = document.createElement("p"); //CREATING ELEMENT 'PARAGRAPH' AND WITH APPEND METHOD PUTTING ON THE SITE
    paragraph.textContent = product.description;
    paragraph.classList.add("productDescription");

    article.appendChild(paragraph); //APPENDING 'PARAGRAPH' AND 'LINK' ELEMENTS
    productContainer.appendChild(link);
  });
}
