const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".navigation a");

/* Aktive Navigation */

function updateActiveNavigation() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }
  });

  navigationLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavigation);
window.addEventListener("load", updateActiveNavigation);


/* Zahlen hochzählen */

const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector(".stats-section");

let animationStarted = false;

function startCounterAnimation() {
  if (animationStarted) return;

  animationStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1400;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      counter.textContent = Math.round(target * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(animate);
  });
}

if (statsSection && counters.length > 0) {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounterAnimation();
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  observer.observe(statsSection);
}
