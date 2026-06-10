import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter, itemsInCart } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  cartTotal(cartItems)
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
   <div>
    <a href="#"><h2 class="card__name">${item.Name}</h2></a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  </div>
  <button data-index="${i}" class="remove-btn">X</button>
  <div class="cart-card__quantity"> 
    <span>Quantity:</span>
    <div class="quantity_box">
      <button class="decrease_cart" data-index="${i}">-</button>
      <span class="quantity_cart">${item.Quantity}</span>
      <button class="increase_cart" data-index="${i}">+</button>
    </div>
    <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(2) }</p>
  </div>
</li>`;

  return newItem;
}

function removeItemFromCart(index) {
  // receive the parameter 'index' from the data-index attribute of the button
  const cart = getLocalStorage("so-cart");
  const updatedCart = cart.filter((_, i) => i !== parseInt(index)); // It only keeps in the array the Index NOT clicked.
  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
  itemsInCart();
}

function decreaseQuantity(index) {
  const cart = getLocalStorage("so-cart")

  if (cart[index].Quantity > 1) {
    cart[index].Quantity--
    setLocalStorage("so-cart", cart)
    renderCartContents()
    itemsInCart()
  } else {
    removeItemFromCart(index)
  }
}

function increaseQuantity(index) {
  const cart = getLocalStorage("so-cart")

  cart[index].Quantity++

  setLocalStorage("so-cart", cart)
  renderCartContents()
  itemsInCart()
}

renderCartContents();

//this piece of code adds an event listener to the product list, and when a click event occurs, it checks if the clicked element
//  has the class 'remove-btn'. If it does, it calls the removeItemFromCart function with the index of the item to be removed, which is stored in the data-index attribute of the button.
document.querySelector(".product-list").addEventListener("click", (event) => {
  const index = event.target.dataset.index

  if (event.target.classList.contains("remove-btn")) {
    removeItemFromCart(event.target.dataset.index);
  }
  if (event.target.classList.contains("decrease_cart")) {
    decreaseQuantity(event.target.dataset.index);
  }
  if (event.target.classList.contains("increase_cart")) {
    increaseQuantity(event.target.dataset.index);
  }
});

function cartTotal(items) {
  let hideTotal = document.querySelector(".cart-footer")
  let totalAmount = document.querySelector(".total-Amount")
  if (items.length > 0) {

    hideTotal.classList.remove("cart-footer-hide")
    let total = 0
    items.forEach(item => {
      total += item.FinalPrice
      total += item.FinalPrice * item.Quantity
    });
    totalAmount.textContent = `$${total.toFixed(2)}` 
  } else {
    hideTotal.classList.add("cart-footer-hide")
  }
}

//Add a Call to action-register with site
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("register-modal");
  const closeBtn = document.getElementById("close-modal");

  const hasSeenModal = localStorage.getItem("registerModalShown");

  if (!hasSeenModal) {
    modal.classList.remove("hidden");
    localStorage.setItem("registerModalShown", "true");
  }

  closeBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});