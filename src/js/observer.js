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

    if (!entry.isIntersecting) return;

    const targetElem = entry.target;

    // Showing the elements.
    targetElem.style.transform = "translateY(0px)";
    targetElem.style.opacity = 1;

    // Deleting the observer for current element.
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

    elem.style.transform = "translateY(25%)";
    elem.style.opacity = 0;
});
