const box = document.querySelector(".box9");
const background = box.querySelector(".box9-background");
const activity = box.querySelector(".activity");
const formation = box.querySelector(".formation");
const sociaty = box.querySelector(".sociaty");
const science = box.querySelector(".science");
const textActivity = box.querySelector(".text-activity");
const textFormation = box.querySelector(".text-formation");
const textSociaty = box.querySelector(".text-sociaty");
const textScience = box.querySelector(".text-science");
let obj = activity;

moveTo(obj);

window.addEventListener("resize", (event) => {
    moveTo(obj);
    background.style.transition = "none"
});

box.addEventListener("click", (event) => {
    obj = event.target.closest("div");
    if (obj === activity) {
        toogle(textActivity);
        moveTo(activity);
    } else if (obj === formation) {
        toogle(textFormation);
        moveTo(formation);
    } else if (obj === sociaty) {
        toogle(textSociaty);
        moveTo(sociaty);
    } else if (obj === science) {
        toogle(textScience);
        moveTo(science);
    }
});

function toogle(target) {
    if (target.classList.contains("open") === true) {
        return;
    }
    const oldTarget = box.querySelector(".open");
    oldTarget.classList.remove("open");
    target.classList.add("open");
}

function moveTo(target) {
    const title = target.querySelector("h4");
    if (background.style.transition === "none 0s ease 0s") {
        background.style.transition = "all 0.6s ease-in-out";
    }
    background.style.height = title.clientHeight + "px";
    background.style.width = title.clientWidth + "px";
    background.style.top = title.offsetTop + "px";
    background.style.left = title.offsetLeft + "px";
}