const marquees = document.querySelectorAll("[data-marquee]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

marquees.forEach((carousel) => {
    const track = carousel.querySelector("[data-marquee-track]");
    const group = carousel.querySelector("[data-marquee-group]");

    if (!track || !group) {
        return;
    }

    const clone = group.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);

    const speed = Number(carousel.dataset.marqueeSpeed || 140);
    let isHovered = false;

    const updateMarquee = () => {
        const groupWidth = group.getBoundingClientRect().width;

        if (groupWidth <= 0) {
            return;
        }

        const duration = groupWidth / speed;
        carousel.style.setProperty("--marquee-width", `${groupWidth}px`);
        carousel.style.setProperty("--marquee-duration", `${duration}s`);
    };

    const syncReducedMotion = () => {
        if (prefersReducedMotion.matches || isHovered) {
            track.style.animationPlayState = "paused";
            return;
        }

        track.style.animationPlayState = "running";
    };

    updateMarquee();
    syncReducedMotion();

    carousel.addEventListener("mouseenter", () => {
        isHovered = true;
        syncReducedMotion();
    });

    carousel.addEventListener("mouseleave", () => {
        isHovered = false;
        syncReducedMotion();
    });

    window.addEventListener("resize", () => {
        updateMarquee();
    });

    if (typeof prefersReducedMotion.addEventListener === "function") {
        prefersReducedMotion.addEventListener("change", syncReducedMotion);
    } else if (typeof prefersReducedMotion.addListener === "function") {
        prefersReducedMotion.addListener(syncReducedMotion);
    }
});
