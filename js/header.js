function header() {
  function addClassTo(el, className) {
    el.className += " " + className;
  }

  function removeClassFrom(el, className) {
    el.className = el.className.replace(" " + className, "");
  }

  var last_known_scroll_position = window.scrollY;
  var ticking = false;
  var header = document.querySelector(".header");
  var headerHeight = header.clientHeight;
  var transition_height =
    document.querySelector(".hero").getBoundingClientRect().top +
    window.scrollY -
    headerHeight;

  function checkScroll(last_known_scroll_position) {
    var el = document.querySelector(".header");
    if (
      last_known_scroll_position >= transition_height &&
      el.classList.contains("no-bg-header")
    ) {
      removeClassFrom(el, "no-bg-header");
      window.setTimeout(function() {
        ticking = false;
      }, 100);
    } else if (
      last_known_scroll_position < transition_height &&
      !el.classList.contains("no-bg-header")
    ) {
      addClassTo(el, "no-bg-header");
      window.setTimeout(function() {
        ticking = false;
      }, 100);
    } else {
      ticking = false;
    }
  }

  // Throttling based on MDN recommendation @
  // https://developer.mozilla.org/en-US/docs/Web/Events/scroll
  window.addEventListener("scroll", function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        checkScroll(last_known_scroll_position);
      });

      ticking = true;
    }
  });

  checkScroll(last_known_scroll_position);
}

header();
