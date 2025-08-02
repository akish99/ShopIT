const marquee = document.getElementById("marqueeTrack");
  const items = document.querySelectorAll(".marquee-item");

  const itemWidth = items[0].offsetWidth + 40; // image + gap
  const totalItems = items.length / 2;
  let currentIndex = 0;

  function animateMarquee() {
    currentIndex++;
    marquee.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    // Zoom effect
    for (let i = currentIndex; i < currentIndex + 3; i++) {
      const item = items[i % items.length];
      const img = item.querySelector("img");
      img.classList.add("zoom-effect");
      setTimeout(() => img.classList.remove("zoom-effect"), 2000);
    }

    setTimeout(() => {
      if (currentIndex >= totalItems) {
        marquee.style.transition = "none";
        marquee.style.transform = "translateX(0)";
        currentIndex = 0;

        setTimeout(() => {
          marquee.style.transition = "transform 1s linear";
        }, 50);
      }

      animateMarquee();
    }, 4000); // every 4 seconds
  }

  // Start the animation
  setTimeout(animateMarquee, 1000);

  