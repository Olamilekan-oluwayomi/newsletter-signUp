emailjs.init("Fsw7NmZ2VdBAUrwn3");

// The two main views
const signupCard = document.querySelector(".newsletter-card__signup");
const successModal = document.querySelector(".success-modal");

// Form elements
const signupForm = document.querySelector(".newsletter-card__form");
const emailInput = document.getElementById("email");
const errorMessage = document.querySelector(".newsletter-card__error-message");

// Success message dynamic parts
const submittedEmail = successModal.querySelector("em");
const dismissBtn = document.querySelector(".success-modal__button");

// Helper function for email validation
function validateEmail(email) {
  // This regex requires at least 2 characters after the dot (e.g., .co, .com)
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(String(email).toLowerCase());
}

emailInput.addEventListener("input", () => {
  const emailValue = emailInput.value.trim();

  if (validateEmail(emailValue)) {
    // Turn green immediately
    emailInput.classList.add("success");

    // Hide error message if it was showing
    errorMessage.classList.add("hidden");
    emailInput.classList.remove("newsletter-card__input--error");
  } else {
    // Remove green if they delete a character and it becomes invalid
    emailInput.classList.remove("success");
  }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailValue = emailInput.value.trim();

  if (validateEmail(emailValue)) {
    emailjs
      .send("service_l98ahv9", "template_kts4tec", {
        to_email: emailValue,
      })
      .then(() => {
        // Email sent successfully — now show the modal
        submittedEmail.textContent = emailValue;
        signupCard.classList.add("hidden");
        successModal.classList.remove("hidden");
        emailInput.classList.remove("newsletter-card__input--error");
        errorMessage.classList.add("hidden");
      })
      .catch((error) => {
        // Email failed — tell the user something went wrong
        console.error(error);
        errorMessage.textContent = "Something went wrong. Please try again.";
        errorMessage.classList.remove("hidden");
      });
  } else {
    emailInput.classList.add("newsletter-card__input--error");
    errorMessage.classList.remove("hidden");
  }
});

dismissBtn.addEventListener("click", () => {
  // Reset to initial state
  emailInput.value = "";
  signupCard.classList.remove("hidden");
  successModal.classList.add("hidden");
  emailInput.classList.remove("success");
});
