function video() {
  function playVideo(curr_width, threshold) {
    var video = document.querySelector(".hero-video");
    if (curr_width > threshold) {
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
