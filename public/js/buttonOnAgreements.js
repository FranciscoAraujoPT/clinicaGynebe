const buttons = document.querySelectorAll("button");
const body = document.querySelector("body");

buttons.forEach(button => button.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    const divTarget = target.parentElement.nextElementSibling;

    let list = divTarget.querySelectorAll(".insurence");

    if (divTarget.classList.contains("appear")) {
        divTarget.classList.remove("appear");
    } else {
        setTimeout(() => divTarget.classList.add("appear"), 100);
    }

    divTarget.classList.toggle("active");
    setTimeout(() => divTarget.classList.toggle("transition"), 100);
    list.forEach(li => li.classList.toggle("active"));
}));