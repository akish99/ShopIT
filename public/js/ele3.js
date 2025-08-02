if ('IntersectionObserver' in window) {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.fade-up, .cell').forEach(el => observer.observe(el));
    } else {
      document.querySelectorAll('.fade-up, .cell').forEach(el => el.classList.add('visible'));
    }

    if ('IntersectionObserver' in window) {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.fade-up, .cell').forEach(el => observer.observe(el));
    } else {
      document.querySelectorAll('.fade-up, .cell').forEach(el => el.classList.add('visible'));
    }