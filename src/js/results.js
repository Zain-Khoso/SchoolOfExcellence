"use strict";

// DOM Selections.
const elem_filtersContainer = document.querySelector(
    ".result-filters-container"
);
const elem_context = elem_filtersContainer.querySelector(".context");
const elem_selections = Array.from(
    elem_filtersContainer.querySelectorAll(".selection")
);
const elem_filterBtn = elem_filtersContainer.querySelector(".filter-btn");

// Functions.
const actOnTheClick = function () {
    if (elem_selections.every((element) => element.value !== "default")) {
        elem_filtersContainer.insertAdjacentHTML(
            "afterend",
            `
            <div class="pdf-view-container">
            <object
                data="/assets/results.pdf"
                type="application/pdf"
                class="pdf-view"></object>
            </div>
            `
        );

        elem_context.style.color = "#1e1927";

        elem_filterBtn.removeEventListener("click", actOnTheClick);

        return;
    }

    elem_context.style.color = "#f00";
};

// Event Listeners.
elem_filterBtn.addEventListener("click", actOnTheClick);
