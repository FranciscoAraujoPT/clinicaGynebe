const languangeButton = document.querySelector(".languangeButton");
const link = languangeButton.querySelector("a");
let aux = "";
let path = window.location.pathname;

if (path.includes("/clinicaGynebe")) {
    path = path.replace("/clinicaGynebe", "");
    aux = "/clinicaGynebe";
}

if (path.includes("/html")) {
    path = path.replace("/html/", "");
    aux = aux + "/html";
}

if (path.includes("en/")) {
    path = path.replace("en", "");
    link.setAttribute('href', window.location.origin + aux + path);
} else {
    link.setAttribute('href', window.location.origin + aux + "/en/" + path);
}
