const body = document.body;
const overlay = body.querySelector(".overlay");
const box = document.querySelector(".box9");
const barHolder = box.querySelector(".bar-holder");
const tabHolder = box.querySelector(".tab-holder");
const barHolderBackground = box.querySelector(".box9-background");
const activity = box.querySelector(".box9 > .activity");
const formation = box.querySelector(".box9 > .formation");
const sociaty = box.querySelector(".box9 > .sociaty");
const science = box.querySelector(".box9 > .science");
const textActivity = box.querySelector(".text-activity");
const textFormation = box.querySelector(".text-formation");
const textSociaty = box.querySelector(".text-sociaty");
const textScience = box.querySelector(".text-science");

let currentObj = activity;
let statusBig = false;
let statusSmall = false;

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
    if (barHolderBackground.style.transition === "none 0s ease 0s") {
        barHolderBackground.style.transition = "all 0.6s ease-in-out";
    }
    barHolderBackground.style.height = title.clientHeight + "px";
    barHolderBackground.style.width = title.clientWidth + "px";
    barHolderBackground.style.top = title.offsetTop + "px";
    barHolderBackground.style.left = title.offsetLeft + "px";
}

function bigScreen(obj) {
    moveTo(obj);

    box.addEventListener("click", (event) => {
        obj = event.target.closest("div");
        if (obj === activity) {
            toogle(textActivity);
            moveTo(activity);
            currentObj = obj;
        } else if (obj === formation) {
            toogle(textFormation);
            moveTo(formation);
            currentObj = obj;
        } else if (obj === science) {
            toogle(textScience);
            moveTo(science);
            currentObj = obj;
        } else if (obj === sociaty) {
            toogle(textSociaty);
            moveTo(sociaty);
            currentObj = obj;
        }
    });
}

function smallScreen() {
    barHolder.addEventListener("click", (event) => {
        tabHolder.classList.toggle("show");
        if (overlay.style.height === "" || overlay.style.height === "0px") {
            overlay.style.setProperty("height", `${body.offsetHeight}px`);
            overlay.style.setProperty("width", `${body.offsetWidth}px`);
        } else {
            overlay.style.setProperty("height", `0px`);
            overlay.style.setProperty("width", `0px`);
        }
    });

    tabHolder.addEventListener("click", (event) => {
        const target = event.target.closest("li");
        if (target === null) {
            return;
        }
        barHolder.querySelector("p").innerText = target.innerText;

        if (target.classList.contains("activity")) {
            currentObj = activity;
            toogle(textActivity);
        } else if (target.classList.contains("formation")) {
            currentObj = formation;
            toogle(textFormation);
        } else if (target.classList.contains("science")) {
            currentObj = science;
            toogle(textScience);
        } else if (target.classList.contains("sociaty")) {
            currentObj = sociaty;
            toogle(textSociaty);
        }

        overlay.style.setProperty("height", `0px`);
        overlay.style.setProperty("width", `0px`);
        tabHolder.classList.remove("show");
    });

    overlay.addEventListener("click", () => {
        overlay.style.setProperty("height", `0px`);
        overlay.style.setProperty("width", `0px`);
        tabHolder.classList.remove("show");
    });
}

window.addEventListener("resize", (event) => {
    if (window.innerWidth >= 1024) {
        if (!activity.classList.contains("show")) {
            activity.classList.add("show");
            formation.classList.add("show");
            science.classList.add("show");
            sociaty.classList.add("show");
            barHolderBackground.classList.add("show");

            barHolder.classList.remove("show");
            if (tabHolder.classList.contains("show")) {
                overlay.style.setProperty("height", `0px`);
                overlay.style.setProperty("width", `0px`);
                tabHolder.classList.remove("show");
            }
            if (statusBig === false) {
                bigScreen(currentObj);
                statusBig = true;
            }
        }
        moveTo(currentObj);
        barHolderBackground.style.transition = "none"
    } else {
        if (!barHolder.classList.contains("show")) {
            activity.classList.remove("show");
            formation.classList.remove("show");
            science.classList.remove("show");
            sociaty.classList.remove("show");
            barHolderBackground.classList.remove("show");
            barHolder.querySelector("p").innerText = currentObj.querySelector("h4").innerText;
            barHolder.classList.add("show");
            if (statusSmall === false) {
                smallScreen();
                statusSmall = true;
            }
        }
        if (tabHolder.classList.contains("show")) {
            overlay.style.setProperty("height", `${body.offsetHeight}px`);
            overlay.style.setProperty("width", `${body.offsetWidth}px`);
        }
    }
});

if (window.innerWidth >= 1024) {
    activity.classList.add("show");
    formation.classList.add("show");
    science.classList.add("show");
    sociaty.classList.add("show");
    barHolderBackground.classList.add("show");
    bigScreen(currentObj);
    statusBig = true
} else {
    barHolder.classList.add("show");
    smallScreen();
    statusSmall = true;
}