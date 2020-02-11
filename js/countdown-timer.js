function initProgressBar(start, end, time = "day") {
  var barForeground = document.getElementById("barForeground");
  var barBackground = document.getElementById("barBackground");
  var countdownText = document.getElementById("countdownText");
  var startDate = new Date(start);
  var endDate = new Date(end);
  var now = new Date();


  if (now.getTime() < startDate.getTime()) {
    barForeground.style.display = 'none';
    barBackground.style.display = 'none';
    countdownText.style.display = 'none';
    return;
  } else if (now.getTime() > endDate.getTime()) {
    barForeground.style.width = '0%';
    countdownText.innerHTML = "Stop Hacking!";
    return;
  }


  var bigDif = endDate.getTime() - startDate.getTime();
  var dif = endDate.getTime() - now.getTime();
  var width = 100;
  var t = bigDif / 100;
  var startFill = dif / t;
  width = Math.floor(startFill);
  barForeground.style.width = width + "%";


  function frame() {
    var now = new Date();
    var timeRemaining = endDate.getTime() - now.getTime();
    var percentFill = timeRemaining / t;
    if (width <= 0) {
      clearInterval(id);
      barForeground.style.width = 0 + "%";
    } else {
      width = percentFill;

      if (barForeground.clientWidth <= 40 ) {
        barForeground.style.width = 40 + "px";
      } else {
        barForeground.style.width = width + "%";
      }
    }
  }
  var textContent = getTimeRemaining();
  try {
    countdownText.innerHTML = textContent;
  } catch (error) {}
  var id = setInterval(frame, 1000);
  var id2 = setInterval( function () {
    var textContent = getTimeRemaining();
    countdownText.innerHTML = textContent
  }, 1000)


  var one_day = 1000 * 60 * 60 * 24;
  var one_hour = 1000 * 60 * 60;
  var one_minute = 1000 * 60;
  var one_second = 1000;
  function getTimeRemaining() {
    var now = new Date();
    var textContent = 0;
    if (time == "day") {
      var daysNum = Math.ceil((endDate.getTime() - now.getTime()) / one_day);
      var daysStr = (daysNum == 1 ? " day " : " days ")
      textContent = daysNum + daysStr + "left until RevolutionUC!";
    } else if (time == "hour") {
      var hoursNum = Math.floor(((endDate.getTime() - now.getTime()) % one_day) / one_hour);
      var tempdd = Math.floor(((endDate.getTime() - now.getTime()) % one_day) / one_hour);
      var hoursStr = (hoursNum == 1 ? " hour " : " hours ");
      var minNum = Math.floor(((endDate.getTime() - now.getTime()) % one_hour) / one_minute);
      var minStr = (minNum == 1 ? " minute " : " minutes ");
      var secNum = Math.floor(((endDate.getTime() - now.getTime()) % one_minute) / one_second);
      var secStr = (secNum == 1 ? " second " : " seconds ");
      textContent = hoursNum + hoursStr + " " + minNum + minStr + + " " + secNum + secStr + "until hacking ends!";
      if (secNum < 0) {textContent = "Stop Hacking!"}
    }
    return textContent;
  }
}
