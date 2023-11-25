"use strict";

// DOM Seclection.
const animationElements = document.querySelectorAll(".observable-element");

// Variables.
const animationObserverOps = {
    root: null,
    threshold: 0.2,
};

// Functions.
const incrementTheStat = function (stat) {
    const endValue = Number.parseInt(stat.dataset.count);
    let currValue = 0;

    const countInterval = setInterval(() => {
        currValue++;

        if (currValue > endValue) {
            clearInterval(countInterval);
        }

        stat.textContent = currValue;
    }, 5);
};

const showTheElement = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    const targetElem = entry.target;

    // If this is the statistics section then increment the counter.
    if (targetElem.id === "statistics") {
        const numbers = targetElem.querySelectorAll(".number");

        numbers.forEach(incrementTheStat);
    }

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

    // If this is the statistics section then increment the counter.
    if (elem.id === "statistics")
        elem.querySelectorAll(".number").forEach((e) => (e.textContent = 0));

    elem.style.transform = "translateY(25%)";
    elem.style.opacity = 0;
});
