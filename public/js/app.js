const navButton = document.querySelector(".navButton");

function navButtonClick() {
    const navLinks = document.querySelector(".sf-menu");
    const links = document.querySelectorAll(".sf-menu > li");
    const logo = document.querySelector("#logo");
    const languageButton = document.querySelector(".languageButton");
    const socials = document.querySelector(".socials2");

    document.body.classList.toggle("open");
    navButton.classList.toggle("open");
    navLinks.classList.toggle("open");
    logo.classList.toggle("open");
    socials.classList.toggle("open");

    links.forEach(link => {
        if (link.classList.contains("close")) {
            setTimeout(() => link.classList.remove("close"), 250);
        }
        link.classList.toggle("fade");
    });

    const lis = navLinks.querySelectorAll("li.block.open");

    if (lis !== null) {
        lis.forEach(li => {
            li.classList.remove("open");
            li.classList.remove("block");
        });
    }
}

navButton.addEventListener("click", () => {
    navButtonClick();
});

//------------------------------------------------------\\

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const header = document.querySelector("#header");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
}

window.addEventListener("resize", (event) => {
    if (logo.classList.contains("open") && window.innerWidth > 1024) {
        navButtonClick();
    }
});