function initializeCounters() {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(
    (entries, counterObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const easedProgress = 1 - Math.pow(1 - progress, 3);

          counter.textContent = Math.round(
            target * easedProgress
          );

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(counter);
      });
    },
    {
      threshold: 0.35
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

document.addEventListener(
  "includesLoaded",
  initializeCounters
);

/* Scrollposition vor dem Öffnen der Datenschutzerklärung speichern */

document.addEventListener("click", function (event) {
  const privacyLink = event.target.closest(".privacy-link");

  if (!privacyLink) {
    return;
  }

  sessionStorage.setItem(
    "sandboxScrollPosition",
    window.scrollY.toString()
  );
});


/* Scrollposition nach der Rückkehr wiederherstellen */

function restoreScrollPosition() {
  const savedPosition = sessionStorage.getItem(
    "sandboxScrollPosition"
  );

  if (savedPosition === null) {
    return;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: Number(savedPosition),
        behavior: "instant"
      });

      sessionStorage.removeItem("sandboxScrollPosition");
    });
  });
}

document.addEventListener(
  "includesLoaded",
  restoreScrollPosition
);

function initializeCookieNotice() {
  const notice = document.getElementById("cookie-notice");
  const button = document.getElementById("cookie-notice-button");

  if (!notice || !button) {
    return;
  }

  const noticeWasAccepted = localStorage.getItem(
    "sandboxCookieNoticeAccepted"
  );

  if (noticeWasAccepted !== "true") {
    notice.hidden = false;
  }

  button.addEventListener("click", function () {
    localStorage.setItem(
      "sandboxCookieNoticeAccepted",
      "true"
    );

    notice.hidden = true;
  });
}

document.addEventListener(
  "includesLoaded",
  initializeCookieNotice
);
