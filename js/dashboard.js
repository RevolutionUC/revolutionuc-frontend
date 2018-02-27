class Dashboard {
  static init() {
  console.log("Dashboard::init()");
    this.baseURL = "https://api.revolutionuc.com";
    this.emailBaseURL = `${this.baseURL}/email`;
    this.registrationBaseURL = `${this.baseURL}/registration`;
    this.apiKeyElement = document.querySelector("#apiKey");
    this.individualEmailConfirmation = document.querySelector("#individualEmailConfirmation");
    this.individualEmailCheckIn = document.querySelector("#individualEmailCheckIn");
  }

  static fetchRegistrants() {
    fetch(`${this.registrationBaseURL}/all?key=${this.apiKeyElement.value}`)
      .then(res => res.json())
      .then(data => {
        if ($.fn.DataTable.isDataTable("table")) $("table").DataTable().clear().destroy();
        $("table").DataTable({
          data: data,
          columns: [
            {"data": "firstName", title: "First Name"},
            {"data": "lastName", title: "Last Name"},
            {"data": "email", title: "Email"},
            {"data": "emailVerified", title: "Verified"},
            {"data": "waitList", title: "Waitlisted"},
            {"data": "attendanceConfirmed", title: "Attending"},
            {"data": "checkedIn", title: "Checked-In"},
          ]
        });
      });
  }

  static sendConfirmation() {
    fetch(`${this.emailBaseURL}/sendConfirmation?key=${this.apiKeyElement.value}`);
  }

  static sendConfirmationToIndividual() {
    fetch(`${this.emailBaseURL}/sendConfirmationToIndividual?key=${this.apiKeyElement.value}&userEmail=${this.individualEmailConfirmation.value}`);
  }

  static sendConfirmationSittingDucks() {
    fetch(`${this.emailBaseURL}/sendConfirmationToSittingDucks?key=${this.apiKeyElement.value}`);
  }

  static sendConfirmationWaitlisted() {
    fetch(`${this.emailBaseURL}/sendConfirmationToWaitlisted?key=${this.apiKeyElement.value}`);
  }

  static checkIn() {
    fetch(`${this.registrationBaseURL}/checkIn?key=${this.apiKeyElement.value}&userEmail=${this.individualEmailCheckIn.value}`);
  }
};

Dashboard.init();
