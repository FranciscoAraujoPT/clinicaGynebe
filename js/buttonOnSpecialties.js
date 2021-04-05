const containers = document.querySelectorAll("button");
const body = document.querySelector("body");
const overlay = body.querySelector(".overlay");

function removeUl(ul, lis) {
    ul.classList.remove("active");
    setTimeout(() => ul.classList.remove("transition"), 100);
    lis.forEach(li => li.classList.remove("active"));
}

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

    overlay.addEventListener("click", () => {
        overlay.style.setProperty("height", `0px`);
        overlay.style.setProperty("width", `0px`);
        removeUl(ulTarget, lis);
    });

    ulTarget.classList.toggle("active");
    setTimeout(() => ulTarget.classList.toggle("transition"), 100);
    lis.forEach(li => li.classList.toggle("active"));
}));