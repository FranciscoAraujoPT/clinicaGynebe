const imgContent = document.querySelectorAll(".box6 img");

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
imgContent.forEach(img => {
    img.addEventListener('mousemove', showImgContent);
    img.addEventListener('wheel', notShowImgContent);
    img.addEventListener("mouseleave", notShowImgContent);
});