    const drawer = document.getElementById('scribbleMenuDrawer');
    const openBtn = document.getElementById('scribbleOpenBtn');
    const overlay = document.getElementById('scribbleDrawerOverlay');

    function scribbleOpenDrawer() {
      drawer.classList.add('scribbleOpen');
      overlay.classList.add('scribbleOpen');
      openBtn.style.display = "none";
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = "hidden";
    }
    function scribbleCloseDrawer() {
      drawer.classList.remove('scribbleOpen');
      overlay.classList.remove('scribbleOpen');
      openBtn.style.display = "block";
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = "";
    }
    overlay.addEventListener('click', scribbleCloseDrawer);
 
     document.addEventListener("DOMContentLoaded", () => {
      const phrases = [
        "SHOPIT NOW!",
        "GRAB THE DEALS!",
        "FOLLOW TECH TRENDS!",
        "STAY UPDATED!",
        "GET IT BEFORE IT'S GONE!!"
      ];
      const animatedText = document.getElementById('animatedText');
      let phraseIndex = 0;
      let letterIndex = 0;
      let isDeleting = false;
      const typingSpeed = 100;
      const deletingSpeed = 50;
      const pauseDelay = 1500;

      function type() {
        const currentPhrase = phrases[phraseIndex];
        if (!isDeleting) {
          animatedText.textContent = currentPhrase.substring(0, letterIndex + 1);
          letterIndex++;
          if (letterIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, pauseDelay);
            return;
          }
        } else {
          animatedText.textContent = currentPhrase.substring(0, letterIndex - 1);
          letterIndex--;
          if (letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
          }
        }
        setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
      }

      type();
    });

   