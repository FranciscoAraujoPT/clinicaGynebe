const containers = document.querySelectorAll("button");
const body = document.querySelector("body");
const overlay = body.querySelector(".overlay");

function removeUl(ul, lis) {
    ul.classList.remove("active");
    setTimeout(() => ul.classList.remove("transition"), 100);
    lis.forEach(li => li.classList.remove("active"));
}

window.addEventListener("resize", (event) => {
    if (overlay.style.height !== "" && overlay.style.height !== "0px") {
        overlay.style.setProperty("height", "0px");
        overlay.style.setProperty("width", "0px");
        const ul = body.querySelector("ul.active")
        const lis = ul.querySelectorAll("li");
        removeUl(ul, lis);
    }
});

overlay.addEventListener("click", () => {
    overlay.style.setProperty("height", `0px`);
    overlay.style.setProperty("width", `0px`);
    const ul = body.querySelector("ul.active")
    if (ul !== null) {
        const lis = ul.querySelectorAll("li");
        removeUl(ul, lis);
    }
});

containers.forEach(container => container.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    const ulTarget = target.nextElementSibling;

    containers.forEach(cont => {
        const ul = cont.nextElementSibling;
        const lis = ul.querySelectorAll("li");
        if (ulTarget !== ul) {
            if (ul.classList.contains("active")) {
                removeUl(ul, lis);
            }
        }
    });

    overlay.style.setProperty("height", `${body.offsetHeight}px`);
    overlay.style.setProperty("width", `${body.offsetWidth}px`);
    let lis = ulTarget.querySelectorAll("li");

    ulTarget.classList.toggle("active");
    setTimeout(() => ulTarget.classList.toggle("transition"), 100);
    lis.forEach(li => li.classList.toggle("active"));
}));