"use strict";

// DOM Selections
const elem_prev = document.querySelectorAll(".prev");
const elem_next = document.querySelectorAll(".next");

// Functions
const showNextSlide = function (event) {
    const targetSlider = event.target.parentElement;
    const slides = targetSlider.querySelectorAll(".slide");
    const activeSlide = targetSlider.querySelector(".active");
    const indexOfActiveSlide = [...slides].indexOf(activeSlide);
    let nextActiveSlide;

    if (event.target.classList.contains("next")) {
        nextActiveSlide =
            slides[
                indexOfActiveSlide + 1 == slides.length
                    ? 0
                    : indexOfActiveSlide + 1
            ];
    } else {
        nextActiveSlide =
            slides[
                indexOfActiveSlide - 1 < 0
                    ? slides.length - 1
                    : indexOfActiveSlide - 1
            ];
    }

    activeSlide.classList.remove("active");
    nextActiveSlide.classList.add("active");
};

// Event Listeners.
elem_next.forEach((elem) => elem.addEventListener("click", showNextSlide));
elem_prev.forEach((elem) => elem.addEventListener("click", showNextSlide));
