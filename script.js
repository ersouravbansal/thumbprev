let videosInView = new Map();
const startVideoPreview = (e) => {
  if (e) {
    (e.style.display = "block"), (e.style.opacity = "1");
    let t = e.querySelector("video");
    t &&
      ((t.currentTime = 0),
      t.play(),
      t.addEventListener("ended", () => {
        (t.currentTime = 0), t.play();
      }));
  }
};
startVideoPreviewCallback = (e) => {
  let t = e.currentTarget?.querySelector(".video-preview-container");
  t && startVideoPreview(t.querySelector("video"));
};
stopVideoPreview = (e) => {
  if (e) {
    (e.style.display = "none"), (e.style.opacity = "0");
    let t = e.querySelector("video");
    t && t.pause();
  }
};
stopVideoPreviewCallback = (e) => {
  let t = e.currentTarget?.querySelector(".video-preview-container");
  t && stopVideoPreview(t.querySelector("video"));
};
isMobileDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(
    navigator.userAgent
  );
callback = (e, t) => {
  if (isMobileDevice()) {
    e.forEach((e1) => {
      let r = e1.target.getAttribute("data-media");
      if (e1.isIntersecting) {
        videosInView.set(r, e1);
      } else {
        stopVideoPreview(e1.target.querySelector(".video-preview"));
        videosInView.delete(r);
      }
      let e = videosInView.values().next().value || e1;
      if (e.isIntersecting) {
        if (!e.target.querySelector(".video-preview-container")) {
          let t = document.createElement("div");
          t.classList.add("video-preview-container");
          let i = document.createElement("video");
          i.addEventListener("loadedmetadata", () => {
            console.log(
              "Video dimensions (width, height):",
              i.videoWidth,
              i.videoHeight
            );
          }),
            i.setAttribute("class", "video-preview"),
            i.setAttribute("playsinline", ""),
            i.setAttribute("muted", "");
          r && (i.src = r),
            (i.autoplay = !0),
            (i.loop = !0),
            (i.muted = !0),
            (i.preload = "none"),
            (i.type = "video/mp4"),
            t.appendChild(i),
            e.target.appendChild(t);
        }
        isMobileDevice() &&
          startVideoPreview(e.target.querySelector(".video-preview"));
      } else stopVideoPreview(e.target.querySelector(".video-preview"));
    });
  } else {
    e.forEach((e) => {
      let r = e.target.getAttribute("data-media");
      if (e.isIntersecting) {
        if (!e.target.querySelector(".video-preview-container")) {
          let t = document.createElement("div");
          t.classList.add("video-preview-container");
          let i = document.createElement("video");
          i.addEventListener("loadedmetadata", () => {
            console.log(
              "Video dimensions (width, height):",
              i.videoWidth,
              i.videoHeight
            );
          }),
            i.setAttribute("class", "video-preview"),
            i.setAttribute("playsinline", ""),
            i.setAttribute("muted", "");
          r && (i.src = r),
            (i.autoplay = !0),
            (i.loop = !0),
            (i.muted = !0),
            (i.preload = "none"),
            (i.type = "video/mp4"),
            t.appendChild(i),
            e.target.appendChild(t);
        }
        isMobileDevice() &&
          startVideoPreview(e.target.querySelector(".video-preview"));
      } else stopVideoPreview(e.target.querySelector(".video-preview"));
    });
  }
};
(options = { threshold: [0.9] }),
  (observer_ndvid = new IntersectionObserver(callback, options)),
  (applyEventListners = () => {
    let e = document.querySelectorAll(".img-gr");
    e.forEach((e, t) => {
      e.classList.add("vid-preview-parent"),
        e.addEventListener("mouseenter", startVideoPreviewCallback),
        e.addEventListener("mouseleave", stopVideoPreviewCallback),
        observer_ndvid.observe(e);
    });
  });
applyEventListners();
