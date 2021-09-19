const languangeButton = document.querySelector(".languangeButton");
const link = languangeButton.querySelector("a");
let aux = "";
let path = window.location.pathname;

if (path.substr(0, 5) === "/html") {
    path = path.replace("/html/", "");
    aux = "/html"
}

if (path.substr(0, 3) === "en/") {
    path = path.replace("en", "");
    link.setAttribute('href', window.location.origin + aux + path);
} else {
    link.setAttribute('href', window.location.origin + aux + "/en/" + path);
}
