"use strict";

// DOM Seclection.
const animationElements = document.querySelectorAll(".observable-element");

// Variables.
const animationObserverOps = {
    root: null,
    threshold: 0.2,
};

// Functions.
const showTheElement = function (entries) {
    const [entry] = entries;

    const targetElem = entry.target;

    // Showing the elements.
    targetElem.style.transform = "translateY(0px)";
    targetElem.style.opacity = 1;

    // Deactivacting the observer.
    animationObserver.unobserve(targetElem);
};

// Observer.
const animationObserver = new IntersectionObserver(
    showTheElement,
    animationObserverOps
);

// Applying default Styling to each section and attaching the observer.
animationElements.forEach((elem) => {
    animationObserver.observe(elem);

    elem.style.transform = "translateY(200px)";
    elem.style.opacity = 0;
});
