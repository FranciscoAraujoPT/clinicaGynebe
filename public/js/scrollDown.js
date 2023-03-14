const arrowDown = document.querySelector(".scroll-down");

arrowDown.addEventListener("click", (event) => {
    window.scroll({
        top: window.innerHeight - 90,
        behavior: 'smooth'
    });
});