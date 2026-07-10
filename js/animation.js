document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".logo-icon-wrapper");
    const topPlannedCopy = document.querySelector(".top-planned-copy");
    const topPlannedRow = document.querySelector(".top-planned-row");
    document.querySelector('.animation-text').classList.add('animate');
    if (topPlannedCopy) topPlannedCopy.classList.add('animate');
    if (topPlannedRow) topPlannedRow.classList.add('animate');

    wrapper.classList.remove("animate");
    void wrapper.offsetWidth;

    requestAnimationFrame(() => {
        wrapper.classList.add("animate");
    });
});
