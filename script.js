onload = () => {
  const audio = document.getElementById("bg-music");
  const overlay = document.getElementById("start-overlay");

  if (!audio) {
    console.error("Audio element not found!");
    return;
  }

  // Explicitly set volume to ensure it's not muted
  audio.volume = 1.0;

  const BASE_ANIMATION_DURATION = 14;

  // Add error listener to debug loading issues
  audio.addEventListener('error', (e) => {
    console.error("Audio Error encountered:", e);
    const error = audio.error;
    let errorMessage = "Unknown Audio Error";
    if (error) {
      switch (error.code) {
        case error.MEDIA_ERR_ABORTED: errorMessage = "Fetch aborted"; break;
        case error.MEDIA_ERR_NETWORK: errorMessage = "Network error"; break;
        case error.MEDIA_ERR_DECODE: errorMessage = "Decode error"; break;
        case error.MEDIA_ERR_SRC_NOT_SUPPORTED: errorMessage = "Source not supported (404?)"; break;
      }
    }
    alert("Audio failed to load: " + errorMessage + "\nURL: " + audio.src);
  });

  const startExperience = () => {
    overlay.style.display = "none";

    let scale = 1;
    if (audio.duration && audio.duration !== Infinity) {
      scale = audio.duration / BASE_ANIMATION_DURATION;
      console.log("Audio Duration:", audio.duration);
      console.log("Calculated Scale:", scale);
      document.documentElement.style.setProperty('--speed-scale', scale);
    } else {
      console.warn("Audio duration not available yet, using default scale.");
    }

    audio.play().then(() => {
      console.log("Audio playing successfully");
      startAnimation();
    }).catch(e => {
      console.error("Audio play failed error:", e);
      alert("Audio play failed. Please interact with the document first or check console.");
      startAnimation();
    });
  };

  const startAnimation = () => {
    document.body.classList.remove("not-loaded");
  };

  const resetAnimation = () => {
    document.body.classList.add("not-loaded");
    void document.body.offsetWidth; // Force reflow
    document.body.classList.remove("not-loaded");
  }

  overlay.addEventListener("click", startExperience);

  audio.addEventListener("ended", () => {
    console.log("Audio ended, restarting...");
    audio.currentTime = 0;
    audio.play();
    resetAnimation();
  });
};