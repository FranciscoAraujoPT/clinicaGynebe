const headerNav = document.querySelector(".headerNav");
const menu = headerNav.querySelector(".sf-menu");
const menuOptions = headerNav.querySelectorAll(".sf-menu > li");
const clinica = menu.querySelector(".sf-menu > li:nth-child(4)");
const contacts = menu.querySelector(".sf-menu > li:nth-child(5)");

clinica.addEventListener("click", (event) => {
    if (window.innerWidth < 1024) {
        menuPrevent(event, clinica);
    }
});

contacts.addEventListener("click", (event) => {
    if (window.innerWidth < 1024) {
        menuPrevent(event, contacts);
    }
});

function menuPrevent(event, option) {
    event = event || window.event;
    const target = event.target.closest("li");
    if (target === option) {
        event.preventDefault();
    }

    menuOptions.forEach(li => {
        li.classList.add("close");
    })

    const menuSecondOptions = option.querySelectorAll("li");
    menuSecondOptions.forEach(li => {
        setTimeout(() => li.classList.add("block"), 900)
        setTimeout(() => li.classList.add("open"), 1000);
    })
}