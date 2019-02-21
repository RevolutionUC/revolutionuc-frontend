function initProgressBar(start, end) {
  var elem = document.getElementById("barForeground");
  var text = document.getElementById("countdownText");

  var width = 100;

  var startDate = new Date(start); // new Date("2019/02/02 20:25:00");
  var endDate = new Date(end); // new Date("2019/03/02 20:25:00");

  var now = new Date();
  var bigDif = endDate.getTime() - startDate.getTime();
  var dif = endDate.getTime() - now.getTime();

  var one_day = 1000 * 60 * 60 * 24;
  var textContent =
    Math.ceil((endDate.getTime() - now.getTime()) / one_day) +
    " days left until RevolutionUC!";

  var t = bigDif / 100;

  var startFill = dif / t;

  document.getElementById("countdownText").innerHTML = textContent;

  var id = setInterval(frame, t);

  elem.style.width = startFill + "%";
  console.log("test");

  function frame() {
    if (width <= 0) {
      clearInterval(id);
      console.log("frame2: " + width);
    } else {
      width--;
      elem.style.width = width + "%";
      //text.content = t;
      console.log("frame: " + width);
    }
  }
}

initProgressBar("2019/02/02 00:00:00", "2019/03/02 00:00:00");
