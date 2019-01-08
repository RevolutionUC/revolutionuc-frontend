registration_init = false;

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
      jsonData["major"] = jsonObj["major"]
      jsonData["gender"] = jsonObj["gender"]
      jsonData["ethnicity"] = jsonObj["ethnicity"]
      jsonData["howYouHeard"] = jsonObj["howYouHeard"]
      jsonData["hackathons"] = parseInt(jsonObj["hackathons"])
      jsonData["shirtSize"] = jsonObj["shirtSize"]
      jsonData["githubUsername"] = jsonObj["githubUsername"]
      jsonData["dateOfBirth"] = new Date(jsonObj["dob"]).toISOString()
      jsonData["allergens"] = []
      if(jsonObj["vegetarian"] == "on"){jsonData["allergens"].push("Vegetatian")}
      if(jsonObj["vegan"] == "on"){jsonData["allergens"].push("Vegan")}
      if(jsonObj["peanutAllergy"] == "on"){jsonData["allergens"].push("PeanutAllergy")}
      if(jsonObj["glutenFree"] == "on"){jsonData["allergens"].push("GlutenFree")}
      jsonData["otherAllergens"] = jsonObj["otherDietaryRestrictions"]
      jsonData["educationLevel"] = jsonObj["education"]

      var regHeaders = new Headers();
      regHeaders.append('Content-Type', 'application/json');
      //regHeaders.append('Accept', 'application/json');
      var uploadKey = ""

      fetch("https://revolutionuc-api.herokuapp.com/api/registrant", {
        method: "POST",
        headers: regHeaders,
        body: JSON.stringify(jsonData), //new FormData(this._formElement),
      }).then(response => {
        this._updateFormUI(response);
        return response.json();
      }).then(data => {
        console.log(data);
        let form = new FormData();
        form.append("resume", formData.get("resume"));
        this._uploadResume(data, form)
      });
    }

    static _uploadResume(data, form) {
      fetch("https://revolutionuc-api.herokuapp.com/api/uploadResume/" + data["uploadKey"], {
        method: "POST",
        //headers: regHeaders,
        body: form,
      }).then(response => {
        console.log(response);
        window.location = "/check-email";
      });
    }

    static _updateFormUI(response) {
      console.log(`Response status: ${response.status}`);
      if (response.status != 200 && response.status != 201) {
        // Bad news bears
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
        console.log(response);
        //window.location = "/check-email";
      }
    }

    static _updateLabels(jsonErrors) {
      for (let error of jsonErrors) {
        document
          .querySelector(`label[for=${error.param}]`)
          .classList.add("error");
        if (error.param == "email" && error.msg.includes("registered")) {
          // Email address has already been registered
          this._addEmailRegisteredWarning();
        } else if (error.param == "resume" && error.msg.startsWith("LIMIT")) {
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
        this._labels.diff(jsonErrors.map(elem => elem.param)),
      );
    }

    static _cleanDirtyLabels(labelsArray) {
      let labelElement;
      for (let label of labelsArray) {
        labelElement = document.querySelector(`label[for=${label}]`);
        labelElement.classList.remove("error");
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
