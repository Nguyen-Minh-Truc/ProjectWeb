const header = document.querySelector(".header");
const main = document.querySelector(".main");
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
// toggle log in
const logIn = document.querySelector(".logIn");
const blockLogIn = document.querySelector(".block__login");
logIn.addEventListener("click", () => {
  toggleElenment(blockLogIn, "active");
});
// toggle sign up
const signUp = document.querySelector(".signUp__btn");
const blogSignUp = document.querySelector(".block__signUp");
signUp.addEventListener("click", () => {
  toggleElenment(blogSignUp, "active");
});
// toggle exit log in
header.addEventListener("click", (e) => {
  if (e.target !== blockLogIn && e.target !== logIn) {
    blockLogIn.classList.add("unactive");
    blockLogIn.classList.remove("active");
  }
});

main.addEventListener("click", (e) => {
  if (e.target !== blockLogIn && e.target !== logIn) {
    blockLogIn.classList.add("unactive");
    blockLogIn.classList.remove("active");
  }
});

// toggle exit sign up
header.addEventListener("click", (e) => {
  if (e.target !== blogSignUp && e.target !== signUp) {
    blogSignUp.classList.add("unactive");
    blogSignUp.classList.remove("active");
  }
});

main.addEventListener("click", (e) => {
  if (e.target !== blogSignUp && e.target !== signUp) {
    blogSignUp.classList.add("unactive");
    blogSignUp.classList.remove("active");
  }
});
//logic sign up
const formSignUp = document.querySelector(".form__signUp");
function testPhone(value) {
  const regex = /^(0|\+84)[1-9]\d{8}$/;
  return regex.test(value);
}

//  TestInputNull
function testInput(className, value) {
  if (value.trim() === "") {
    document.getElementById(className).style.borderColor = "red";
    return true;
  } else {
    document.getElementById(className).style.borderColor = "green";
    return false;
  }
}
const listAdmins = [
  {
    name: "ADMIN",
    phone: "0378308976",
    pass: "123",
    isAdmin: true,
  },
];
const listUsers = JSON.parse(localStorage.getItem("listUsers")) || listAdmins;
localStorage.setItem("listUsers", JSON.stringify(listUsers));
formSignUp.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name__signup").value;
  const phone = document.getElementById("phone__signup").value;
  const pass = document.getElementById("password__signup").value;
  const passConfirm = document.getElementById("password__confirm").value;
  if (
    testInput("name__signup", name) ||
    testInput("phone__signup", phone) ||
    testInput("password__signup", pass) ||
    testInput("password__confirm", passConfirm)
  ) {
    return;
  } else {
    if (true) {
      if (pass === passConfirm) {
        const userExists = listUsers.some((user) => user.phone === phone);
        if (userExists) {
          alert("Tài khoản đã tồn tại.");
          formSignUp.reset();
        } else {
          alert("Đăng ký thành công.");
          const user = {
            name,
            phone,
            pass,
            isAdmin: false,
          };
          listUsers.push(user);
          localStorage.setItem("listUsers", JSON.stringify(listUsers));
          toggleElenment(blogSignUp, "active");
        }
      } else {
        document.getElementById("password__signup").style.borderColor = "red";
        document.getElementById("password__confirm").style.borderColor = "red";
      }
    } else {
      document.getElementById("phone__signup").style.borderColor = "red";
    }
  }
});

// logic log in
const formLogIn = document.querySelector(".form__login");
formLogIn.addEventListener("submit", (e) => {
  e.preventDefault();
  const listUsers = JSON.parse(localStorage.getItem("listUsers"));
  const name = document.getElementById("name__login").value;
  const phone = document.getElementById("phone__login").value;
  const pass = document.getElementById("password__login").value;

  if (
    testInput("name__login", name) ||
    testInput("phone__login", phone) ||
    testInput("password__login", pass)
  ) {
    return;
  } else {
    let userFound = false;
    const user = [];
    for (let i = 0; i < listUsers.length; i++) {
      if (
        listUsers[i].name === name &&
        listUsers[i].phone === phone &&
        listUsers[i].pass === pass
      ) {
        userFound = true;
        user.push(listUsers[i]);
        break;
      }
    }
    if (userFound) {
      localStorage.setItem("name", JSON.stringify(user[0].name));
      localStorage.setItem("admin", JSON.stringify(user[0].isAdmin));
      formLogIn.reset();
      alert("Đăng nhập thành công");
      window.location.href = "../home/index.html";
      toggleElenment(blockLogIn, "active");
      testLogin();
    } else {
      alert("Tài khoản hoặc mật khẩu sai");
    }
  }
});
// test log in
const btnSignIn = document.querySelector(".signIn");
const user = document.querySelector(".user");
const userName = document.querySelector(".user__name");
function testLogin() {
  const name = JSON.parse(localStorage.getItem("name"));
  const testLogIn = name ? true : false;
  if (testLogIn) {
    btnSignIn.classList.remove("active");
    user.classList.remove("unactive");

    user.classList.add("active");
    btnSignIn.classList.add("unactive");

    userName.innerHTML = name;
  } else {
    user.classList.remove("active");
    btnSignIn.classList.remove("unactive");

    btnSignIn.classList.add("active");
    user.classList.add("unactive");
    userName.innerHTML = "";
  }
}
testLogin();
// admin
const linkAdmin = document.getElementById("admin");

linkAdmin.addEventListener("click", function (event) {
  const isAdmin = JSON.parse(localStorage.getItem("admin"));
  if (!isAdmin) {
    event.preventDefault();
    alert("Bạn không được vào trang này.");
  }
});
// Log Out
const btnSignout = document.querySelector(".sign__out");
const blockLogOut = document.querySelector(".block__logOut");
const btnLogOut = document.querySelector(".btn__logout");
const cancle = document.querySelector(".btn__cancle");
btnSignout.addEventListener("click", () => {
  toggleElenment(blockLogOut, "active");
});
cancle.addEventListener("click", () => toggleElenment(blockLogOut, "active"));

btnLogOut.addEventListener("click", () => {
  const name = JSON.parse(localStorage.getItem("name"));
  const testLogIn = name ? true : false;
  if (testLogIn) {
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
    toggleElenment(user, "active");
    toggleElenment(btnSignIn, "active");
    userName.innerHTML = "";
    toggleElenment(blockLogOut, "active");
    window.location.href = "../home/index.html";
  }
});
