let currentType = "recipe";
let selectedCategories = [];
let currentSkill = "all";

function setType(type, el) {
    currentType = type;

    // Toggle active button
    document.querySelectorAll(".toggle-btn").forEach(btn => btn.classList.remove("active"));
    el.classList.add("active");

    const recipeFilters = document.getElementById("recipeFilters");
    const hackFilters = document.getElementById("hackFilters");

    if (type === "recipe") {
        recipeFilters.style.display = "flex";
        hackFilters.style.display = "none";
    } else {
        recipeFilters.style.display = "none";
        hackFilters.style.display = "flex";
    }

    // Reset filters
    selectedCategories = [];

    document.querySelectorAll(".filters-btn").forEach(btn => btn.classList.remove("active"));

    const visibleFilters = type === "recipe" ? recipeFilters : hackFilters;
    const allBtn = visibleFilters.querySelector('[data-category="all"]');
    if (allBtn) {
        allBtn.classList.add("active");
    }
    updateFilters();
}

function setCategory(category, el) {

    if (category === "all") {
        selectedCategories = [];

        document.querySelectorAll(".filters-btn").forEach(btn => btn.classList.remove("active"));
        el.classList.add("active");

    } else {
        // remove "all"
        document.querySelectorAll('[data-category="all"]').forEach(btn => btn.classList.remove("active"));

        el.classList.toggle("active");

        if (selectedCategories.includes(category)) {
            selectedCategories = selectedCategories.filter(c => c !== category);
        } else {
            selectedCategories.push(category);
        }
    }

    updateFilters();
}

function updateFilters() {
    const wrappers = document.querySelectorAll(".card-wrapper");

    wrappers.forEach(wrapper => {
        const card = wrapper.querySelector(".card");
        const type = card.getAttribute("data-type");
        const categories = card.getAttribute("data-category").split(" ");
        const skill = card.getAttribute("data-skill");

        let show = true;

        // filter by skill
        if (currentSkill !== "all" && skill !== currentSkill) {
            show = false;
        }

        // filter by type
        if (type !== currentType) {
            show = false;
        }

        // filter by category
        if (selectedCategories.length > 0) {
            const hasMatch = selectedCategories.some(cat => categories.includes(cat));
            if (!hasMatch) {
                show = false;
            }
        }

        wrapper.style.display = show ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    updateFilters();
});

function setSkill(skill) {
    currentSkill = skill;
    updateFilters();
}