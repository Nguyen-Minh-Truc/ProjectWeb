const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const itemManager = $$(".item__manager");

itemManager.forEach(item => {
    item.classList.contains("item__manager__active")
    item.addEventListener ("click", ()=>{
        itemManager.forEach(item => {
            item.classList.remove("item__manager__active")
        })
        item.classList.add("item__manager__active")
    })
});

const ListUsers = JSON.parse(localStorage.getItem("ListUsers")) || [];

console.log("ListUsers")