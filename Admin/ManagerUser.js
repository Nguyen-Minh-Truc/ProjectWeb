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
    deleteIcon.classList.add("img__delete");
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
  
  function deleteUser(listUsers) {
    const edits = document.querySelectorAll(".img__delete");
    edits.forEach((edit, i) => {
      edit.addEventListener("click", () => {
        if (!listUsers[i].isAdmin) {
            listUsers.splice(i, 1);
            localStorage.setItem("listUsers", JSON.stringify(listUsers));
            updateUser(listUsers);
        }else {
            alert("không thể xoá người là Admin")
        }
      });
    });
  }
  deleteUser(listUsers);