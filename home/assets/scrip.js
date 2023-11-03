import { listProductData } from "../../data/listProduct.js";

const listProducts =JSON.parse(localStorage.getItem("listProducts")) || listProductData;
function createListProduct(listProducts) {
  const container = document.querySelector(".list__product__container");
  const product = listProducts.map((product) => {
    return ` <li class="product__item">
                <div class="product__item__wrap">
                    <img src="${product.url}" alt="" class="product__img">
                    <h2 class="product__name">${product.name}</h2>
                    <span class="product__price">${product.price}$</span>
                </div>
            </li>`;
  });
  container.innerHTML = product.join("");
}
createListProduct(listProducts);

const itemMenu = document.querySelectorAll(".item__menu");
itemMenu.forEach((item) => {
  item.addEventListener("click", () => {
    itemMenu.forEach((item) => {
      item.classList.remove("item__menu__active");
    });
    item.classList.add("item__menu__active");
  });
});
// search top menu
itemMenu.forEach((item) => {
  const listProducts = JSON.parse(localStorage.getItem("listProducts"));
  var listProductResult = [];
  item.addEventListener("click", () => {
    const keyWord = chuyenChuoiInHoaKhongDau(item.textContent);
    if (keyWord == "all") {
      createListProduct(listProducts);
      return;
    } else {
      let result = false;

      for (let i = 0; i < listProducts.length; i++) {
        const product = chuyenChuoiInHoaKhongDau(listProducts[i].name);
        if (product.indexOf(keyWord) !== -1) {
          listProductResult.push(listProducts[i]);
          result = true;
        }
      }
      if (result) {
        createListProduct(listProductResult);
        listProductResult = []
      } else {
        createListProduct(listProducts);
      }
    }
  });
});

function chuyenChuoiInHoaKhongDau(chuoi) {
  return chuoi
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// input tim kiem
const searchInput = document.getElementById("search__product");
const searchResults = document.querySelector(".btn__search");

searchInput.addEventListener("input", function() {
  const searchTerm = chuyenChuoiInHoaKhongDau(searchInput.value);

  const listProducts = JSON.parse(localStorage.getItem("listProducts"));
  const listProductResult = [];

  if (!searchTerm) {
    createListProduct(listProducts);
  } else {
    let result = false;

    for (let i = 0; i < listProducts.length; i++) {
      const product = chuyenChuoiInHoaKhongDau(listProducts[i].name);
      if (product.indexOf(searchTerm) !== -1) {
        listProductResult.push(listProducts[i]);
        result = true;
      }
    }
    if (result) {
      createListProduct(listProductResult);
    } else {
      createListProduct(listProducts); 
      
    }
  }
});

// search Product
function searchProduct() {
  const keyWord = chuyenChuoiInHoaKhongDau(document.getElementById("search__product").value);
  const listProducts = JSON.parse(localStorage.getItem("listProducts"));
  const listProductResult = [];

  if (!keyWord) {
    createListProduct(listProducts);
    return;
  } else {
    let result = false;

    for (let i = 0; i < listProducts.length; i++) {
      const product = chuyenChuoiInHoaKhongDau(listProducts[i].name);
      if (product.indexOf(keyWord) !== -1) {
        listProductResult.push(listProducts[i]);
        result = true;
      }
    }

    if (result) {
      createListProduct(listProductResult);
      document.getElementById("search__product").value = "";
    } else {
      alert("Không tìm thấy sản phẩm");
      document.getElementById("search__product").value = "";
    }
  }
}
searchResults.addEventListener("click", () => {
  searchProduct();
});
