import { listProductData } from "../data/listProduct.js";
const Product = {
  addProduct: function () {},
};
const listProducts =JSON.parse(localStorage.getItem("listProducts")) || listProductData;
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

function refreshEdits() {
  const edits = document.querySelectorAll(".img__delete__product");
  edits.forEach((edit, i) => {
    edit.addEventListener("click", (e) => {
      deleteProduct(listProducts, i);
    });
  });
}
refreshEdits();

function deleteProduct(listProducts, i) {
  listProducts.splice(i, 1);
  localStorage.setItem("listProducts", JSON.stringify(listProducts));
  upDateProduct(listProducts);
  refreshEdits();
}
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

