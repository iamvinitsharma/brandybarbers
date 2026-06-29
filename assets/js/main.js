/**
* Template Name: Clinic
* Template URL: https://bootstrapmade.com/clinic-bootstrap-template/
* Updated: Jul 23 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  'use strict';

  /* ── CURSOR ── */
  var dot = document.getElementById('dot');
  var ring = document.getElementById('ring');
  var mx = window.innerWidth / 2, my = window.innerHeight / 2;
  var rx = mx, ry = my;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  }, { passive: true });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  /* ── LOADER ── */
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.getElementById('loader').classList.add('hidden');
    }, 2200);
  });

  /* ── HEADER SHRINK + PROGRESS BAR ── */
  var header = document.getElementById('header');
  var progress = document.getElementById('progress');
  var heroBg = document.querySelector('.hero-bg');
  var ticking = false;
  var lastScrollY = 0;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) { requestAnimationFrame(processScroll); ticking = true; }
  }

  function processScroll() {
    var sy = lastScrollY;
    header.classList.toggle('scrolled', sy > 60);
    var total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (sy / total * 100) + '%';
    if (sy < window.innerHeight && heroBg) {
      heroBg.style.transform = 'scale(1.08) translateY(' + (sy * 0.18) + 'px)';
    }
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── SCROLL REVEAL ── */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  function initReveal() {
    document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });
  }
  setTimeout(initReveal, 2300);

  /* ── MENU ── */
  var overlay = document.getElementById('menu-overlay');
  var menuBtn = document.getElementById('menuBtn');
  var closeBtn = document.getElementById('closeBtn');
  var backdrop = document.getElementById('menuBackdrop');
  var isOpen = false;

  function openMenu() { isOpen = true; overlay.classList.add('open'); document.body.classList.add('menu-open'); document.body.style.overflow = 'hidden'; menuBtn.setAttribute('aria-expanded', 'true'); }
  function closeMenu() { isOpen = false; overlay.classList.remove('open'); document.body.classList.remove('menu-open'); document.body.style.overflow = ''; menuBtn.setAttribute('aria-expanded', 'false'); }

  menuBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
  document.querySelectorAll('.menu-close-link').forEach(function (l) { l.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen) closeMenu(); });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── TESTIMONIALS SLIDER ── */
  var track = document.getElementById('testiTrack');
  var dotsWrap = document.getElementById('testiDots');
  var cards = track ? track.querySelectorAll('.testi-card') : [];
  var current = 0;
  var perView = window.innerWidth <= 640 ? 1 : 2;

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    var total = Math.ceil(cards.length / perView);
    for (var i = 0; i < total; i++) {
      var d = document.createElement('div');
      d.className = 'testi-dot' + (i === 0 ? ' active' : '');
      (function (idx) { d.addEventListener('click', function () { goTo(idx); }); })(i);
      dotsWrap.appendChild(d);
    }
  }

  function updateDots() {
    var dots = dotsWrap ? dotsWrap.querySelectorAll('.testi-dot') : [];
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  }

  function goTo(idx) {
    var total = Math.ceil(cards.length / perView);
    current = Math.max(0, Math.min(idx, total - 1));
    var cardW = cards[0] ? cards[0].offsetWidth + 24 : 0; /* gap = 1.5rem = 24px */
    track.style.transform = 'translateX(-' + (current * perView * cardW) + 'px)';
    updateDots();
  }

  var prevBtn = document.getElementById('testiPrev');
  var nextBtn = document.getElementById('testiNext');
  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

  buildDots();
  window.addEventListener('resize', function () {
    perView = window.innerWidth <= 640 ? 1 : 2;
    current = 0;
    if (track) track.style.transform = 'translateX(0)';
    buildDots();
  });

  /* ── FORM SUBMIT ── */
  window.handleSubmit = function (e) {
    e.preventDefault();
    var btn = document.querySelector('.form-submit');
    var msg = document.getElementById('form-success');
    if (btn) { btn.textContent = 'Submitting…'; btn.style.opacity = '0.7'; }
    setTimeout(function () {
      if (btn) { btn.textContent = 'Book My Appointment →'; btn.style.opacity = ''; }
      if (msg) { msg.style.display = 'block'; }
      document.getElementById('contactForm').reset();
      setTimeout(function () { if (msg) msg.style.display = 'none'; }, 5000);
    }, 1200);
    return false;
  };

})();









document.addEventListener("click", function (e) {

  // 🔥 image click detect
  if (e.target.classList.contains("gallery-img")) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");

    lightbox.classList.add("active");
    lightboxImg.src = e.target.src;
  }

  // ❌ close button
  if (e.target.classList.contains("lightbox-close")) {
    document.getElementById("lightbox").classList.remove("active");
  }

  // ❌ click outside
  if (e.target.id === "lightbox") {
    document.getElementById("lightbox").classList.remove("active");
  }

});

const images = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");

let currentIndex = 0;

// open
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    lightbox.classList.add("active");
  });
});

// show image
function showImage() {
  lightboxImg.src = images[currentIndex].src;
}

// next
document.querySelector(".lightbox-next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

// prev
document.querySelector(".lightbox-prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

// close
document.querySelector(".lightbox-close").addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// outside click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

// keyboard support 🔥
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "ArrowRight") {
    currentIndex++;
    if (currentIndex >= images.length) currentIndex = 0;
    showImage();
  }

  if (e.key === "ArrowLeft") {
    currentIndex--;
    if (currentIndex < 0) currentIndex = images.length - 1;
    showImage();
  }

  if (e.key === "Escape") {
    lightbox.classList.remove("active");
  }
});




// gallary


document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector(".km-slider-track");
  const images = [...document.querySelectorAll(".km-slider-track img")];
  const prevBtn = document.querySelector(".km-prev");
  const nextBtn = document.querySelector(".km-next");
  const galleryBtn = document.querySelector(".km-gallery-btn");

  let currentPosition = 0;
  const slideAmount = 235;

  // Slider
  nextBtn.addEventListener("click", () => {
    const maxScroll =
      track.scrollWidth -
      track.parentElement.clientWidth;

    currentPosition += slideAmount;

    if (currentPosition > maxScroll) {
      currentPosition = maxScroll;
    }

    track.style.transform =
      `translateX(-${currentPosition}px)`;
  });

  prevBtn.addEventListener("click", () => {
    currentPosition -= slideAmount;

    if (currentPosition < 0) {
      currentPosition = 0;
    }

    track.style.transform =
      `translateX(-${currentPosition}px)`;
  });

  // FULL GALLERY
  const galleryModal = document.createElement("div");

  galleryModal.className = "km-gallery-modal";

  galleryModal.innerHTML = `
  <span class="km-gallery-close">&times;</span>
  <div class="km-gallery-grid"></div>
  `;

  document.body.appendChild(galleryModal);

  const galleryGrid =
    galleryModal.querySelector(".km-gallery-grid");

  images.forEach(img => {
    const clone = img.cloneNode();
    galleryGrid.appendChild(clone);
  });

  galleryBtn.addEventListener("click", e => {
    e.preventDefault();
    galleryModal.classList.add("active");
  });

  galleryModal.querySelector(".km-gallery-close")
    .addEventListener("click", () => {
      galleryModal.classList.remove("active");
    });

  // LIGHTBOX
  const lightbox = document.createElement("div");

  lightbox.className = "km-lightbox";

  lightbox.innerHTML = `
  <span class="km-close">&times;</span>
  <button class="km-light-prev">&#10094;</button>
  <img src="">
    <button class="km-light-next">&#10095;</button>
    `;

  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".km-close");
  const lightPrev = lightbox.querySelector(".km-light-prev");
  const lightNext = lightbox.querySelector(".km-light-next");

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightbox.classList.add("active");
  }

  // Slider images click
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  // Gallery images click
  [...galleryGrid.querySelectorAll("img")]
    .forEach((img, index) => {
      img.addEventListener("click", () => {
        openLightbox(index);
      });
    });

  // Next
  lightNext.addEventListener("click", (e) => {
    e.stopPropagation();

    currentIndex =
      (currentIndex + 1) % images.length;

    lightboxImg.src =
      images[currentIndex].src;
  });

  // Prev
  lightPrev.addEventListener("click", (e) => {
    e.stopPropagation();

    currentIndex =
      (currentIndex - 1 + images.length)
      % images.length;

    lightboxImg.src =
      images[currentIndex].src;
  });

  // Close
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  // Keyboard
  document.addEventListener("keydown", (e) => {

    if (!lightbox.classList.contains("active"))
      return;

    if (e.key === "ArrowRight") {
      lightNext.click();
    }

    if (e.key === "ArrowLeft") {
      lightPrev.click();
    }

    if (e.key === "Escape") {
      lightbox.classList.remove("active");
    }
  });

});



