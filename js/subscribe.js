subscription_init = false;

if (!subscription_init) {
  class Subscription {
    static init() {
      console.log(`Subscription::init()`);

      this._formElement = document.querySelector(`#email-notification`);
      this._submitButton = document.querySelector(`#email-notification button[type=submit]`);

      this._formElement.addEventListener(`submit`, this._onSubmit.bind(this));
    }

    static _onSubmit(e) {
      console.log(`Subscription::_onSubmit`);
      e.preventDefault();

      // Set the button as disabled and the text to `Working...`
      this._submitButton.disabled = true;
      this._submitButton.textContent = `Working...`;

      const email = this._formElement.emailAddress.value;

      // Send the information to a Flow automation webhook
      fetch(
        `https://prod-06.westus.logic.azure.com:443/workflows/08813ff34da44c4aa1c23da3d7e6d5e5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ODMZIKUDa9xBxV0LRPimnRy7Ph5mxcPHUxrn8MM_4ko`,
        {
          method: `POST`,
          body: JSON.stringify({ email }),
          headers: { 'Content-Type': `application/json` }
        }
      ).then(response => {
        this._updateFormUI(null, response);
      }).catch(error => {
        this._updateFormUI(error);
      });
    }

    static _updateFormUI(error, response) {
      if (error || response.status != 202) {
        alert(`There was an error. Please try refreshing the page or try again later.`);
      } else {
        this._formElement.emailAddress.value = ``;
        alert(`You have been added to the mailing list.`);
      }

      this._submitButton.disabled = false;
      this._submitButton.textContent = `Notify me`;
    }
  }

  Subscription.init();
  subscription_init = true;
}