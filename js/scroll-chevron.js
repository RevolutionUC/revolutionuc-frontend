// courtesy of https://stackoverflow.com/a/31987330
function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

function scrollChevron() {
  var downChevronLink = document.querySelector(".down-chevron a");
  var header = document.querySelector(".header");
  downChevronLink.removeAttribute("href"); // Clear out the link to the anchor. We'll handle it.

  document
    .querySelector(".down-chevron a")
    .addEventListener("click", function(e) {
      var contentStart = document.getElementById("main");
      scrollTo(
        document.documentElement,
        contentStart.offsetTop - header.clientHeight,
        250,
      );
    });
}

document.addEventListener("turbolinks:load", function() {
  scrollChevron();
});
