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
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const btnSubmit = document.querySelector(".btn-submit");
const inputs = document.querySelectorAll("form input:not(.btn-submit)");
const radioButtons = document.querySelectorAll('input[name="location"]');
const mandatoryRadio = document.getElementById("checkbox1");

/* ========== MODAL EVENT ========== */

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// close modal event 
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  if (modalbg.style.display === "block") {
    modalbg.style.display = "none";
  }
}

/* ========== CHECKFORM ========== */

// Checking the value of different inputs
function validation(input) {
  switch(input.id) {
    case "first":
      if (input.value.length >= 0 && input.value.length < 2) {
        formData[0].setAttribute("data-error-visible", "true");
        formData[0].setAttribute("data-error", "Veuillez saisir au minimum 2 caractères");
      } else {
        formData[0].setAttribute("data-error-visible", "false");
        formData[0].setAttribute("data-error", "");
      }
      break;
    case "last":
      if (input.value.length >= 0 && input.value.length < 2) {
        formData[1].setAttribute("data-error-visible", "true");
        formData[1].setAttribute("data-error", "Veuillez saisir au minimum 2 caractères");
      } else {
        formData[1].setAttribute("data-error-visible", "false");
        formData[1].setAttribute("data-error", "");
      }
      break;
    case "email":
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i; 
      if (!input.value.match(emailRegex)) { 
        formData[2].setAttribute("data-error-visible", "true");
        formData[2].setAttribute("data-error", "Veuillez saisir une adresse email valide");
      } else {
        formData[2].setAttribute("data-error-visible", "false");
        formData[2].setAttribute("data-error", "");
      }
      break;
    case "birthdate":
      const birthdateRegex = /^\d{4}\-\d{1,2}\-\d{1,2}$/; 
      if (!input.value.match(birthdateRegex)) { 
        formData[3].setAttribute("data-error-visible", "true");
        formData[3].setAttribute("data-error", "Veuillez indiquer votre date de naissance");
      } else {
        formData[3].setAttribute("data-error-visible", "false");
        formData[3].setAttribute("data-error", "");
      }
      break;    
    case "quantity":
      const quantityRegex = /^[0-9]+$/;
      if (!input.value.match(quantityRegex)) {
        formData[4].setAttribute("data-error-visible", "true");
        formData[4].setAttribute("data-error", "Veuillez indiquer le nombre de tournois");
      } else {
        formData[4].setAttribute("data-error-visible", "false");
        formData[4].setAttribute("data-error", "");
      }
      break;
  }   
}

// Function checking if one city is selected
function radioCheck() {
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      formData[5].setAttribute("data-error-visible", "false");
      formData[5].setAttribute("data-error", "");
      break;
    } else {
    formData[5].setAttribute("data-error-visible", "true");
    formData[5].setAttribute("data-error", "Veuillez sélectionner la ville de votre choix");
    }
  }
} 

// Checking if the terms of use are read and accepted
function checkMandatoryRadio() {
  if (mandatoryRadio.checked) {
    formData[6].setAttribute("data-error-visible", "false");
    formData[6].setAttribute("data-error", "");
  } else {
    formData[6].setAttribute("data-error-visible", "true");
    formData[6].setAttribute("data-error", "Veuillez lire et accepter les conditions d'utilisation");
  }
}

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  inputs.forEach(input => validation(input));
  radioCheck();
  checkMandatoryRadio();  
})

// 21 Pourquoi ('input[id="location1"]:checked'); différent avec des " " et ' ' ?
// 98 for (const radioButton of radioButtons) {
   //   if (radioButton.checked)  ==> why is that not working?