/* ========== NAVBAR ========== */

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/* ========== DOM ========== */

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalForm = document.getElementById("modal-form");
const modalBtn = document.querySelectorAll(".modal-btn");
const thankYouModal = document.getElementById("thank-you");
const formData = document.querySelectorAll(".formData");
const closeX = document.querySelectorAll(".close");
const btnClose = document.querySelectorAll(".btn-close");
const btnSubmit = document.querySelector(".btn-submit");
const inputs = document.querySelectorAll("form input:not(.btn-submit)");
const radioButtons = document.querySelectorAll('input[name="location"]');
const mandatoryRadio = document.getElementById("checkbox1");

/* ========== MODAL EVENT ========== */

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event 
closeX.forEach((btn) => btn.addEventListener("click", closeModal));
btnClose.forEach((btn) => btn.addEventListener("click", closeModal));


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modalForm.style.display = "block";
  thankYouModal.style.display = "none";
}
// close modal form
function closeModal() {
    modalbg.style.display = "none";
    thankYouModal.style.display = "none";
  }

/* ========== CHECKFORM ========== */

let globalFormCount = 0;

// Checking the value of different inputs
function validation(input) {
  switch(input.id) {
    case "first":
      const first = document.getElementById("first");
      if (input.value.length >= 0 && input.value.length < 2) {
        first.closest(".formData").setAttribute("data-error-visible", "true");
        first.closest(".formData").setAttribute("data-error", "Veuillez saisir au minimum 2 caractères");
      } else {
        first.closest(".formData").setAttribute("data-error-visible", "false");
        first.closest(".formData").setAttribute("data-error", "");
        globalFormCount += 1;
      }
      break;
    case "last":
      const last = document.getElementById("last");
      if (input.value.length >= 0 && input.value.length < 2) {
        last.closest(".formData").setAttribute("data-error-visible", "true");
        last.closest(".formData").setAttribute("data-error", "Veuillez saisir au minimum 2 caractères");
      } else {
        last.closest(".formData").setAttribute("data-error-visible", "false");
        last.closest(".formData").setAttribute("data-error", "");
        globalFormCount += 1;
      }
      break;
    case "email":
      const email = document.getElementById("email");
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i; 
      if (!input.value.match(emailRegex)) { 
        email.closest(".formData").setAttribute("data-error-visible", "true");
        email.closest(".formData").setAttribute("data-error", "Veuillez saisir une adresse email valide");
      } else {
        email.closest(".formData").setAttribute("data-error-visible", "false");
        email.closest(".formData").setAttribute("data-error", "");
        globalFormCount += 1;
      }
      break;
    case "birthdate":
      const birthdate = document.getElementById("birthdate");
      const birthdateRegex = /^\d{4}\-\d{1,2}\-\d{1,2}$/; 
      if (!input.value.match(birthdateRegex)) { 
        birthdate.closest(".formData").setAttribute("data-error-visible", "true");
        birthdate.closest(".formData").setAttribute("data-error", "Veuillez indiquer votre date de naissance");
      } else {
        birthdate.closest(".formData").setAttribute("data-error-visible", "false");
        birthdate.closest(".formData").setAttribute("data-error", "");
        globalFormCount += 1;
      }
      break;    
    case "quantity":
      const quantity = document.getElementById("quantity");
      const quantityRegex = /^[0-9]+$/;
      if (!input.value.match(quantityRegex)) {
        quantity.closest(".formData").setAttribute("data-error-visible", "true");
        quantity.closest(".formData").setAttribute("data-error", "Veuillez indiquer le nombre de tournois");
      } else {
        quantity.closest(".formData").setAttribute("data-error-visible", "false");
        quantity.closest(".formData").setAttribute("data-error", "");
        globalFormCount += 1;
      }
      break;
    default:
      break;
  }   
}

// Function checking if one city is selected
function radioCheck() {
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      radioButtons[i].closest(".formData").setAttribute("data-error-visible", "false");
      radioButtons[i].closest(".formData").setAttribute("data-error", "");
      globalFormCount += 1;
      break;
    } else {
    radioButtons[i].closest(".formData").setAttribute("data-error-visible", "true");
    radioButtons[i].closest(".formData").setAttribute("data-error", "Veuillez sélectionner la ville de votre choix");
    }
  }
} 

// Checking if the terms of use are read and accepted
function checkMandatoryRadio() {
  if (mandatoryRadio.checked) {
    mandatoryRadio.closest(".formData").setAttribute("data-error-visible", "false");
    mandatoryRadio.closest(".formData").setAttribute("data-error", "");
    globalFormCount += 1;
  } else {
    mandatoryRadio.closest(".formData").setAttribute("data-error-visible", "true");
    mandatoryRadio.closest(".formData").setAttribute("data-error", "Veuillez lire et accepter les conditions d'utilisation");
  }
}

// Final verification to check if all inputs are valid, then display the thank you message
function allInputsAreValid() {
  if (globalFormCount === formData.length) {
    modalForm.style.display = "none";
    thankYouModal.style.display = "flex";
    modalForm.reset();
  } else {
    globalFormCount = 0;
  }
}

// Fires all previous function when the form is submitted
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  inputs.forEach(input => validation(input));
  radioCheck();
  checkMandatoryRadio();  
  allInputsAreValid();
})
