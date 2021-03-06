const slider = document.querySelector('.slider'),
    sliderItems = slider.querySelector('.slides'),
    slides = Array.from(sliderItems.children),
    prev = slider.querySelector('.prev'),
    next = slider.querySelector('.next');

let index = 0;

// Inicialize the bullets
function initBullets() {
    const bulletContainer = document.createElement('div');
    bulletContainer.classList.add('sliderBullets')
    slides.forEach(() => {
        const bullet = document.createElement('button');
        bullet.classList.add('bullets')
        bulletContainer.appendChild(bullet);
    });
    bulletContainer.firstElementChild.classList.add("currentSlide");
    slider.appendChild(bulletContainer);
}

function slide(wrapper, items, prev, next) {
    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.querySelectorAll('.slide'),
        sliderBullets = slider.querySelector(".sliderBullets"),
        bullets = Array.from(sliderBullets.children),
        slidesLength = slides.length,
        slideSize = slides[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        allowShift = true;

    // Update the bullets
    const updateBullets = (currentBullet, index) => {
        currentBullet.classList.remove("currentSlide");
        bullets[index].classList.add("currentSlide");
    }
    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');

    // Mouse events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    // Click events
    prev.addEventListener('click', function () {
        shiftSlide(-1);
    });

    next.addEventListener('click', function () {
        shiftSlide(1);
    });

    sliderBullets.addEventListener("click", (event) => {
        const targetBullet = event.target.closest("button");

        if (targetBullet === null) {
            return;
        }

        const currentBullet = slider.querySelector(".currentSlide");
        const targetIndex = bullets.findIndex(bullet => {
            return bullet === targetBullet;
        });

        if (targetIndex === -1) {
            return;
        }

        updateBullets(currentBullet, targetIndex);
        items.classList.add('shifting');
        index = targetIndex;
        items.style.setProperty("left", `${-100 * (index + 1)}%`);
    });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    }

    function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.setProperty("left", `${-100 * (index + 1)}%`);
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir) {
        items.classList.add('shifting');

        if (allowShift) {
            if (dir === 1) {
                index++;
                items.style.setProperty("left", `${-100 * (index + 1)}%`);
            } else if (dir === -1) {
                index--;
                items.style.setProperty("left", `${-100 * (index + 1)}%`);
            }
        };
        allowShift = false;
    }

    function checkIndex() {
        items.classList.remove('shifting');

        if (index === -1) {
            index = slidesLength - 1;
            items.style.setProperty("left", `${-100 * (index + 1)}%`);
        }

        if (index === slidesLength) {
            index = 0;
            items.style.setProperty("left", `${-100 * (index + 1)}%`);
        }

        updateBullets(slider.querySelector(".currentSlide"), index);
        allowShift = true;
    }

    window.addEventListener("resize", (event) => {
        slideSize = slides[0].offsetWidth;
    });
}

initBullets();
slide(slider, sliderItems, prev, next);