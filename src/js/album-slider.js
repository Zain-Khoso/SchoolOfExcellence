"use strict";

// DOM Selections.
const elem_albumsContainer = document.querySelector(".albums-container");
const elem_liveAlbum = document.querySelector(".live-album");
const elem_albums = Array.from(elem_albumsContainer.querySelectorAll(".album"));
const elem_imgReel = elem_liveAlbum.querySelector(".img-reel");
const elem_carousel = elem_liveAlbum.querySelector(".carousel");
const elem_carouselImages = Array.from(elem_carousel.querySelectorAll("img"));

// Page Data.
const intervals = [];
const sliderTouches = [];
const rectOfCarousel = elem_carousel.getBoundingClientRect();
const totalNumberOfSlides = 10;
let sliderTouchStart = 0;

// Functions.
const repositionTheSlides = function (currSlideIndex) {
    // Positioning all the slides correctly to their new position.
    elem_carousel.querySelectorAll("img").forEach((slide, index) => {
        slide.style.transform = `translateX(${
            rectOfCarousel.width * (index - currSlideIndex)
        }px)`;
        currSlideIndex === index
            ? slide.classList.add("active")
            : slide.classList.remove("active");
    });

    // Activiting the img in the img reel accordingly.
    elem_imgReel.querySelectorAll(".img-container").forEach((slide, index) => {
        currSlideIndex === index
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
    repositionTheSlides(0);
};

const goToNextSlide = function () {
    const elem_slides = elem_carousel.querySelectorAll("img");
    const elem_currActiveSlide = elem_carousel.querySelector(".active");
    let nextSlideIndex =
        Array.from(elem_slides).indexOf(elem_currActiveSlide) + 1;

    if (nextSlideIndex === elem_slides.length) nextSlideIndex = 0;

    repositionTheSlides(nextSlideIndex);
};

const goToPrevSlide = function () {
    const elem_slides = elem_carousel.querySelectorAll("img");
    const elem_currActiveSlide = elem_carousel.querySelector(".active");
    let prevSlideIndex =
        Array.from(elem_slides).indexOf(elem_currActiveSlide) - 1;

    if (prevSlideIndex < 0) prevSlideIndex = elem_slides.length - 1;

    repositionTheSlides(prevSlideIndex);
};

const goToSlide = function (event) {
    const reelImgs = Array.from(
        elem_imgReel.querySelectorAll(".img-container")
    );
    const targetElem = event.target.closest(".img-container");

    if (!reelImgs.includes(targetElem)) return;

    repositionTheSlides(reelImgs.indexOf(targetElem));

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
    const sliderTouchEnd = event.changedTouches[0].clientX;

    if (sliderTouchStart > sliderTouchEnd) goToNextSlide();
    else if (sliderTouchStart < sliderTouchEnd) goToPrevSlide();
    else return;

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
elem_carousel.addEventListener(
    "touchstart",
    (e) => (sliderTouchStart = e.touches[0].clientX)
);
elem_carousel.addEventListener("touchend", handleTouch);
