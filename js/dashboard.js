class Dashboard {
  static init() {
  console.log("Dashboard::init()");
    //this.registrationBaseURL = "http://localhost:8080/registration";
    this.registrationBaseURL = "https://api.revolutionuc.com/registration";
    this.apiKeyElement = document.querySelector("#apiKey");
    this.individualEmailElement = document.querySelector("#individualEmail");
  }

  static fetchRegistrants() {
    fetch(`${this.registrationBaseURL}/all?key=${this.apiKeyElement.value}`)
      .then(res => res.json())
      .then(data => {
        if ($.fn.DataTable.isDataTable("table")) $("table").DataTable().clear().destroy();
        $("table").DataTable({
          data: data,
          columns: [
            {"data": "email", title: "Email"},
            {"data": "emailVerified", title: "Verified"},
            {"data": "waitList", title: "Waitlisted"},
            {"data": "attendanceConfirmed", title: "Attending"},
            {"data": "checkedIn", title: "Checked-In"},
          ]
        });
      });
  }

  static sendWaitlistEmail() {
    fetch(`${this.registrationBaseURL}/sendConfirmation?key=${this.apiKeyElement.value}`);
  }

  static sendConfirmationIndividual() {
    fetch(`${this.registrationBaseURL}/sendConfirmationIndividual?key=${this.apiKeyElement.value}&userEmail=${this.individualEmailElement.value}`);
  }

  static sendConfirmationSittingDucks() {
    fetch(`${this.registrationBaseURL}/sendConfirmationToSittingDucks?key=${this.apiKeyElement.value}&userEmail=${this.individualEmailElement.value}`);
  }

  static sendConfirmationWaitlisted() {
    fetch(`${this.registrationBaseURL}/sendConfirmationToWaitlisted?key=${this.apiKeyElement.value}&userEmail=${this.individualEmailElement.value}`);
  }

  static checkIn() {
    fetch(`${this.registrationBaseURL}/checkIn?key=${this.apiKeyElement.value}&userEmail=${this.individualEmailElement.value}`);
  }
};

Dashboard.init();
