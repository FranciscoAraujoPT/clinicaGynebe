const navButton = document.querySelector(".navButton");
const navLinks = document.querySelector(".sf-menu");
const links = document.querySelectorAll(".sf-menu li");

navButton.addEventListener("click", () => {
    document.body.classList.toggle("open");
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });
});

//------------------------------------------------------\\

const header = document.querySelector("#header");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
}