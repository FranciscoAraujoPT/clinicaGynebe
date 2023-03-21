const phoneButton = document.querySelector(".phone-button");
const callMe = phoneButton.querySelector(".fa-phone-volume");
const closeCallMe = phoneButton.querySelector(".fa-x");
const phone = document.querySelector(".phone");

let callMeSwitch = 0;

phoneButton.addEventListener("click", (event) => {
    if (callMeSwitch === 0) {
        closeCallMe.style.transform = "translateX(-50%) translateY(-50%) scale(1) rotateZ(360deg)"
        callMe.style.transform = "translateX(-50%) translateY(-50%) scale(0)"
        phone.style.transform = "scale(1)"
        callMeSwitch = 1;
    } else {
        closeCallMe.style.transform = "translateX(-50%) translateY(-50%) scale(0) rotateZ(0deg)"
        callMe.style.transform = "translateX(-50%) translateY(-50%) scale(1)"
        phone.style.transform = "scale(0)"
        callMeSwitch = 0;
    }
});