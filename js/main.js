const menuButton = document.getElementById("menu-button");
const menu = document.getElementById("menu");
menuButton.addEventListener('click', () => {
    if (menu.style.visibility === "visible")
        menu.style.visibility = "hidden";
    else
        menu.style.visibility = "visible";
})

const nav = document.getElementById("nav");

window.onscroll = () => {
    "use strict";
    if (window.scrollY >= 200) {
        nav.style.background = "black";
    } else {
        nav.style.background = "none";
    }

}