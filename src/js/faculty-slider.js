"use strict";

// DOM Selections.
const elem_slider = document.querySelector(".slider");
const elem_slidesContainer = document.querySelector(".slides-container");
const elem_prevBtn = document.querySelector(".prev");
const elem_nextBtn = document.querySelector(".next");
const elem_sliderModesContainer = document.querySelector(".slider-modes");
const elem_sliderModes = Array.from(
    elem_sliderModesContainer.querySelectorAll(".mode")
);
const elem_dotsContainer = document.querySelector(".dots");

// Variables.
const rectOfCarousel = elem_slider.getBoundingClientRect();
const slidesData = {};
const touchData = [];
const sliderTouches = [];
let currSlideIndex = 0;

// Functions.
const repositionTheSlides = function (positionAdj = 0) {
    // Positioning all the slides correctly to their new position.
    elem_slidesContainer.querySelectorAll(".slide").forEach((slide, index) => {
        slide.style.transform = `translateX(${
            rectOfCarousel.width * (index - currSlideIndex) - positionAdj
        }px)`;
        currSlideIndex === index
            ? slide.classList.add("active")
            : slide.classList.remove("active");
    });

    // Activating a dot according to the slide.
    Array.from(elem_dotsContainer.children).forEach((dot, index) => {
        index === currSlideIndex
            ? dot.classList.add("active-dot")
            : dot.classList.remove("active-dot");
    });
};

const loadSlides = function (slides) {
    // Removing old slides.
    elem_slidesContainer
        .querySelectorAll(".slide")
        .forEach((slide) => slide.remove());

    // Removing old dots.
    elem_dotsContainer.querySelectorAll(".dot").forEach((dot) => dot.remove());

    // Adding new slides & dots.
    slides.forEach(function (slide) {
        elem_slidesContainer.insertAdjacentHTML(
            "beforeend",
            `
        <div class="slide">
            <div class="pfp-container">
                <img
                    src="${slide.pfp}"
                    alt="${slide.role}"
                    class="pfp" />
            </div>
            <div class="context-container">
                <h3 class="subheading">${slide.role.toUpperCase()}</h3>
                <h2 class="heading">${slide.name}</h2>
                <p class="context">
                    ${slide.description}
                </p>

                <div class="contacts">
                    <span class="contact">
                        Email: ${slide.email}
                    </span>
                    <span class="contact">Phone: ${slide.phone}</span>
                </div>
            </div>
        </div>`
        );
        elem_dotsContainer.insertAdjacentHTML(
            "beforeend",
            '<buttom class="dot"></buttom>'
        );
    });

    // Positioning the slides properly.
    currSlideIndex = 0;
    repositionTheSlides();
};

const goToNextSlide = function () {
    const elem_slides = elem_slidesContainer.querySelectorAll(".slide");
    const elem_currActiveSlide = elem_slidesContainer.querySelector(".active");
    currSlideIndex = Array.from(elem_slides).indexOf(elem_currActiveSlide) + 1;

    if (currSlideIndex === elem_slides.length) currSlideIndex = 0;

    repositionTheSlides();
};

const goToPrevSlide = function () {
    const elem_slides = elem_slidesContainer.querySelectorAll(".slide");
    const elem_currActiveSlide = elem_slidesContainer.querySelector(".active");
    currSlideIndex = Array.from(elem_slides).indexOf(elem_currActiveSlide) - 1;

    if (currSlideIndex < 0) currSlideIndex = elem_slides.length - 1;

    repositionTheSlides();
};

const goToSlide = function (event) {
    const dots = Array.from(elem_dotsContainer.querySelectorAll(".dot"));
    const targetElem = event.target;

    if (!dots.includes(targetElem)) return;

    currSlideIndex = dots.indexOf(targetElem);

    repositionTheSlides();
};

const changeSlides = function (event) {
    const targetElem = event.target;

    if (!elem_sliderModes.includes(targetElem)) return;

    const newSlides = slidesData[targetElem.dataset.mode];
    loadSlides(newSlides);

    // Changing the appearance of the modes buttons.
    elem_sliderModes.forEach((mode) => {
        mode === targetElem
            ? mode.classList.add("active-mode")
            : mode.classList.remove("active-mode");
    });
};

const handleKeyboardControls = function (event) {
    if (event.key === "ArrowLeft") goToPrevSlide();
    else if (event.key === "ArrowRight") goToNextSlide();
};

const handleTouch = function (event) {
    sliderTouches.push(event.changedTouches[0].clientX);

    const firstTouch = sliderTouches.at(0);
    const lastTouch = sliderTouches.at(-1);

    repositionTheSlides(firstTouch - lastTouch);

    if (event.type === "touchend") {
        if (firstTouch > lastTouch) goToNextSlide();
        else if (firstTouch < lastTouch) goToPrevSlide();
        else repositionTheSlides();

        sliderTouches.splice(0, sliderTouches.length);
    }
};

// Getting the slides data and setting up the default slides.
(async function () {
    const req = await fetch("/assets/faculty.json");
    const data = await req.json();

    // Loading default slides.
    loadSlides(data.administration);

    // Storing all of the slides data in a global variable.
    for (let slide in data) {
        slidesData[slide] = data[slide];
    }

    // Attaching EventListeners for the slider.
    elem_sliderModesContainer.addEventListener("click", changeSlides);
    elem_prevBtn.addEventListener("click", goToPrevSlide);
    elem_nextBtn.addEventListener("click", goToNextSlide);
    elem_dotsContainer.addEventListener("click", goToSlide);
    document.addEventListener("keydown", handleKeyboardControls);
    elem_slider.addEventListener("touchmove", handleTouch);
    elem_slider.addEventListener("touchend", handleTouch);
})();
