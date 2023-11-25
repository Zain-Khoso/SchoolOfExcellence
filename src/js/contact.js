"use strict";

// Initializing EmailJs.
emailjs.init("0-AyLKyEwxZwIq1Gi");

// DOM Selections.
const elem_form = document.querySelector(".contact-section");

// Functions.
const sendEmail = function (event) {
    event.preventDefault();

    emailjs.sendForm("contact_service", "contact_form", this);
};

// Event Listeners.
elem_form.addEventListener("submit", sendEmail);
