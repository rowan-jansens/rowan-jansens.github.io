window.onload = function () {
  setTimeout(function () {
    console.log('Page is loaded');
    document.getElementById('view1').classList.add('fade-in');
  }, 100);
};

const video = document.getElementById('video');
video.src = "./lamp_animation_FFMPEG.mp4";

let progressvalue = 0;
let delay = 0;
const accelamount = 0.2;

// 🧠 iOS Fix: Prime video after first touch
document.addEventListener('touchstart', () => {
  video.play()
    .then(() => video.pause())
    .catch(err => console.warn("iOS autoplay workaround failed:", err));
}, { once: true });

// ⏳ Wait for metadata before setting up scenes
video.onloadedmetadata = function () {
  console.log('metadata loaded!');
  const videoLength = video.duration;
  const duration = video.offsetHeight;

  // 🎯 ScrollMagic scene for scroll-based video playback
  const controller = new ScrollMagic.Controller();

  new ScrollMagic.Scene({
    duration: 4 * duration,
    triggerElement: '#view1',
    triggerHook: 0.5,
    offset: video.offsetHeight / 2
  })
    .setPin('.project')
    .addTo(controller)
    // .addIndicators() // Uncomment for debug
    .on("progress", function (e) {
      progressvalue = Math.floor(100 * e.progress);
    });

  // 🎯 Optional fade-in effect for #view3
  const controller2 = new ScrollMagic.Controller();
  new ScrollMagic.Scene({
    triggerElement: '#view1',
    offset: 4 * duration + (video.offsetHeight / 2),
    triggerHook: 0.5
  })
    .setClassToggle('#view3', 'fade-in')
    // .addIndicators() // Uncomment for debug
    .addTo(controller2);

  // 🎥 Update video currentTime based on scroll progress
  setInterval(() => {
    delay += (progressvalue - delay) * accelamount;
    video.currentTime = (videoLength * delay / 100) - 0.01;
  }, 20);
};
