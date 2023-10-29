import { listProductData } from "../data/listProduct.js";

const Product = {
  addProduct: function () {},
};

const listProducts =JSON.parse(localStorage.getItem("listProducts")) || listProductData;
localStorage.setItem("listProducts", JSON.stringify(listProducts));
function upDateProduct() {
  const listProduct = $(".listProduct");
  listProduct.innerHTML = "";
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
upDateProduct();

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

const edits = document.querySelectorAll(".img__delete__product");

edits.forEach((edit, i) => {
  edit.setAttribute("data-index", i);
  edit.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index"); // Lấy chỉ số từ thuộc tính tùy chỉnh
    if (index !== null) {
      listProducts.splice(index, 1);
  
      localStorage.setItem("listProducts", JSON.stringify(listProducts));
  
      upDateProduct(listProducts);
    }
  });
});
