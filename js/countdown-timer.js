function initProgressBar(start, end, time = "day") {
  var elem = document.getElementById("barForeground");
  var back = document.getElementById("barBackground");
  var text = document.getElementById("countdownText");

  var width = 100;

  var startDate = new Date(start); // new Date("2019/02/02 20:25:00");
  var endDate = new Date(end); // new Date("2019/03/02 20:25:00");

  var now = new Date(); // "2019/03/02 20:25:00"
  if (now.getTime() < startDate.getTime()) {
    elem.style.display = 'none';
    back.style.display = 'none';
    text.style.display = 'none';
    return;
  } else if (now.getTime() > endDate.getTime()) {
    elem.style.width = '0%';
    document.getElementById("countdownText").innerHTML = "Stop Hacking!"
    return;
  }
  var bigDif = endDate.getTime() - startDate.getTime();
  var dif = endDate.getTime() - now.getTime();

  var one_day = 1000 * 60 * 60 * 24;
  var one_hour = 1000 * 60 * 60;
  var one_minute = 1000 * 60;
  var one_second = 1000;
  var textContent = getTimeRemaining();

  var t = bigDif / 100;

  var startFill = dif / t;

  try {
    document.getElementById("countdownText").innerHTML = textContent;
  } catch (error) {}

  var id = setInterval(frame, t);

  elem.style.width = startFill + "%";
  console.log("test");

  function frame() {
    if (width <= 0) {
      clearInterval(id);
      console.log("width: " + width);
    } else {
      width--;
      elem.style.width = width + "%";
      //text.content = t;
      try {
        document.getElementById("countdownText").innerHTML = width;
      } catch (error) {}
      console.log("width: " + width);
    }
  }

  var id2 = setInterval( function () {
    var textContent = getTimeRemaining(time, endDate);
    
    document.getElementById("countdownText").innerHTML = textContent;
  }, 1000)

  function getTimeRemaining() {
    var now = new Date();
      var textContent = 0;
      if (time == "day") {
        var daysNum = Math.ceil((endDate.getTime() - now.getTime()) / one_day);
        var daysStr = (daysNum == 1 ? " day " : " days ")
        textContent = daysNum + daysStr + "left until RevolutionUC!";
        console.log("day");
      } else if (time == "hour") {
        var hoursNum = Math.floor(((endDate.getTime() - now.getTime()) % one_day) / one_hour);
        var tempdd = Math.floor(((endDate.getTime() - now.getTime()) % one_day) / one_hour);
        var hoursStr = (hoursNum == 1 ? " hour " : " hours ");
        var minNum = Math.floor(((endDate.getTime() - now.getTime()) % one_hour) / one_minute);
        var minStr = (minStr == 1 ? " minute " : " minutes ");
        var secNum = Math.floor(((endDate.getTime() - now.getTime()) % one_minute) / one_second);
        var secStr = (minStr == 1 ? " second " : " seconds ");
        textContent = hoursNum + hoursStr + " " + minNum + minStr + + " " + secNum + secStr + "until hacking ends!";
        if (secNum <= 0) {textContent = "Stop Hacking!"}
        console.log("hour");
      }
      return textContent;
  }
}
