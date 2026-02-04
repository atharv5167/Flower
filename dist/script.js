onload = () => {
  const audio = document.getElementById("bg-music");
  const overlay = document.getElementById("start-overlay");

  // Base duration of the animation sequence (approximately)
  // Based on original CSS analysis: long-g--6 has delay 4.8s + duration 2s = 6.8s?
  // Wait, let's re-verify the "Base" duration.
  // The previous script doubled values. My new script wraps the *original* values if I reverted?
  // NO, I ran the new script on top of the ALREADY DOUBLED values.
  // So the values in file are currently "8.0s", "9.6s" etc. wrapped in calc.
  // So the BASE duration in the file is approx 14s.
  // I should probably set this to ~14.
  const BASE_ANIMATION_DURATION = 14;

  const startExperience = () => {
    overlay.style.display = "none";

    // Calculate scale
    // If audio is shorter than animation, we speed up (scale < 1)
    // If audio is longer, we slow down (scale > 1)
    // We want animation duration = audio duration
    // So: base * scale = audio_duration
    // scale = audio_duration / base

    let scale = 1;
    if (audio.duration) {
      scale = audio.duration / BASE_ANIMATION_DURATION;
      console.log("Audio Duration:", audio.duration);
      console.log("Calculated Scale:", scale);
      document.documentElement.style.setProperty('--speed-scale', scale);
    }

    audio.play().then(() => {
      startAnimation();
    }).catch(e => {
      console.error("Audio play failed", e);
      // Try to start animation anyway
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