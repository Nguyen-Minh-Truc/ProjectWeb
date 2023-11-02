import { listProductData } from "../../data/listProduct.js";

function createListProduct() {
  const listProducts = JSON.parse(localStorage.getItem("listProducts")) || listProductData ;
  const container = document.querySelector(".list__product__container");
  const product =listProducts.map((product) => {
    return ` <li class="product__item">
                <div class="product__item__wrap">
                    <img src="${product.url}" alt="" class="product__img">
                    <h2 class="product__name">${product.name}</h2>
                    <span class="product__price">${product.price}$</span>
                </div>
            </li>`
  });

  container.innerHTML = product.join('');
}
createListProduct()