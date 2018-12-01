function header() {
  var prevFrameScrollPos = window.scrollY;
  var lastKnownScrollPos = window.scrollY;
  var ticking = false;
  var header = document.querySelector(".header");
  var headerHeight = header.clientHeight;
  var navToggle = document.querySelector(".menu-toggle");

  // Won't exist on non-root page
  if (window.location.pathname == "/") {
    var triggerHeight =
      document.querySelector(".hero").getBoundingClientRect().top +
      window.scrollY -
      headerHeight;
  }

  var header = document.querySelector(".header");
  var headerIsAnimating = false;
  function doneAnimating() {
    headerIsAnimating = false;
    if (window.scrollY == 0) {
      animateHeader()  
    }
  }
  // Let below functions that control animation know
  // that the animation is done.
  header.addEventListener("transitionend", doneAnimating, false);

  function animateHeader() {
    prevFrameScrollPos = lastKnownScrollPos;

    if (!headerIsAnimating) {
      window.requestAnimationFrame(function() {
        lastKnownScrollPos = window.scrollY;
        // Use the same trigger height if on root page
        hideOrShowHeader(
          lastKnownScrollPos,
          prevFrameScrollPos,
          triggerHeight || headerHeight,
        );
        // Only change transparency on root page.
        if (window.location.pathname == "/") {
          setHeaderTransparency(lastKnownScrollPos, triggerHeight);
        }
      });
    }
  }

  // Checks the scroll position and conditionally
  // sets the transparency of the header.
  function setHeaderTransparency(lastKnownScrollPos, triggerHeight) {
    if (
      lastKnownScrollPos >= triggerHeight &&
      header.classList.contains("header--no-bg")
    ) {
      header.classList.remove("header--no-bg");
      headerIsAnimating = true;
    } else if (
      lastKnownScrollPos < triggerHeight &&
      !header.classList.contains("header--no-bg")
    ) {
      header.classList.add("header--no-bg");
      headerIsAnimating = true;
    }
  }

  // Conditionally hides or shows the header
  // based on the current scroll position.
  function hideOrShowHeader(
    lastKnownScrollPos,
    prevFrameScrollPos,
    triggerHeight,
  ) {
    if (
      lastKnownScrollPos > prevFrameScrollPos &&
      lastKnownScrollPos >= triggerHeight &&
      !header.classList.contains("header--hidden")
    ) {
      navToggle.checked = false; // collapse the mobile navbar
      header.classList.add("header--hidden");
      headerIsAnimating = true;
    } else if (
      prevFrameScrollPos > lastKnownScrollPos &&
      header.classList.contains("header--hidden")
    ) {
      header.classList.remove("header--hidden");
      headerIsAnimating = true;
    }
  }

  window.addEventListener("scroll", animateHeader);
  // Do a first check
  animateHeader();
}

header_init = false;

if (!header_init) {
  header();
  header_init = true;
}
