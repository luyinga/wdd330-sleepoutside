// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback();
  }
}

async function loadTemplate (path) {
  const response = await fetch(path);
  const text = await response.text();
  return text;
}

export async function loadHeaderFooter () {
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");
  qs("#main-header").innerHTML = header;
  qs("#main-footer").innerHTML = footer;
  renderWithTemplate(header, qs("#main-header"), {});
  renderWithTemplate(footer, qs("#main-footer"), {});
  itemsInCart()
}

export function itemsInCart() {
  const cartNumber = document.querySelector(".cart_Number")
  const box = document.querySelector(".cart_Number_Box")
  const cartItems = (getLocalStorage("so-cart") || []);
  const amount = cartItems.reduce((total, item) => total + item.Quantity, 0);
  cartNumber.textContent = amount
  if (amount < 1) {
    box.classList.add("cart_Number_box_hide")
  } else {
    box.classList.remove("cart_Number_box_hide")
  }
}

export function showCategory(category) {
  qs("#category").textContent = category[0].toUpperCase() + category.slice(1);
}

export function alertMessage(message, scroll = true) {
  const alertElement = document.createElement("div");
  alertElement.innerHTML = `<p>${message}</p><span>X</span>`;
  alertElement.classList.add("alert");
  const main = document.querySelector("main");
  main.prepend(alertElement);
  alertElement.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  if (scroll) {
    window.scrollTo(0, 0);
  }
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}