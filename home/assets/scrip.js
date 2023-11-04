import { listProductData } from "../../data/listProduct.js";

const listProducts =
  JSON.parse(localStorage.getItem("listProducts")) || listProductData;
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
        listProductResult = [];
      } else {
        createListProduct(listProductResult);
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

searchInput.addEventListener("input", function () {
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
      createListProduct(listProductResult);
    }
  }
});

// search Product
function searchProduct() {
  const keyWord = chuyenChuoiInHoaKhongDau(
    document.getElementById("search__product").value
  );
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
// showProduct

const productInfo = document.querySelector("#productInfo");
const callBlocks = document.querySelectorAll(".product__item");

callBlocks.forEach((callBlock, i) => {
  callBlock.addEventListener("click", () => {
    productInfo.classList.add("active");
    productInfo.classList.remove("unactive");
    document.getElementById("imgbig").src = document.querySelectorAll(".product__img")[i].src;
    document.getElementById("productname").innerHTML = document.querySelectorAll(".product__name")[i].textContent;
    document.getElementById("productprice").innerHTML = document.querySelectorAll(".product__price")[i].textContent;
    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => {
      productInfo.classList.remove("active");
      productInfo.classList.add("unactive");
      document.querySelector(".quantity-input").value = 1;
      document.getElementById("size").value = document.getElementById("size").options[0].value;
    });
  });
});
// Lấy các phần tử HTML cần thao tác
const decreaseButton = document.querySelector(".decrease");
const increaseButton = document.querySelector(".increase");
const quantityInput = document.querySelector(".quantity-input");

// Định nghĩa sự kiện khi nút "-" được nhấn
decreaseButton.addEventListener("click", () => {
  let currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = (currentValue - 1).toString();
  }
});

// Định nghĩa sự kiện khi nút "+" được nhấn
increaseButton.addEventListener("click", () => {
  let currentValue = parseInt(quantityInput.value);
  quantityInput.value = (currentValue + 1).toString();
});

