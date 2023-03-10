// /* global Product, Cart */

// 'use strict';

// // Set up an empty cart for use on this page.
// state.cart = new Cart([]);

// // On screen load, we call this method to put all of the product options
// // (the things in the state.allProducts array) into the drop down list.
// function populateForm() {

//   //TODO: Add an <option> tag inside the form's select for each product
//   let selectElement = document.getElementById('items');
//   for (let i in state.allProducts) {
//     let productOption = document.createElement('option');
//     productOption.textContent = state.allProducts[i].name;
//     productOption.value = state.allProducts[i].name;
//     selectElement.appendChild(productOption);
//   }
// };

// // When someone submits the form, we need to add the selected item to the cart
// // object, save the whole thing back to local storage and update the screen
// // so that it shows the # of items in the cart and a quick preview of the cart itself.
// function handleSubmit(event) {

//   // TODO: Prevent the page from reloading
//   event.preventDefault();
//   // Do all the things ...
//   addSelectedItemToCart();
//   state.cart.saveToLocalStorage();
//   state.cart.updateCounter();
//   updateCartPreview();

// }

// // TODO: Add the selected item and quantity to the cart
// function addSelectedItemToCart() {
//   // TODO: suss out the item picked from the select list
//   let item = document.getElementById('items').value;
//   // TODO: get the quantity
//   let quantity = document.getElementById('quantity').value;
//   // TODO: using those, add one item to the Cart
//   state.cart.addItem(item, quantity);
// };

// // TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
// function updateCartPreview() {
//   // TODO: Get the item and quantity from the form
//   let item = document.getElementById('items').value;
//   // TODO: Add a new element to the cartContents div with that information
//   let quantity = document.getElementById('quantity').value;
//   let cartContents = document.getElementById('cartContents');
//   let newCartItem = document.createElement('div');
//   newCartItem.innerHTML = `${item} - ${quantity}`;
//   cartContents.appendChild(newCartItem);
// };

// // Set up the "submit" event listener on the form.
// // This is the trigger for the app. When a user "submits" the form, it will
// // Call that handleSubmit method above and kick off the whole process
// let catalogForm = document.getElementById('catalog');
// catalogForm.addEventListener('submit', handleSubmit);

// // Before anything else of value can happen, we need to fill in the select
// // drop down list in the form.
// state.cart = new Cart([]);
// populateForm();



/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
state.cart = new Cart([]);

// On screen load, we call this method to put all of the product options
// (the things in the state.allProducts array) into the drop down list.
function populateForm() {
  // Add an <option> tag inside the form's select for each product
  let selectElement = document.getElementById('items');
  for (let i in state.allProducts) {
    let productOption = document.createElement('option');
    productOption.textContent = state.allProducts[i].name;
    productOption.value = state.allProducts[i].name;
    selectElement.appendChild(productOption);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  // Prevent the page from reloading
  event.preventDefault();
  
  // Do all the things ...
  addSelectedItemToCart();
  state.cart.saveToLocalStorage();
  state.cart.updateCounter();
  updateCartPreview();
}

// Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // Suss out the item picked from the select list
  let selectedProductName = document.getElementById('items').value;

  // Find the Product object in state.allProducts with the same name as the selected product
  let selectedProduct = state.allProducts.find(product => product.name === selectedProductName);

  // Get the quantity
  let selectedQuantity = parseInt(document.getElementById('quantity').value);

  // Using those, add one item to the Cart
  state.cart.addItem(selectedProduct, selectedQuantity);
}


// As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // Get the item and quantity from the form
  let selectedProduct = document.getElementById('items').value;
  let selectedQuantity = parseInt(document.getElementById('quantity').value);

  // Add a new element to the cartContents div with that information
  let cartContents = document.getElementById('cartContents');
  let newCartItem = document.createElement('div');
  newCartItem.textContent = `${selectedProduct} x ${selectedQuantity}`;
  cartContents.appendChild(newCartItem);
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
let catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.

populateForm();
