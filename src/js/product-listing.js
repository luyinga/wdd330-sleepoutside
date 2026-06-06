import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, showCategory, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter()

const category = getParam("category");
showCategory(category); 
const dataSource = new ProductData(category);

const element = document.querySelector(".product-list");

const list = new ProductList(category, dataSource, element);

list.init();