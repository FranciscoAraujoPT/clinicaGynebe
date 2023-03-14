const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in")
const appearOptions = {
    root: null,
    rootMargin: `0px 0px 0px 0px`,
    threshold: 0
}

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.add("appear");
        if (!entry.target.classList.contains("insurence")) {
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
});