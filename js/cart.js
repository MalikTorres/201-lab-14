// /* global Cart */
// 'use strict';

// // Create an event listener so that when the delete button is clicked, the removeItemFromCart method is invoked.
// let table = document.getElementById('cart');
// table.addEventListener('click', removeItemFromCart);

// function loadCart() {
//   let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//   state.cart = new Cart(cartItems);
// }

// // Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
// function renderCart() {
//   loadCart();
//   clearCart();
//   showCart();
// }

// // Remove all of the rows (tr) in the cart table (tbody)
// function clearCart() {
//   let tableBody = document.querySelector('#cart tbody');
//   tableBody.innerHTML = '';
// }

// // Fill in the <tr>'s under the <tbody> for each item in the cart
// function showCart() {
//   let tableBody = document.querySelector('#cart tbody');

//   state.cart.items.forEach(item => {
//     // Create a TR
//     let row = document.createElement('tr');

//     // Create a TD for the delete button
//     let deleteButton = document.createElement('button');
//     deleteButton.textContent = 'X';
//     deleteButton.classList.add('delete-button');
//     let deleteCell = document.createElement('td');
//     deleteCell.appendChild(deleteButton);
//     row.appendChild(deleteCell);

//     // Create a TD for the quantity
//     let quantityCell = document.createElement('td');
//     quantityCell.textContent = item.quantity;
//     row.appendChild(quantityCell);

//     // Create a TD for the item name
//     let itemCell = document.createElement('td');
//     itemCell.textContent = item.product.name;
//     row.appendChild(itemCell);

//     // Add the TR to the TBODY and each of the TD's to the TR
//     tableBody.appendChild(row);
//   });
// }

// function removeItemFromCart(event) {
//   if (event.target.tagName === 'BUTTON') {
//     let row = event.target.parentNode.parentNode;
//     let itemName = row.querySelector('td:last-child').textContent;
//     const item = state.cart.items.find(item => item.product.name === itemName);

//     state.cart.removeItem(item);
//     state.cart.saveToLocalStorage();
//     renderCart();
//   }
// }

// // This will initialize the page and draw the cart on screen
// renderCart();


/* global Cart */
'use strict';

// Create an event listener so that when the delete button is clicked, the removeItemFromCart method is invoked.
let table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tableBody = document.querySelector('#cart tbody');
  tableBody.innerHTML = '';
}

// Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  let tableBody = document.querySelector('#cart tbody');

  state.cart.items.forEach(item => {
    // Create a TR
    let row = document.createElement('tr');

    // Create a TD for the delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    let deleteCell = document.createElement('td');
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    // Create a TD for the quantity
    let quantityCell = document.createElement('td');
    quantityCell.textContent = item.quantity;
    row.appendChild(quantityCell);

    // Create a TD for the item name
    let itemCell = document.createElement('td');
    itemCell.textContent = item.product.name;
    row.appendChild(itemCell);

    // Add the TR to the TBODY and each of the TD's to the TR
    tableBody.appendChild(row);

    // Add an event listener to the delete button
    deleteButton.addEventListener('click', () => {
      // Find the item in the cart
      const itemIndex = state.cart.items.findIndex(cartItem => cartItem.product.name === item.product.name);
      if (itemIndex !== -1) {
        // Remove the item from the cart
        state.cart.items.splice(itemIndex, 1);
        // Save the updated cart to local storage
        state.cart.saveToLocalStorage();
        // Update the cart count in the header
        state.cart.updateCounter();
        // Update the cart preview
        updateCartPreview();
        // Remove the row from the table
        row.remove();
      }
    });
  });
}

function removeItemFromCart(event) {
  if (event.target.tagName === 'BUTTON') {
    let row = event.target.parentNode.parentNode;
    let itemName = row.lastElementChild.textContent;
    const item = state.cart.items.find(item => item.product.name === itemName);

    if (item) {
      state.cart.removeItem(item);
      state.cart.saveToLocalStorage();
      renderCart();
    }
  }
}

// This will initialize the page and draw the cart on screen
renderCart();