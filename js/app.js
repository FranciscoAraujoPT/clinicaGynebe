const navButton = document.querySelector(".navButton");
const navLinks = document.querySelector(".sf-menu");
const links = document.querySelectorAll(".sf-menu li");

navButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });
});

//-------------------------------------------------------------\\

const header = document.querySelector("#header");
const section = document.querySelector("#content");

const options = {
    root: null,
    rootMargin: `0px 0px ${-window.innerHeight+header.offsetHeight}px 0px`,
    threshold: 0
};

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            header.classList.add("scroll");
        } else {
            header.classList.remove("scroll");
        }
    });

}, options);

observer.observe(section);