import { listProductData } from "../../data/listProduct.js";

const listProducts =
  JSON.parse(localStorage.getItem("listProducts")) || listProductData;

function createListProduct(listProducts) {
  const container = document.querySelector(".list__product__container");
  container.innerHTML = ""; // Clear container first
  const productItems = listProducts.map((product, index) => {
    return `<li key=${index} class="product__item" id=${product.id}>
              <div class="product__item__wrap">
                <img src="${product.url}" alt="" class="product__img">
                <h2 class="product__name">${product.name}</h2>
                <span class="product__price">${product.price}$</span>
              </div>
            </li>`;
  });
  container.innerHTML = productItems.join("");
}

// Function to handle product item click
function handleProductItemClick(productID) {
  const result = listProducts.filter((product) => product.id == productID);

  if (result.length > 0) {
    productInfo.classList.add("active");
    productInfo.classList.remove("unactive");
    document.getElementById("imgbig").src = result[0].url;
    document.getElementById("productname").innerHTML = result[0].name;
    document.getElementById("productprice").innerHTML =  `${result[0].price}$`;

    const closeBtn = document.querySelector(".close");

    closeBtn.addEventListener("click", () => {
      productInfo.classList.remove("active");
      productInfo.classList.add("unactive");
      document.querySelector(".quantity-input").value = 1;
      document.getElementById("size").value = document.getElementById("size").options[0].value;
    });
  }
}

// Event delegation for product item click
document.querySelector(".list__product__container").addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("product__item")) {
    const productID = clickedElement.id;
    handleProductItemClick(productID);
  }
});


createListProduct(listProducts);

const itemMenu = document.querySelectorAll(".item__menu");

itemMenu.forEach((item) => {
  item.addEventListener("click", () => {
    itemMenu.forEach((menuItem) => {
      menuItem.classList.remove("item__menu__active");
    });
    item.classList.add("item__menu__active");
  });
  
});

function chuyenChuoiInHoaKhongDau(chuoi) {
  return chuoi
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

itemMenu.forEach((item) => {
  item.addEventListener("click", () => {
    const keyWord = chuyenChuoiInHoaKhongDau(item.textContent);
    const listProductResult = [];

    if (keyWord === "all") {
      createListProduct(listProducts);
      return;
    }

    listProducts.forEach((product) => {
      const productType = chuyenChuoiInHoaKhongDau(product.name);
      if (productType.indexOf(keyWord) !== -1) {
        listProductResult.push(product);
      }
    });

    createListProduct(listProductResult);
    addClickEventToProducts()
  });
});

const searchInput = document.getElementById("search__product");

searchInput.addEventListener("input", function () {
  const searchTerm = chuyenChuoiInHoaKhongDau(searchInput.value);
  const listProductResult = [];

  if (!searchTerm) {
    createListProduct(listProducts);
    addClickEventToProducts()
  } else {
    listProducts.forEach((product) => {
      const productName = chuyenChuoiInHoaKhongDau(product.name);
      if (productName.indexOf(searchTerm) !== -1) {
        listProductResult.push(product);
      }
      createListProduct(listProductResult);
      addClickEventToProducts()
    });
  }
});

function searchProduct() {
  const keyWord = chuyenChuoiInHoaKhongDau(document.getElementById("search__product").value);
  const listProductResult = [];

  if (!keyWord) {
    createListProduct(listProducts);
    addClickEventToProducts(); 
    return;
  }

  listProducts.forEach((product) => {
    const productName = chuyenChuoiInHoaKhongDau(product.name);
    if (productName.indexOf(keyWord) !== -1) {
      listProductResult.push(product);
    }
  });

  if (listProductResult.length > 0) {
    createListProduct(listProductResult);
    document.getElementById("search__product").value = "";
    addClickEventToProducts();
  } else {
    alert("Không tìm thấy sản phẩm");
    document.getElementById("search__product").value = "";
  }
}

const searchResults = document.querySelector(".btn__search");

searchResults.addEventListener("click", () => {
  searchProduct();
});

const productInfo = document.querySelector("#productInfo");

function addClickEventToProducts() {
  const callBlocks = document.querySelectorAll(".product__item");
  callBlocks.forEach((item) => {
    item.addEventListener("click", () => {
      const productID = item.id;
      const result = listProducts.filter((product) => product.id == productID);

      if (result.length > 0) {
        productInfo.classList.add("active");
        productInfo.classList.remove("unactive");
        document.getElementById("imgbig").src = result[0].url;
        document.getElementById("productname").innerHTML = result[0].name;
        document.getElementById("productprice").innerHTML = `${result[0].price}$`;
        document.querySelector('button.addtocart').setAttribute('onclick', 'addToCart(' + result[0].id + ')');
        const closeBtn = document.querySelector(".close");

        closeBtn.addEventListener("click", () => {
          productInfo.classList.remove("active");
          productInfo.classList.add("unactive");
          document.querySelector(".quantity-input").value = 1;
          document.getElementById("size").value = document.getElementById("size").options[0].value;
        });
      }
      const closeBtn1 = document.querySelector(".addtocart");
      closeBtn1.addEventListener("click", () => {
      productInfo.classList.remove("active");
      productInfo.classList.add("unactive");
      document.querySelector('.quantity-input').value = 1;
      document.getElementById('size').value = document.getElementById('size').options[0].value;
    })
    });
  });
}
addClickEventToProducts();

const decreaseButton = document.querySelector(".decrease");
const increaseButton = document.querySelector(".increase");
const quantityInput = document.querySelector(".quantity-input");

decreaseButton.addEventListener("click", () => {
  let currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = (currentValue - 1).toString();
  }
});

increaseButton.addEventListener("click", () => {
  let currentValue = parseInt(quantityInput.value);
  quantityInput.value = (currentValue + 1).toString();
});




// ... (Code trước đó)

const itemsPerPage = 6; // Số sản phẩm trên mỗi trang
let currentPage = 1; 
// Hàm hiển thị sản phẩm theo trang
function displayProducts(currentPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = listProducts.slice(startIndex, endIndex);

  createListProduct(displayedProducts);
  addClickEventToProducts();
}
displayProducts(currentPage)


document.querySelector(".btn__page_2").addEventListener('click', ()=> {
  currentPage = 2
  displayProducts(currentPage)
  document.querySelector(".btn__page_1").classList.remove("btn__page__active")
  document.querySelector(".btn__page_2").classList.add("btn__page__active")
  
})

document.querySelector(".btn__page_1").addEventListener('click', ()=> {
  currentPage = 1
  displayProducts(currentPage)
  document.querySelector(".btn__page_2").classList.remove("btn__page__active")
  document.querySelector(".btn__page_1").classList.add("btn__page__active")
})

