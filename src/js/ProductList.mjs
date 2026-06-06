import { renderListWithTemplate } from "./utils.mjs";

export function discountBadgeTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  if (isDiscounted) {
    const savings = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(
      2,
    );
    return `<span class="discount-badge">Save $${savings}!!!</span>`;
  }
  return "";
}

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);

    this.originalList = list;

    this.renderList(list);

    const sortSelect = document.querySelector("#sort-products");
    if (!sortSelect) {
      return;
    }

    sortSelect.addEventListener("change", (e) => {
      const sortedList = [...this.originalList];

      switch (e.target.value) {
        case "name-asc":
          sortedList.sort((a, b) => a.Name.localeCompare(b.Name));
          break;
        case "name-desc":
          sortedList.sort((a, b) => b.Name.localeCompare(a.Name));
          break;
        case "price-asc":
          sortedList.sort((a, b) => a.FinalPrice - b.FinalPrice);
          break;
        case "price-desc":
          sortedList.sort((a, b) => b.FinalPrice - a.FinalPrice);
          break;
      }

      this.renderList(sortedList);
    });
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

