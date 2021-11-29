const languageButton = document.querySelector(".languageButton");
const inicialLang = languageButton.querySelector(".inicialLang");
const languageList = languageButton.querySelector(".languageList");
const langNavButton = languageButton.querySelector(".langNavButton");
const linkPT = languageButton.querySelector(".PT");
const linkEN = languageButton.querySelector(".EN");
const linkES = languageButton.querySelector(".ES");
const overlayLang = document.querySelector(".overlay");

let aux = "";
let path = window.location.pathname;

function clearLang() {
    overlayLang.style.setProperty("height", `0px`);
    overlayLang.style.setProperty("width", `0px`);
    languageList.classList.remove("buttonPress");
    langNavButton.classList.remove("buttonPress");
    setTimeout(() => inicialLang.classList.remove("buttonPress"), 200);
}

inicialLang.addEventListener("click", (event) => {
    inicialLang.classList.add("buttonPress");
    setTimeout(() => languageList.classList.add("buttonPress"), 200);
    setTimeout(() => langNavButton.classList.add("buttonPress"), 600);
    overlayLang.style.setProperty("height", `${document.body.offsetHeight}px`);
    overlayLang.style.setProperty("width", `${document.body.offsetWidth}px`);
});

overlayLang.addEventListener("click", () => {
    clearLang();
});

langNavButton.addEventListener("click", () => {
    clearLang();
});

if (path.includes("/clinicaGynebe")) {
    path = path.replace("/clinicaGynebe", "");
    aux = "/clinicaGynebe";
}

if (path.includes("/html")) {
    path = path.replace("/html", "");
    aux = aux + "/html";
}

if (path.includes("en/")) {
    path = path.replace("/en", "");
} else if (path.includes("es/")) {
    path = path.replace("/es", "");
}

linkPT.setAttribute('href', window.location.origin + aux + path);
linkEN.setAttribute('href', window.location.origin + aux + "/en" + path);
linkES.setAttribute('href', window.location.origin + aux + "/es" + path);
