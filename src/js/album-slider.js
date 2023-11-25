"use strict";

// DOM Selections.
const elem_albumsContainer = document.querySelector(".albums-container");
const elem_liveAlbum = document.querySelector(".live-album");
const elem_albums = Array.from(elem_albumsContainer.querySelectorAll(".album"));
const elem_imgReel = elem_liveAlbum.querySelector(".img-reel");
const elem_carousel = elem_liveAlbum.querySelector(".carousel");

// Page Data.
const intervals = [];
const sliderTouches = [];
const rectOfCarousel = elem_carousel.getBoundingClientRect();
const totalNumberOfSlides = 10;

// Functions.
const repositionTheSlides = function (positionAdj = 0) {
    const activeSlideIndex = 4;
    const liveImgs = Array.from(elem_carousel.querySelectorAll("img"));

    // Positioning all the slides correctly to their new position.
    liveImgs.forEach((slide, index) => {
        slide.style.transform = `translateX(${
            rectOfCarousel.width * (index - activeSlideIndex) - positionAdj
        }px)`;
    });

    // Activiting the img in the img reel accordingly.
    elem_imgReel.querySelectorAll(".img-container").forEach((slide) => {
        liveImgs.at(activeSlideIndex).getAttribute("src") ===
        slide.children[0].getAttribute("src")
            ? slide.classList.add("img-container-active")
            : slide.classList.remove("img-container-active");
    });
};

const loadSlides = function (batchName) {
    // Removing old slides and old reel imgs.
    elem_carousel.querySelectorAll("img").forEach((slide) => slide.remove());
    elem_imgReel
        .querySelectorAll(".img-container")
        .forEach((slide) => slide.remove());

    // Adding new slides and updating the side reel.
    for (let num = 0; num < totalNumberOfSlides; num++) {
        elem_carousel.insertAdjacentHTML(
            "beforeend",
            `
            <img
            src="/assets/gallery/${batchName}/${num + 1}.jpg"
            alt="Live Image" />
            `
        );
        elem_imgReel.insertAdjacentHTML(
            "beforeend",
            `
            <div class="img-container">
                <img
                    src="/assets/gallery/${batchName}/${num + 1}.jpg"
                    alt="Reel Picture" />
            </div>`
        );
    }

    // Positioning the slides properly.
    repositionTheSlides();
};

const goToNextSlide = function () {
    const elem_slides = Array.from(elem_carousel.querySelectorAll("img"));
    const elem_removed = elem_slides.shift();
    elem_removed.remove();
    elem_carousel.appendChild(elem_removed);

    repositionTheSlides();
};

const goToPrevSlide = function () {
    const elem_slides = Array.from(elem_carousel.querySelectorAll("img"));
    const elem_removed = elem_slides.pop();
    elem_removed.remove();
    elem_carousel.insertBefore(elem_removed, elem_carousel.children[0]);

    repositionTheSlides();
};

const goToSlide = function (event) {
    const reelImgs = Array.from(
        elem_imgReel.querySelectorAll(".img-container")
    );
    const targetElem = event.target.closest(".img-container");
    const elem_slides = Array.from(elem_carousel.querySelectorAll("img"));

    // Handling event bubbling properly.
    if (!reelImgs.includes(targetElem)) return;

    // Getting the index of slides which were moved.
    const clickedSlideIndex = elem_slides.findIndex((elem) => {
        return (
            elem.getAttribute("src") ===
            targetElem.querySelector("img").getAttribute("src")
        );
    });
    const numOfMovedSlides = clickedSlideIndex - 5;

    // Repositioning the slides inside thier container.
    if (numOfMovedSlides >= 0) {
        const elem_removed = elem_slides.slice(0, numOfMovedSlides + 1);

        elem_removed.forEach((elem) => {
            elem.remove();
            elem_carousel.appendChild(elem);
        });
    } else {
        const elem_removed = elem_slides.slice(numOfMovedSlides + 1).reverse();

        elem_removed.forEach((elem) => {
            elem.remove();
            elem_carousel.insertBefore(elem, elem_carousel.children[0]);
        });
    }

    repositionTheSlides();

    resetSliderInterval();
};

const changeSlides = function (event) {
    const targetElem = event.target.closest(".album");

    if (!elem_albums.includes(targetElem)) return;

    const batchName = targetElem.dataset.album;
    loadSlides(batchName);

    // Changing the appearance of the album buttons.
    elem_albums.forEach((album) => {
        album === targetElem
            ? album.classList.add("active")
            : album.classList.remove("active");
    });

    resetSliderInterval();
};

const handleKeyboardControls = function (event) {
    if (event.key === "ArrowLeft") goToPrevSlide();
    else if (event.key === "ArrowRight") goToNextSlide();

    resetSliderInterval();
};

const resetSliderInterval = function () {
    clearInterval(intervals.pop());
    intervals.push(setInterval(goToNextSlide, 3000));
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

    resetSliderInterval();
};

// Loading the default slides
loadSlides("annual_func_2015");

// Automatically changing slides by default.
resetSliderInterval();

// Attaching EventListeners for the slider.
elem_albumsContainer.addEventListener("click", changeSlides);
document.addEventListener("keydown", handleKeyboardControls);
elem_imgReel.addEventListener("click", goToSlide);
elem_carousel.addEventListener("touchmove", handleTouch);
elem_carousel.addEventListener("touchend", handleTouch);
