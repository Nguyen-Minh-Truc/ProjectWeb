import { listProductData } from "../data/listProduct.js";
const Product = {
  addProduct: function () {},
};
const listProducts =
  JSON.parse(localStorage.getItem("listProducts")) || listProductData;
localStorage.setItem("listProducts", JSON.stringify(listProducts));

function upDateProduct(listProducts) {
  const listProduct = $(".listProduct");
  listProduct.innerHTML = " ";
  const productElemnets = listProducts.map((product, i) => {
    const trProduct = document.createElement("tr");
    trProduct.appendChild(newTd("IDProduct", i + 1));
    trProduct.appendChild(newProduct(product.url));
    trProduct.appendChild(newTd("nameProduct", product.name));
    trProduct.appendChild(newTd("priceProduct", product.price));
    trProduct.appendChild(newEditTd());
    return trProduct;
  });
  productElemnets.forEach((productElemnet) => {
    listProduct.appendChild(productElemnet);
  });
}
upDateProduct(listProducts);

// create td
function newTd(className, value) {
  var td = document.createElement("td");
  td.className = className;
  td.innerHTML = value;
  return td;
}
//   newEditTd
function newEditTd() {
  const td = document.createElement("td");
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "../assets/img/img__delete.png";
  deleteIcon.alt = "Xoá";
  deleteIcon.classList.add("img__delete__product");

  const editIcon = document.createElement("img");
  editIcon.src = "../assets/img/edit__img.jpeg";
  editIcon.classList.add("img__edit");

  td.appendChild(deleteIcon);
  td.appendChild(editIcon);
  return td;
}
//   img product
function newProduct(linkimg) {
  const td = document.createElement("td");
  const imgProduct = document.createElement("img");
  imgProduct.src = linkimg;
  imgProduct.classList.add("img__product");

  td.appendChild(imgProduct);
  return td;
}

// toggle Element
function toggleElenment(element, className) {
  const testClass = element.classList.contains("unactive");
  if (testClass) {
    element.classList.remove("unactive");
    element.classList.add(className);
  } else {
    element.classList.add("unactive");
    element.classList.remove(className);
  }
}
// block delete
const blockDeleteProduct = $(".block__deletePoduct");

function refreshEdits() {
  const edits = $$(".img__delete__product");
  edits.forEach((edit, i) => {
    edit.addEventListener("click", (e) => {
      toggleElenment(blockDeleteProduct, "active");
      $(".btn__deletePoduct").addEventListener("click", () => {
        deleteProduct(listProducts, i);
      });
    });
  });
}
function deleteProduct(listProducts, i) {
  listProducts.splice(i, 1);
  localStorage.setItem("listProducts", JSON.stringify(listProducts));
  upDateProduct(listProducts);
  toggleElenment(blockDeleteProduct, "active");
  refreshEdits();
}
refreshEdits();
const btnCancleDelete = $(".btn__cancle__deletePoduct")
btnCancleDelete.addEventListener("click", () => {toggleElenment(blockDeleteProduct, "active")});

// out block delete

// add product
function addProduct() {
  const src = document.getElementById("src__product").value;
  const nameProduct = document.getElementById("name__product").value;
  const price = parseFloat(document.getElementById("price__product").value);

  if (!src || !nameProduct || !price) {
    alert("Vui lòng nhập đủ thông tin.");
  } else {
    const product = {
      id: listProducts.length,
      url: src,
      name: nameProduct,
      price,
    };
    listProducts.push(product);
    localStorage.setItem("listProducts", JSON.stringify(listProducts));
    upDateProduct(listProducts);
    refreshEdits();
  }
}

const btnAddProduct = $(".btn__add");
btnAddProduct.addEventListener("click", () => {
  addProduct();
});

// search Product
function searchProduct() {
  const keyWord = chuyenChuoiInHoaKhongDau(
    document.getElementById("search__product").value
  );
  const listProducts = JSON.parse(localStorage.getItem("listProducts"));
  const listProductResult = [];

  if (!keyWord) {
    upDateProduct(listProducts);
    return;
  } else {
    let result = false;

    for (let i = 0; i < listProducts.length; i++) {
      const product =
        chuyenChuoiInHoaKhongDau(listProducts[i].name) &&
        chuyenChuoiInHoaKhongDau(listProducts[i].price);

      if (product.indexOf(keyWord) !== -1) {
        listProductResult.push(listProducts[i]);
        result = true;
      }
    }

    if (result) {
      upDateProduct(listProductResult);
      document.getElementById("search__product").value = "";
    } else {
      alert("Không tìm thấy sản phẩm");
      document.getElementById("search__product").value = "";
    }
  }
}
$(".btn__search").addEventListener("click", () => {
  searchProduct();
  refreshEdits();
});

function chuyenChuoiInHoaKhongDau(chuoi) {
  // Loại bỏ dấu và chuyển thành chữ thường
  return chuoi
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}