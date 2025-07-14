window.onload = function () {
  setTimeout(function () {
    console.log('Page is loaded');
    document.getElementById('view1')?.classList.add('fade-in');
    document.getElementById('view2')?.classList.add('fade-in');
  }, 100);
};

// iOS autoplay workaround — prime the video on first scroll
const video = document.getElementById('video');
video.setAttribute('muted', '');
video.setAttribute('playsinline', '');
video.setAttribute('preload', 'auto');

function getPosition(element) {
  let yPosition = 0;
  while (element) {
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }
  return yPosition;
}

let progressvalue = 0;
let delay = 0;
let videoLength = 0;
let accelamount = 0.2;

const videoTarget = $('#video');
const duration = videoTarget.height();
const view2 = document.getElementById("view2");
const view3 = document.getElementById("view3");
const offsetTop = getPosition(view2);

// Prime video on first scroll (required for autoplay on iOS)
function activateVideo() {
  video.play().then(() => video.pause()).catch(err => console.warn('Autoplay block:', err));
  window.removeEventListener('scroll', activateVideo);
}
window.addEventListener('scroll', activateVideo, { once: true });

video.onloadedmetadata = function () {
  const videoheight = video.offsetHeight;
  videoLength = video.duration;

  const controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: 4 * duration * 1.1,
    triggerElement: view2,
    triggerHook: 0.5,
    offset: videoheight / 2
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
    offset: 4 * duration * 1.1 + (videoheight / 2),
    triggerHook: 0.5
  })
    .setClassToggle('#view3', 'fade-in')
    // .addIndicators()
    .addTo(controller2);
};

setInterval(() => {
  delay += (progressvalue - delay) * accelamount;
  video.currentTime = (videoLength * delay / 100) - 0.03;
}, 20);

// Set source last
video.src = "./hinge_animation_FFMPEG.mp4";
