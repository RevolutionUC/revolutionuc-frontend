function video() {
  var loaded = false; // indicates if the video sources have been loaded in (we want to do this above the threshold)

  function playVideo(curr_width, threshold) {
    var video = document.querySelector(".hero__video");
    var videoSources = document.querySelectorAll('.hero__video source');

    if (curr_width > threshold) {
      // add video sources dynamically (if not already loaded)
      if (!loaded) {
        for (var i = 0; i < videoSources.length; i++) {
          videoSources[i].setAttribute('src', videoSources[i].getAttribute('data-src'));
        }

        video.load();
        loaded = true;
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
}

video();
