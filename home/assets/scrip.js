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
  phanTrang();
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
      phanTrang();
      displayProducts(1);
      document.querySelector('.suggest-product-list').innerHTML = "";
      listSuggest.style.border = 'none';
      return;
    }

    listProducts.forEach((product) => {
      const productType = chuyenChuoiInHoaKhongDau(product.name);
      if (productType.indexOf(keyWord) !== -1) {
        listProductResult.push(product);
      }
    });
    createListProduct(listProductResult);
    displayProducts1(1, listProductResult);
    phanTrang1(listProductResult);
    addClickEventToProducts();
    document.querySelector('.suggest-product-list').innerHTML = "";
    listSuggest.style.border = 'none';
  });
});
// search input
const searchInput = document.getElementById("search__product");
const listSuggest = document.querySelector('.suggest-product-list');
function suggest(listProduct) {
  let s = '';
  for (let i = 0; i < listProduct.length; i++) {
    s += '<li class="suggest-product" id="' + listProduct[i].id +'">' +
            '<img src="'+ listProduct[i].url + '" alt=""class="suggest-product-img">' +
            '<h3 class="suggest-product-name">'+ listProduct[i].name +'</h3>' +
            '<h4 class="suggest-product-price">'+listProduct[i].price+'$</h4>' +
          '</li>'
  }
  listSuggest.innerHTML = s;  
  addClickEventToProducts1();
  if (listSuggest.getElementsByTagName("li").length == 0) {
    listSuggest.style.border = 'none';
  } else {
    listSuggest.style.border = '0.2px solid grey';  
  }
 }

searchInput.addEventListener("input", function () {
  const searchTerm = chuyenChuoiInHoaKhongDau(searchInput.value);
  const listProductResult = [];

  if (!searchTerm) {
    createListProduct(listProducts);
    addClickEventToProducts();
    displayProducts(1);
    phanTrang();
    document.querySelector('.suggest-product-list').innerHTML = '';
    listSuggest.style.border = 'none';
  } else {
    listProducts.forEach((product) => {
      const productName = chuyenChuoiInHoaKhongDau(product.name);
      if (productName.indexOf(searchTerm) !== -1) {
        listProductResult.push(product);
      }
      createListProduct(listProductResult);
      displayProducts1(1, listProductResult);
      phanTrang1(listProductResult);
      addClickEventToProducts();
      suggest(listProductResult);
      console.log(listProductResult);
    });
  }
});

function searchProduct() {
  const keyWord = chuyenChuoiInHoaKhongDau(document.getElementById("search__product").value);
  const listProductResult = [];
  document.querySelector('.suggest-product-list').innerHTML = '';

  if (!keyWord) {
    createListProduct(listProducts);
    addClickEventToProducts(); 
    displayProducts(currentPage);
    phanTrang();
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
  displayProducts1(1, listProductResult);
  phanTrang1(listProductResult);
  listSuggest.style.border = 'none';
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
          document.querySelector('.suggest-product-list').innerHTML = "";
          listSuggest.style.border = 'none';
        });
      }
      const closeBtn1 = document.querySelector(".addtocart");
      closeBtn1.addEventListener("click", () => {
      productInfo.classList.remove("active");
      productInfo.classList.add("unactive");
      document.querySelector('.quantity-input').value = 1;
      document.getElementById('size').value = document.getElementById('size').options[0].value;
      document.querySelector('.suggest-product-list').innerHTML = "";
      listSuggest.style.border = 'none';
    })
    });
  });
}
addClickEventToProducts();
function addClickEventToProducts1() {
  const callBlocks = document.querySelectorAll(".suggest-product");

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
          document.querySelector('.suggest-product-list').innerHTML = "";
          listSuggest.style.border = 'none';
        });
      }
      const closeBtn1 = document.querySelector(".addtocart");
      closeBtn1.addEventListener("click", () => {
      productInfo.classList.remove("active");
      productInfo.classList.add("unactive");
      document.querySelector('.quantity-input').value = 1;
      document.getElementById('size').value = document.getElementById('size').options[0].value;
      document.querySelector('.suggest-product-list').innerHTML = "";
      listSuggest.style.border = 'none';
    })
    });
  });
}

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


// phan trang
let currentPage = 1; 
function phanTrang() {
const itemsPerPage = 9; 
  let totalPages = Math.ceil(listProducts.length / itemsPerPage);
  const pages = document.querySelector('.page')
  pages.innerHTML = '';

  for (var i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button'); 
    btn.classList.add('btn__page');
    btn.classList.add('btn');
    btn.innerHTML = i;
    pages.appendChild(btn)
  }

  const btns = document.querySelectorAll('.btn__page');

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      const currentPage = btn.innerHTML;
      displayProducts(currentPage);
    })
  })
}


// console.log(totalPages)

function displayProducts(currentPage) {
  const itemsPerPage = 9; 
  const listProduct = document.querySelectorAll(".product__item")
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedProducts =  listProducts.slice(startIndex, endIndex);

  createListProduct(displayedProducts);
  addClickEventToProducts();
}
displayProducts(currentPage)


// document.querySelector(".btn__page_2").addEventListener('click', ()=> {
//   currentPage = 2
//   displayProducts(currentPage)
//   document.querySelector(".btn__page_1").classList.remove("btn__page__active")
//   document.querySelector(".btn__page_2").classList.add("btn__page__active")
  
// })

// document.querySelector(".btn__page_1").addEventListener('click', ()=> {
//   currentPage = 1
//   displayProducts(currentPage)
//   document.querySelector(".btn__page_2").classList.remove("btn__page__active")
//   document.querySelector(".btn__page_1").classList.add("btn__page__active")
// })

function phanTrang1(listProduct) {
  const itemsPerPage = 9; 
    let totalPages = Math.ceil(listProduct.length / itemsPerPage);
    const pages = document.querySelector('.page');
    pages.innerHTML = '';
    console.log(totalPages);
  
    for (var i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button'); 
      btn.classList.add('btn__page');
      btn.classList.add('btn');
      btn.innerHTML = i;
      pages.appendChild(btn);
    }
  
    const btns = document.querySelectorAll('.btn__page');
  
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const currentPage = btn.innerHTML;
        displayProducts1(currentPage, listProduct);
      })
    })
  }
  
  function displayProducts1(currentPage, listProduct) {
    const itemsPerPage = 9;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const displayedProducts =  listProduct.slice(startIndex, endIndex);
  
    createListProduct(displayedProducts);
    phanTrang1(listProduct);
    addClickEventToProducts();
  }

const logo = document.querySelector(".logo")
logo.addEventListener("click", ()=>{
  window.scrollTo(0,0)
})