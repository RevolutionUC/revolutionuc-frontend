const submitSuccess = document.querySelector('.submit-success')
const submitError = document.querySelector('.submit-error')

const handleSubmit = (e) => {
  e.preventDefault();
  let myForm = document.getElementById("email-notification");
  let formData = new FormData(myForm);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })

    .then(() => { submitSuccess.style.display = 'block'; submitError.style.display = null; })
    .catch((error) => { submitError.style.display = 'block'; submitSuccess.style.display = null; });
};
document
  .querySelector("form")
  .addEventListener("submit", handleSubmit);
