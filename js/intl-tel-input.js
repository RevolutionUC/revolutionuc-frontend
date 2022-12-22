var input = document.querySelector("#phoneNumber");
window.iti = window.intlTelInput(input, {
  // any initialisation options go here
  initialCountry: "US",
  utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.min.js"
});
