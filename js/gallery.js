const imgContent = Array.from(document.querySelectorAll(".box6 img")),
    sld = document.querySelector(".slider"),
    bulletsContainer = sld.querySelector(".sliderBullets"),
    bull = Array.from(bulletsContainer.children),
    sldChildren = sld.querySelector(".slides"),
    backgroundCover = document.querySelector(".backgroundCover"),
    headerClose = document.querySelector("#header");

function showImgContent(event) {

    x = event.offsetX;
    y = event.offsetY;
    let imgHover = event.target.closest("img").nextElementSibling;
    if (imgHover == null) {
        console.log("yaaaa");
    }
    if (imgHover.style.display === "none") {
        imgHover.style.display = "block";
    }
    imgHover.style.transform = `translate3d(${x}px, ${y}px, 0)`;
};

function notShowImgContent(event) {
    event.target.closest("img").nextElementSibling.style.display = "none";
};

function carousel(event) {
    const target = event.target.closest("img");
    const bullToRemove = bulletsContainer.querySelector(".currentSlide")

    const targetIndex = imgContent.findIndex(img => {
        return img === target;
    });

    sldChildren.style.setProperty("left", `${-100 * (targetIndex + 1)}%`);
    bullToRemove.classList.remove("currentSlide");
    bull[targetIndex].classList.add("currentSlide");
    index = targetIndex;
    backgroundCover.classList.add("active");
    setTimeout(() => sld.classList.add("transition"), 100);
    if (window.innerHeight < 550) {
        headerClose.classList.add("close");
        sld.style.height = "90%";
        sld.style.top = "50%";
    }
}

function closeCarousel() {
    sld.classList.remove("transition");
    setTimeout(() => backgroundCover.classList.remove("active"), 100);
    if (window.innerHeight < 550) {
        headerClose.classList.remove("close");
        if (window.innerWidth > 1950) {
            sld.style.height = "80%";
        } else if (window.innerWidth > 1336) {
            sld.style.height = "70%";
        } else if (window.innerWidth > 501) {
            sld.style.height = "60%";
        } else {
            sld.style.height = "40%";
        }
        sld.style.top = "55%";
    }
}

imgContent.forEach(img => {
    img.addEventListener('mousemove', showImgContent);
    img.addEventListener('wheel', notShowImgContent);
    img.addEventListener("mouseleave", notShowImgContent);
    img.addEventListener("click", carousel);
});

window.addEventListener("resize", (event) => {
    if (window.innerHeight < 550 && backgroundCover.classList.contains("active")) {
        headerClose.classList.add("close");
        sld.style.height = "90%";
        sld.style.top = "50%";
    } else {
        headerClose.classList.remove("close");
        if (window.innerWidth > 1950) {
            sld.style.height = "80%";
        } else if (window.innerWidth > 1336) {
            sld.style.height = "70%";
        } else if (window.innerWidth > 501) {
            sld.style.height = "60%";
        } else {
            sld.style.height = "40%";
        }
        sld.style.top = "55%";
    }
});

backgroundCover.addEventListener("click", closeCarousel);