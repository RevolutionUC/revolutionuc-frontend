function currYScrollPos() {
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.body.scrollTop +
      ((document.documentElement && document.documentElement.scrollTop) || 0)
  );
}

// courtesy of https://stackoverflow.com/a/31987330
function scrollTo(to, duration) {
  if (duration <= 0) return;
  var difference = to - currYScrollPos();
  var perTick = difference / duration * 10;

  setTimeout(function() {
    window.scroll(0, currYScrollPos() + perTick);
    if (currYScrollPos() === to) return;
    scrollTo(to, duration - 10);
  }, 10);
}

function scrollChevron() {
  var downChevronLink = document.querySelector(".down-chevron a");
  var header = document.querySelector(".header");
  // Clear out the link to the anchor. We'll handle it.
  downChevronLink.removeAttribute("href");

  document
    .querySelector(".down-chevron a")
    .addEventListener("click", function(e) {
      var contentStart = document.getElementById("main");
      scrollTo(contentStart.offsetTop - header.clientHeight, 250);
    });
}

scroll_chevron_init = false;

if (!scroll_chevron_init) {
  scrollChevron();
  scroll_chevron_init = true;
}
