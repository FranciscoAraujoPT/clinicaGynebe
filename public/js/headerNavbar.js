const nav = document.querySelector(".headerNav");
const background = nav.querySelector(".dropdownBackground");

const headerNavbar = () => {
    if (document.documentElement.clientWidth >= 1007) {
        const triggers = nav.querySelectorAll(".sf-menu > li");
        const notNav = document.querySelectorAll("#header > div, #content, #footer");

        function touchHandlerEnter(event) {
            const target = event.target.closest("li.top");

            if (target === null) {
                return;
            }

            if (target.classList.contains("trigger-enter")) {
                return;
            }

            event = event || window.event;
            event.preventDefault();

            const aux = nav.querySelector(".trigger-enter");

            if (aux !== null) {
                aux.classList.remove("trigger-enter");
                setTimeout(() => aux.classList.remove("trigger-enter-active"), 100);
            }

            handleEnter(event);
        }

        function touchHandlerLeave(event) {
            const aux = nav.querySelector(".trigger-enter");

            if (!aux) {
                return;
            }

            aux.classList.remove("trigger-enter");
            setTimeout(() => aux.classList.remove("trigger-enter-active"), 100);
            background.classList.remove("open");
        }


        function handleEnter(event) {
            const target = event.target.closest("li.top");

            if (target === null) {
                return;
            }

            target.classList.add("trigger-enter");
            setTimeout(() => target.classList.add("trigger-enter-active"), 100);
            background.classList.add("open");

            const dropdown = target.querySelector(".dropdown");
            const dropdownCoords = dropdown.getBoundingClientRect();
            const navCoords = nav.getBoundingClientRect();

            const coords = {
                height: dropdownCoords.height,
                width: dropdownCoords.width,
                top: dropdownCoords.top - navCoords.top,
                left: dropdownCoords.left - navCoords.left
            }

            background.style.setProperty("width", `${coords.width}px`);
            background.style.setProperty("height", `${coords.height}px`);
            background.style.setProperty("transform", `translate(${coords.left}px, ${coords.top}px)`);
        }

        function handleLeave(event) {
            const target = event.target.closest("li.top");

            if (target === null) {
                return;
            }

            target.classList.remove("trigger-enter");
            setTimeout(() => target.classList.remove("trigger-enter-active"), 100);
            background.classList.remove("open");
        }

        triggers.forEach(trigger => trigger.addEventListener("mouseenter", handleEnter));
        triggers.forEach(trigger => trigger.addEventListener("mouseleave", handleLeave));
        triggers.forEach(trigger => trigger.addEventListener("touchstart", touchHandlerEnter));
        notNav.forEach(aux => aux.addEventListener("touchstart", touchHandlerLeave));
    } else if (background.classList.contains("open")) {
        const target = nav.querySelector(".trigger-enter");
        target.classList.remove("trigger-enter");
        setTimeout(() => target.classList.remove("trigger-enter-active"), 100);
        background.classList.remove("open");
        background.style.setProperty("width", "0px");
        background.style.setProperty("height", "0px");
    }
};

function backgroundRezise() {
    const target = nav.querySelector(".trigger-enter");

    if (target === null) {
        return;
    }

    const dropdown = target.querySelector(".dropdown");
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();

    const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left - navCoords.left
    }

    background.style.setProperty("width", `${coords.width}px`);
    background.style.setProperty("height", `${coords.height}px`);
    background.style.setProperty("transform", `translate(${coords.left}px, ${coords.top}px)`);
}

window.addEventListener("resize", (event) => {
    setTimeout(() => backgroundRezise(), 1500);
    headerNavbar();
});

headerNavbar();