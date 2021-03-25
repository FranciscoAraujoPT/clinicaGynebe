const carousel = document.querySelector(".carousel");
const track = document.querySelector(".carouselTrack");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carouselRightButton");
const prevButton = document.querySelector(".carouselLeftButton");


const slideWidth = slides[0].getBoundingClientRect().width;
const bulletContainer = document.createElement('div');

// Inicialize the bullets
bulletContainer.classList.add('carouselBullets')
slides.forEach(() => {
    const bullet = document.createElement('button');
    bullet.classList.add('bullets')
    bulletContainer.appendChild(bullet);
});
bulletContainer.firstElementChild.classList.add("currentSlide");
carousel.appendChild(bulletContainer);

const carouselBullets = document.querySelector(".carouselBullets");
const bullets = Array.from(carouselBullets.children);

slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + "px"; //setting the slides positions
});

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left; + ")";
    currentSlide.classList.remove("currentSlide");
    targetSlide.classList.add("currentSlide");
}

const updateBullets = (currentBullet, targetBullet) => {
    currentBullet.classList.remove("currentSlide");
    targetBullet.classList.add("currentSlide");
}

nextButton.addEventListener("click", (event) => {
    const currentSlide = track.querySelector(".currentSlide");
    let nextSlide = currentSlide.nextElementSibling;

    if (nextSlide === null) {
        nextSlide = track.firstElementChild;
    }

    const currentBullet = carouselBullets.querySelector(".currentSlide");
    let targetBullet = currentBullet.nextElementSibling;

    if (targetBullet === null) {
        targetBullet = carouselBullets.firstElementChild;
    }

    moveToSlide(track, currentSlide, nextSlide);
    updateBullets(currentBullet, targetBullet);
});

prevButton.addEventListener("click", (event) => {
    const currentSlide = track.querySelector(".currentSlide");
    let prevSlide = currentSlide.previousElementSibling;

    if (prevSlide === null) {
        prevSlide = track.lastElementChild;
    }

    const currentBullet = carouselBullets.querySelector(".currentSlide");
    let targetBullet = currentBullet.previousElementSibling;

    if (targetBullet === null) {
        targetBullet = carouselBullets.lastElementChild;
    }

    moveToSlide(track, currentSlide, prevSlide);
    updateBullets(currentBullet, targetBullet);
});

carouselBullets.addEventListener("click", (event) => {
    const targetBullet = event.target.closest("button");

    if (targetBullet === null) {
        return;
    }
    const currentSlide = track.querySelector(".currentSlide");
    const currentBullet = carouselBullets.querySelector(".currentSlide");
    const targetIndex = bullets.findIndex(bullet => {
        return bullet === targetBullet
    });

    if (targetIndex === -1) {
        return;
    }

    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateBullets(currentBullet, targetBullet);
});