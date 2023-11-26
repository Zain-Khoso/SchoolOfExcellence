"use strict";

import emailjs from "@emailjs/browser";

// DOM Selections.
const elem_form = document.querySelector(".contact-section");

// // Functions.
// const sendEmail = function (event) {
//     event.preventDefault();

//     emailjs.sendForm(
//         "contact_service",
//         "contact_form",
//         this,
//         "0-AyLKyEwxZwIq1Gi"
//     );
// };

// Event Listeners.
elem_form.addEventListener("submit", sendEmail);
