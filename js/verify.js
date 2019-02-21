function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}

function getUrlParam(parameter, defaultvalue) {
  var urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
}

if (window.location.href.indexOf("verify") > -1) {
  var user = getUrlParam("user", "none");
  var h1 = document.getElementsByTagName("h1")[1];
  var content = document.getElementsByName("textValue")[0];

  if (user == "none") {
  } else {
    document.title = "Verify";
    h1.textContent = "Registration Verified";
    content.textContent =
      "Congratulations!  You are registered for RevolutionUC!";

    fetch("https://revolutionuc-api.herokuapp.com/api/verify/" + user, {
      method: "POST"
    }).then(response => {
      if (response.status == 200 || response.status == 201) {
      } else {
        h1.textContent = "Error";
        content.textContent =
          "There was a problem verifying your registration.  Please contact us at info@revolutionuc.com.";
      }
    });
  }
}

if (window.location.href.indexOf("attendance") > -1) {
  var confirm = getUrlParam("confirm", "none");
  var id = getUrlParam("id", "none");
  var h1 = document.getElementsByTagName("h1")[1];
  var content = document.getElementsByName("textValue")[0];

  if (confirm == "none" || id == "none") {
  } else {
    document.title = "Confirm Attendance";
    h1.textContent = "Attendance Confirmed";
    if (confirm == 'true') {
      content.textContent = "Thank You!  You have confirmed your attendance to RevolutionUC 2019!";
    } else if (confirm == 'false') {
      content.textContent = "Thank You!  You have confirmed that you will NOT be attending RevolutionUC 2019.";
    }
    
    var regHeaders = new Headers();
    regHeaders.append('Content-Type', 'application/json');

    let jsonData = {};
    jsonData["uuid"] = id;
    jsonData["isConfirmed"] = (confirm == 'true') ;

    fetch(
      "https://revolutionuc-api.herokuapp.com/api/confirmAttendance/",
      {
        method: "POST",
        headers: regHeaders,
        body: JSON.stringify(jsonData),
      }
    ).then(response => {
      if (response.status == 200 || response.status == 201) {
      } else {
        h1.textContent = "Error";
        content.textContent =
          "There was a problem confirming your attendance.  Please contact us at info@revolutionuc.com.";
      }
    });
  }
}
