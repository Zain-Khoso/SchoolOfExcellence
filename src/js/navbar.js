"use strict";

// Elem Selections.
const elem_Navbar = document.getElementById("navbar");
const elem_Hero = document.getElementById("hero");
const elem_DropdownTriggers = [
    ...document.querySelectorAll(".dropdown-toggle"),
];
const elem_offcanvas = document.querySelector(".offcanvas");
const elem_offcanvasBlanket = document.querySelector(".offcanvas-blanket");
const elem_offcanvasTriggers = document.querySelectorAll(".offcanvas-trigger");

// Variables.
const observerOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${elem_Navbar.getBoundingClientRect().height}px`,
};

// Functions.
const toggleNavbar = function (entries) {
    const [entry] = entries;

    entry.isIntersecting
        ? elem_Navbar.classList.remove("sticky-navbar")
        : elem_Navbar.classList.add("sticky-navbar");
};

const hideDropdown = function (event) {
    if (this.dropdownComponents.includes(event.target)) return;

    this.dropdownComponents[1].classList.remove("active");

    document.body.removeEventListener("mouseover", hideDropdown);
};

const toggleOffcanvas = function () {
    elem_offcanvas.classList.toggle("offcanvas-active");
    elem_offcanvasBlanket.classList.toggle("offcanvas-blanket-active");
};

// Observer.
const observer = new IntersectionObserver(toggleNavbar, observerOptions);
observer.observe(elem_Hero);

// Event Listeners.
elem_Navbar.addEventListener("mouseover", function (event) {
    if (!elem_DropdownTriggers.includes(event.target)) return;

    const targetSubnav = event.target.nextElementSibling;
    const dropdownComponents = [
        event.target,
        targetSubnav,
        ...targetSubnav.querySelectorAll(".nav-link"),
    ];

    targetSubnav.classList.add("active");

    // Event Listener to close the dropdown.
    document.body.addEventListener(
        "mouseover",
        hideDropdown.bind({ dropdownComponents: dropdownComponents })
    );
});
elem_offcanvasTriggers.forEach((elem) => {
    elem.addEventListener("click", toggleOffcanvas);
});
elem_offcanvasBlanket.addEventListener("click", toggleOffcanvas);
