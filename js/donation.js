const donationForm = document.querySelector(".donation-form");
const donationAmountInputs = document.querySelectorAll('input[name="donation-amount"]');
const customDonationField = document.querySelector(".custom-donation-field");
const customDonationInput = document.querySelector("#custom-donation-amount");

if (donationForm) {
  const isLocalPage =
    window.location.protocol === "file:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  donationForm.action = isLocalPage
    ? donationForm.dataset.localAction || donationForm.action
    : donationForm.dataset.prodAction || donationForm.action;
}

// --- Cloudflare Turnstile ---
const turnstileTokenInput = document.getElementById("turnstile_token");

function onTurnstileSuccess(token) {
  if (turnstileTokenInput) turnstileTokenInput.value = token;
}
function onTurnstileExpired() {
  if (turnstileTokenInput) turnstileTokenInput.value = "";
}
function onTurnstileError() {
  if (turnstileTokenInput) turnstileTokenInput.value = "";
}

if (donationForm) {
  const submitButton = donationForm.querySelector('button[type="submit"]');

  donationForm.addEventListener("submit", (event) => {
    if (!turnstileTokenInput?.value) {
      event.preventDefault();
      alert("Please complete the verification check and try again.");
      return;
    }

    if (donationForm.dataset.submitting === "true") {
      event.preventDefault();
      return;
    }

    donationForm.dataset.submitting = "true";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Processing...";
    }
  });
}

if (donationAmountInputs.length && customDonationField && customDonationInput) {
  const syncCustomAmountState = () => {
    const isOtherSelected = document.querySelector('input[name="donation-amount"]:checked')?.value === "other";

    customDonationInput.disabled = !isOtherSelected;
    customDonationField.classList.toggle("is-active", isOtherSelected);
    customDonationField.classList.toggle("is-disabled", !isOtherSelected);

    if (isOtherSelected) {
      customDonationInput.focus();
      return;
    }

    customDonationInput.value = "";
  };

  donationAmountInputs.forEach((input) => {
    input.addEventListener("change", syncCustomAmountState);
  });

  syncCustomAmountState();
}
