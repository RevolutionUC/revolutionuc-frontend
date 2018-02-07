function header() {
  function addClassTo(el, className) {
    el.className += " " + className;
  }

  function removeClassFrom(el, className) {
    el.className = el.className.replace(" " + className, "");
  }

  var prev_frame_scroll_position = window.scrollY;
  var last_known_scroll_position = window.scrollY;
  var ticking = false;
  var header = document.querySelector(".header");
  var headerHeight = header.clientHeight;

  // Won't exist on non-root page
  if (window.location.pathname == "/") {
    var transition_height =
      document.querySelector(".hero").getBoundingClientRect().top +
      window.scrollY -
      headerHeight;
  }

  var el = document.querySelector(".header");

  function checkScroll(last_known_scroll_position) {
    if (
      last_known_scroll_position >= transition_height &&
      el.classList.contains("header--no-bg")
    ) {
      removeClassFrom(el, "header--no-bg");
      window.setTimeout(function() {
        ticking = false;
      }, 100);
    } else if (
      last_known_scroll_position < transition_height &&
      !el.classList.contains("header--no-bg")
    ) {
      addClassTo(el, "header--no-bg");
      window.setTimeout(function() {
        ticking = false;
      }, 100);
    } else {
      ticking = false;
    }
  }

  function scrollChecker(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        checkScroll(last_known_scroll_position);
      });
    }

    ticking = true;
  }

  var header_animating = false;

  function hideChecker(e) {
    if (!header_animating) {
      prev_frame_scroll_position = last_known_scroll_position;
      last_known_scroll_position = window.scrollY;
      window.requestAnimationFrame(function() {
        if (
          last_known_scroll_position > prev_frame_scroll_position &&
          last_known_scroll_position > headerHeight / 2 &&
          !el.classList.contains("header--hidden")
        ) {
          addClassTo(el, "header--hidden");
        } else if (prev_frame_scroll_position > last_known_scroll_position) {
          removeClassFrom(el, "header--hidden");
        }
        window.setTimeout(function() {
          header_animating = false;
        }, 100);
      });
    }

    header_animating = true;
  }

  // Throttling based on MDN recommendation @
  // https://developer.mozilla.org/en-US/docs/Web/Events/scroll
  // Should only be added on root page
  if (window.location.pathname == "/") {
    window.addEventListener("scroll", scrollChecker);
  }
  window.addEventListener("scroll", hideChecker);

  checkScroll(last_known_scroll_position);

  document.addEventListener("turbolinks:load", function() {
    if (window.location.pathname != "/") {
      window.removeEventListener("scroll", scrollChecker);
    }
  });
}

header_init = false;

if (!header_init) {
  header();
  header_init = true;
}
