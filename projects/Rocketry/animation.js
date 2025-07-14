window.onload = function () {
  setTimeout(function () {
    console.log('Page is loaded');
    document.getElementById('view1')?.classList.add('fade-in');
  }, 100);
};

const video = document.getElementById('video');
const view2 = document.getElementById('view2');
const view3 = document.getElementById('view3');

let progressvalue = 0;
let delay = 0;
const accelamount = 0.2;
let videoLength = 0;
let duration = 0;

// iOS autoplay workaround
video.setAttribute('muted', '');
video.setAttribute('playsinline', '');
video.setAttribute('preload', 'auto');

function activateVideo() {
  video.play().then(() => video.pause()).catch(err => console.warn('Video prime error:', err));
  window.removeEventListener('scroll', activateVideo);
}
window.addEventListener('scroll', activateVideo, { once: true });

video.onloadedmetadata = function () {
  console.log('metadata loaded!');
  duration = $('#video').height(); // height in pixels
  videoLength = video.duration;

  const scrollFactor = 1; // ← reduce this to shorten scroll distance

  const controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: scrollFactor * duration,
    triggerElement: view2,
    triggerHook: 0.5,
    offset: video.offsetHeight / 2
  })
    .setPin(view2)
    .on("progress", function (e) {
      progressvalue = Math.floor(100 * e.progress);
    })
    // .addIndicators()
    .addTo(controller);

  const controller2 = new ScrollMagic.Controller();
  new ScrollMagic.Scene({
    triggerElement: view2,
    offset: scrollFactor * duration + (video.offsetHeight / 2),
    triggerHook: 0.5
  })
    .setClassToggle('#view3', 'fade-in')
    // .addIndicators()
    .addTo(controller2);
};

setInterval(() => {
  delay += (progressvalue - delay) * accelamount;
  video.currentTime = (videoLength * delay / 100) - 0.01;
}, 20);

// Set source dynamically
video.src = "./gs_animation3_FFMPEG.mp4";
