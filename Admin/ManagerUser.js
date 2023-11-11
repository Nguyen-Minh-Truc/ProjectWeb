
// create td
function newTd(className, value) {
  var td = document.createElement("td");
  td.className = className;
  td.innerHTML = value;
  return td;
}
// newEditTd
function newEditTd() {
  const td = document.createElement("td");
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "../assets/img/img__delete.png";
  deleteIcon.alt = "Xoá";
  deleteIcon.classList.add("img__delete__user");
  td.appendChild(deleteIcon);
  return td;
}
// updateUser
function updateUser(listUsers) {
  const listUser = $(".listUsers");
  listUser.innerHTML = "";
  const userElements = listUsers.map((user) => {
    const trUser = document.createElement("tr");
    trUser.appendChild(newTd("nameUser", user.name));
    trUser.appendChild(newTd("PhoneUser", user.phone));
    trUser.appendChild(newTd("isAdmin", user.isAdmin ? "ADMIN" : "User"));
    trUser.appendChild(newEditTd());
    return trUser;
  });

  userElements.forEach((userElement) => {
    listUser.appendChild(userElement);
  });
}
updateUser(listUsers);


function refreshEdits() {
  const edits = document.querySelectorAll(".img__delete__user");
  edits.forEach((edit, i) => {
    edit.addEventListener("click", (e) => {
      deleteProduct(listUsers, i);
    });
  });
}
refreshEdits(); 
function deleteProduct(listUsers, i) {
  if (!listUsers[i].isAdmin) {
    listUsers.splice(i, 1);
    localStorage.setItem("listUsers", JSON.stringify(listUsers));
    updateUser(listUsers);
    refreshEdits(); 
  } else {
    alert("không thể xoá người là Admin");
  }
}

//showOrdersList
function showOrdersList() {
	const orderArray = JSON.parse(localStorage.getItem('bill'));
	let s = '';
  if (orderArray == null) {
    s += ''
  }
  else {
    for (let i = 0; i < orderArray.length; i++) {
		s += '<tr>' +
      '<td class = "nameUser">' + orderArray[i].id + '</td>' +
			'<td class = "nameUser">' + orderArray[i].customer + '</td>' +
			'<td class = "infoProduct">' + orderArray[i].info + '</td>' +
      '<td class = "price">' + orderArray[i].totalprice + '</td>' +
			'<td class = "date">' + orderArray[i].date + '</td>' +
			'<td class = "accept">' + orderArray[i].status + '</td>' +
			'<td class = "cancel"> <button class="" onclick="accept(' + orderArray[i].id + ')">Nhận</button>' +
			'<button class="" onclick="refuse(' + orderArray[i].id + ')">Từ chối</button> </td>' +
			'</tr>';
	}
  }
	document.querySelector('.listOrders').innerHTML = s;
}
showOrdersList();

function accept(id) {
	const orderArray = JSON.parse(localStorage.getItem('bill'));
	for (let i = 0; i < orderArray.length; i++) {
		if (orderArray[i].id == id) {
			if (orderArray[i].status == "Đang nhận đơn hàng") {
				orderArray[i].status = "Đã nhận đơn hàng";
				localStorage.setItem('bill', JSON.stringify(orderArray));
			}
		}
	}
	showOrdersList();
}

function refuse(id) {
	const orderArray = JSON.parse(localStorage.getItem('bill'));
	for (let i = 0; i < orderArray.length; i++) {
		if (orderArray[i].id == id && orderArray[i].status != "Đã hủy đơn hàng") {
			orderArray[i].status = "Đơn hàng bị từ chối";
			localStorage.setItem('bill', JSON.stringify(orderArray));
		}
	}
	showOrdersList();
}

function interupt() {
  localStorage.removeItem('bill');
  showOrdersList();
}
