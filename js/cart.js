/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tableBody = document.querySelector('#cart tbody');
  tableBody.innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  let tableBody = document.querySelector('#cart tbody');
  // TODO: Iterate over the items in the cart
  state.cart.items.forEach(item => {
     // TODO: Create a TR
    let row = document.createElement('tr');
    // TODO: Create a TD for the delete link,quantity,  and the item
    // Create a TD for the delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    let deleteCell = document.createElement('td');
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);
    
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    let quantityCell = document.createElement('td');
    quantityCell.textContent = item.quantity;
    row.appendChild(quantityCell);

    let itemCell = document.createElement('td');
    itemCell.textContent = item.product.name;
    row.appendChild(itemCell);
    
    tableBody.appendChild(row);
  });
}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  if (event.target.tagName === 'A') {
    let row = event.target.parentNode.parentNode;
    let itemName = row.lastElementChild.textContent;
    const item = state.cart.items.find(item => item.product.name === itemName);

    state.cart.removeItem(item);
    state.cart.saveToLocalStorage();
    renderCart();
  }
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();
