const imgContent = Array.from(document.querySelectorAll(".box6 img")),
    sld = document.querySelector(".slider"),
    bulletsContainer = sld.querySelector(".sliderBullets"),
    bull = Array.from(bulletsContainer.children),
    sldChildren = sld.querySelector(".slides"),
    background = document.querySelector(".backgroundCover");

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

    background.classList.add("active");
    setTimeout(() => sld.classList.add("transition"), 100);
}

function closeCarousel() {
    sld.classList.remove("transition");
    setTimeout(() => background.classList.remove("active"), 100);
}

imgContent.forEach(img => {
    img.addEventListener('mousemove', showImgContent);
    img.addEventListener('wheel', notShowImgContent);
    img.addEventListener("mouseleave", notShowImgContent);
    img.addEventListener("click", carousel);
});

background.addEventListener("click", closeCarousel);