function video() {
  var loaded = false; // indicates if the video sources have been loaded in (we want to do this above the threshold)

  function playVideo(curr_width, threshold) {
    var video = document.querySelector(".hero__video");
    var videoSources = document.querySelectorAll(".hero__video source");

    if (curr_width > threshold) {
      // add video sources dynamically (if not already loaded)
      // uses readyState 4 (can be played through to the end without interruption)
      // instead of a manual variable
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
      if (video.readyState !== 4) {
        for (var i = 0; i < videoSources.length; i++) {
          videoSources[i].setAttribute(
            "src",
            videoSources[i].getAttribute("data-src"),
          );
        }

        video.load();
      }

      video.play();
      video.setAttribute("autoplay", true);
    } else {
      video.removeAttribute("autoplay");
      video.pause();
    }
  }

  var threshold = 500;
  var ticking = false;

  window.addEventListener("resize", function(e) {
    curr_width = document.documentElement.clientWidth;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        playVideo(curr_width, threshold);
        ticking = false;
      });

      ticking = true;
    }
  });

  playVideo(document.documentElement.clientWidth, threshold);

  // restart the video when we reload the page
  document.addEventListener("turbolinks:load", function() {
    if (window.location.pathname === "/") {
      playVideo(document.documentElement.clientWidth, threshold);
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  video();
});
