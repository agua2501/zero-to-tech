/* ===========================================
   首页模块：轮播图 + 侧边栏跳转
   =========================================== */

function initCarousel() {
  const carousel = document.getElementById("homeCarousel");
  if (!carousel) return;
  const slides = carousel.querySelectorAll(".carousel-slide");
  const dotsContainer = carousel.querySelector(".carousel-dots");
  const prevBtn = carousel.querySelector(".carousel-prev");
  const nextBtn = carousel.querySelector(".carousel-next");
  if (!slides.length || !dotsContainer) return;

  let current = 0;
  let timer;

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", function () {
      goTo(i);
    });
    dotsContainer.appendChild(dot);
  }

  function goTo(n) {
    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach(function (dot) {
      dot.classList.remove("active");
    });
    current = ((n % slides.length) + slides.length) % slides.length;
    slides[current].classList.add("active");
    if (dots[current]) dots[current].classList.add("active");
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
      goTo(current + 1);
    }, 4000);
  }

  if (prevBtn) prevBtn.addEventListener("click", function () {
    goTo(current - 1);
    resetTimer();
  });
  if (nextBtn) nextBtn.addEventListener("click", function () {
    goTo(current + 1);
    resetTimer();
  });
  carousel.addEventListener("mouseenter", function () {
    clearInterval(timer);
  });
  carousel.addEventListener("mouseleave", resetTimer);
  resetTimer();
}

function initSidebarLinks() {
  const sideItems = document.querySelectorAll(".left ul li");
  sideItems.forEach(function (el) {
    el.addEventListener("click", function () {
      const href = this.getAttribute("data-href");
      if (href) window.location.href = href;
    });
  });
}

export function initHome() {
  initCarousel();
  initSidebarLinks();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHome);
} else {
  initHome();
}
