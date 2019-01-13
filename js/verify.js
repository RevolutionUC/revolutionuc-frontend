function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

var user = getUrlParam('user', 'none');
var h1 = document.getElementsByTagName("h1")[1];
var content = document.getElementsByName("textValue")[0];


if(user == 'none'){}
else{
    document.title = 'Verify';
    h1.textContent = 'Registration Verified';
    content.textContent = 'Congratulations!  You are registered for RevolutionUC!'

    fetch("https://revolutionuc-api.herokuapp.com/api/verify/" + user, {
        method: "POST"
      }).then(response => {
        if (response.status == 200  || response.status == 201){

        }else {
            content.textContent = "There was a problem verifying your registration.  Please contact us at info@revolutionuc.com."
        }
      });
}