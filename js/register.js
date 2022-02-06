registration_init = false;

function getAge(birthDateString) {
  var today = new Date();
  var birthDate = new Date(birthDateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

if (!registration_init) {
  class Registration {
    static init() {
      console.log("Registration::init()");

      this._dataSharingBox = document.querySelector("input[name=dataSharing]");
      this._codeOfConductBox = document.querySelector(
        "input[name=codeOfConduct]",
      );
      this._formElement = document.querySelector("form");
      this._submitButton = document.querySelector("form button[type=submit]");

      this._dataSharingBox.addEventListener(
        "change",
        this._checkChange.bind(this),
      );
      this._codeOfConductBox.addEventListener(
        "change",
        this._checkChange.bind(this),
      );
      this._formElement.addEventListener("submit", this._onSubmit.bind(this));

      this._labels = [
        "firstName",
        "lastName",
        "shirtSize",
        "email",
        "school",
        "schoolOther",
        "country",
        "countryOther",
        "major",
        "dob",
        "phoneNumber",
        "education",
        "gender",
        "resume",
      ];
    }

    static _onSubmit(e) {
      console.log("Registration::_onSubmit");
      e.preventDefault();
      
      // Set the button as disabled and the text to 'Working...'
      this._submitButton.disabled = true;
      this._submitButton.textContent = "Working...";

      var formData = new FormData(this._formElement)

      // Validate data
      if(
        formData.get("firstName") == "" ||
        formData.get("lastName") == "" ||
        formData.get("email") == "" ||
        formData.get("confirmEmail") == "" ||
        formData.get("phoneNumber") == "" ||
        formData.get("school") == "" ||
        formData.get("country") == "" ||
        formData.get("major") == null ||
        formData.get("dob") == "" ||
        formData.get("education") == null ||
        // formData.get("shirtSize") == "" ||
        formData.get("ethnicity") == null ||
        formData.get("gender") == null
      ){
        alert("Please fill in all required fields.");
        this._submitButton.disabled = false;
        this._submitButton.textContent = "Register";
        return;
      }
      
      if(formData.get("email") !== formData.get("confirmEmail")) {
        alert("Emails do not match.");
        this._submitButton.disabled = false;
        this._submitButton.textContent = "Register";
        return;
      }

      if(getAge(formData.get("dob")) < 16) {
        alert("You must at least 16 years old to participate in RevolutionUC.");
        this._submitButton.disabled = false;
        this._submitButton.textContent = "Register";
        return;
      }

      // Show e sign waiver
      var waiverText = document.getElementById('normal-waiver-text');
      var minorWaiverText = document.getElementById('minor-waiver-text');
      var waiverLink = document.getElementById('waiver-link');
      if( getAge(formData.get('dob')) < 18 ) {
        waiverText.style.display = 'none';
        waiverLink.style.display = 'none';
        minorWaiverText.style.display = 'block';
      } else {
        waiverText.style.display = 'block';
        minorWaiverText.style.display = 'none';
      }

      var eSignFormModal = document.getElementById('e-sign-waiver-modal');
      eSignFormModal.style.display = 'block';

      var closeButtons = document.getElementsByClassName('close-e-sign-modal');
      [...closeButtons].forEach( btn=> {
        btn.addEventListener('click', ()=> {
          eSignFormModal.style.display = 'none';
          this._submitButton.disabled = false;
          this._submitButton.textContent = "Register";
        });
      });

      window.onclick = event=> {
        if (event.target == eSignFormModal) {
          eSignFormModal.style.display = 'none';
          this._submitButton.disabled = false;
          this._submitButton.textContent = "Register";
        }
      }

      // Call _submitForm if clicked accept
      var acceptButton = document.getElementById('submit-e-sign');
      acceptButton.onclick = ()=> {
        eSignFormModal.style.display = 'none';
        this._submitForm(formData, true);
      };

    }

    static _submitForm(formData, acceptedWaiver) {
      console.log("Registration::_submitForm");

      let jsonObj = {}
      for (const [key, value] of formData.entries()) {
        jsonObj[key] = value
      }

      let jsonData = {}
      jsonData["firstName"] = jsonObj["firstName"]
      jsonData["lastName"] = jsonObj["lastName"]
      jsonData["email"] = jsonObj["email"]
      jsonData["phoneNumber"] = jsonObj["phoneNumber"]
      jsonData["school"] = jsonObj["school"]
      jsonData["country"] = jsonObj["country"]
      jsonData["major"] = jsonObj["major"]
      jsonData["gender"] = jsonObj["gender"]
      jsonData["ethnicity"] = formData.getAll("ethnicity")
      jsonData["howYouHeard"] = jsonObj["howYouHeard"]
      jsonData["hackathons"] = parseInt(jsonObj["hackathons"])
      // jsonData["shirtSize"] = jsonObj["shirtSize"]
      jsonData["githubUsername"] = jsonObj["githubUsername"]
      jsonData["acceptedWaiver"] = true
      jsonData["dateOfBirth"] = new Date(jsonObj["dob"]).toISOString()
      jsonData["allergens"] = []
      if(jsonObj["vegetarian"] == "on"){jsonData["allergens"].push("Vegetatian")}
      if(jsonObj["vegan"] == "on"){jsonData["allergens"].push("Vegan")}
      if(jsonObj["peanutAllergy"] == "on"){jsonData["allergens"].push("PeanutAllergy")}
      if(jsonObj["glutenFree"] == "on"){jsonData["allergens"].push("GlutenFree")}
      jsonData["otherAllergens"] = jsonObj["otherDietaryRestrictions"]
      jsonData["educationLevel"] = jsonObj["education"]
      jsonData["acceptedWaiver"] = acceptedWaiver

      var regHeaders = new Headers();
      regHeaders.append('Content-Type', 'application/json');
      //regHeaders.append('Accept', 'application/json');
      fetch("http://localhost:3000/api/registrant", {
        method: "POST",
        headers: regHeaders,
        body: JSON.stringify(jsonData), //new FormData(this._formElement),
      }).then(response => {
        const result = this._updateFormUI(null, response);
        if(result) {
          return response.json();
        }
      }).then(data => {
        console.log(data);
        if(data) {
          let form = new FormData();
          form.append("resume", formData.get("resume"));
          this._uploadResume(data, form);
        }
      }).catch(err => {
        // console.error(err);
        this._updateFormUI(err);
      });
    }

    static _uploadResume(data, form) {
      fetch("https://revolutionuc-api.herokuapp.com/api/uploadResume/" + data["uploadKey"], {
        mode: "no-cors",
        method: "POST",
        //headers: regHeaders,
        body: form,
      }).then(response => {
        console.log(response);
        window.location = "/check-email";
      }); 
    }

    static _updateFormUI(err, response) {
      if (err) {
        // Bad news bears
        console.log(err);
        alert("There was an error. Please try refreshing the page, or try using a different email.");
        // Set the button as enabled and the text to 'Register'
        this._submitButton.disabled = false;
        this._submitButton.textContent = "Register";
      } else {
        console.log(`Response status: ${response.status}`);

        if (response.status === 409) {
          alert("'You are already registered. Please check your email for the confirmation link or reach out to us at info@revolutionuc.com ");
          this._submitButton.disabled = false;
          this._submitButton.textContent = "Register";
        } else if (response.status !== 200 && response.status !== 201) {
          alert("There was an error while submission, please check the form for errors, or try again later.");
          // Bad news bears again
          response.json().then(jsonErrors => {
            this._updateLabels(jsonErrors);
          });
          // Set the button as enabled and the text to 'Register'
          this._submitButton.disabled = false;
          this._submitButton.textContent = "Register";
        } else {
          // ...Good news bears
          this._cleanDirtyLabels(this._labels);
          this._removeEmailRegisteredWarning();
          //window.location = "/check-email";
          return true;
        }
      }
    }

    static _updateLabels(jsonErrors) {
      console.log(jsonErrors);

      for (let error of jsonErrors.message) {
        document
          .querySelector(`label[for=${error.split(` `)[0]}]`)
          .classList.add("error");
        if (error.property == "email" && error.msg.includes("registered")) {
          // Email address has already been registered
          this._addEmailRegisteredWarning();
        } else if (error.property == "resume" && error.msg.startsWith("LIMIT")) {
          this._addResumeLimitError();
        }
      }

      // TODO: consider removing this. Results in a
      // prototype dependency that isn't shared across modules
      Array.prototype.diff = function(a) {
        return this.filter(function(i) {
          return a.indexOf(i) < 0;
        });
      };

      this._cleanDirtyLabels(
        this._labels.diff(jsonErrors.message.map(elem => elem.split(` `)[0])),
      );
    }

    static _cleanDirtyLabels(labelsArray) {
      let labelElement;
      for (let label of labelsArray) {
        labelElement = document.querySelector(`label[for=${label}]`);
        labelElement?.classList.remove("error");
        if (label == "email" && labelElement.innerText.includes("registered")) {
          this._removeEmailRegisteredWarning();
        } else if (label == "resume") {
          this._removeResumeLimitError();
        }
      }
    }

    static _addEmailRegisteredWarning() {
      const emailLabel = document.querySelector("label[for=email]");
      if (!emailLabel.innerText.includes("registered")) {
        emailLabel.innerText = "Email has already been registered";
      }
    }

    static _removeEmailRegisteredWarning() {
      const emailLabel = document.querySelector("label[for=email]");
      if (emailLabel.innerText.toLowerCase().includes("registered")) {
        emailLabel.innerText = "Email*";
      }
    }

    static _addResumeLimitError() {
      const resumeLabel = document.querySelector("label[for=resume]");
      if (!resumeLabel.innerText.includes("limit")) {
        resumeLabel.innerText = "20 MB Size Limit";
      }
    }

    static _removeResumeLimitError() {
      const resumeLabel = document.querySelector("label[for=resume]");
      if (resumeLabel.innerText.includes("limit")) {
        resumeLabel.innerText = "resume*";
      }
    }

    static _checkChange() {
      if (this._codeOfConductBox.checked && this._dataSharingBox.checked) {
        this._submitButton.disabled = false;
      } else {
        this._submitButton.disabled = true;
      }
    }
  }

  Registration.init();
  registration_init = true;
}
