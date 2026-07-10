const screens = document.querySelectorAll(".phone-screen");
const bubbles = document.querySelectorAll(".bubble");
const tryLinks = document.querySelectorAll(".try-link");

function syncActiveState(target) {
    screens.forEach(screen => {
        screen.classList.toggle("active", screen.getAttribute("data-screen") === target);
    });

    tryLinks.forEach(link => {
        link.classList.toggle("is-visible", link.getAttribute("data-link") === target);
    });
}

bubbles.forEach(bubble => {
    bubble.addEventListener("click", () => {
        bubbles.forEach(b => b.classList.remove("active"));
        bubble.classList.add("active");

        const target = bubble.getAttribute("data-target");
        syncActiveState(target);
    });
});

const activeBubble = document.querySelector(".bubble.active");
if (activeBubble) {
    syncActiveState(activeBubble.getAttribute("data-target"));
}
