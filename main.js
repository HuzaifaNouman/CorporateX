import Lenis from "lenis";
import "@fortawesome/fontawesome-free/css/all.min.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

function imagesLoaded() {
  const images = document.querySelectorAll("img");
  const promises = Array.from(images).map((img) => {
    return new Promise((resolve, reject) => {
      if (img.complete) {
        resolve();
      } else {
        img.addEventListener("load", resolve);
        img.addEventListener("error", reject);
      }
    });
  });

  return Promise.all(promises);
}
function hidePreloader() {
  gsap.to(".preloader, .preloader img", {
    height: 0,
    duration: 1.5,
    display: "none",
  });
}

imagesLoaded()
  .then(() => {
    hidePreloader();
  })
  .catch((error) => {
    console.error("Some images failed to load:", error);
  });

// navbar code
function navbarCode() {
  const navbar = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");
  const navlinks = document.querySelector(".nav-links-mobile");

  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    let scrollFromTop = window.scrollY;
    if (scrollFromTop > lastScrollTop) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0%)";
    }
    lastScrollTop = scrollFromTop;
  });

  hamburger.addEventListener("click", () => {
    if (navlinks.style.display == "block") {
      navlinks.style.display = "none";
    } else {
      navlinks.style.display = "block";
    }
  });
}

// lenis for smooth scroll
function LenisInit() {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

document.addEventListener("DOMContentLoaded", () => {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;

      button.classList.toggle("active");

      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  });
  LenisInit();
  navbarCode();
  swiperCode();
});

// GSAP code goes here

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "5% 0%",
    end: "100% 30%",
    scrub: true,
  },
});

tl.to(".hero-overlay", {
  backgroundColor: "#000",
  duration: 1,
  zIndex: 4,
})
  .to(
    ".hero-overlay h2",
    {
      opacity: 1,
      duration: 1,
    },
    "<"
  )
  .to(".hero-overlay", {
    backgroundColor: "#fdfcf7",
    duration: 1,
    zIndex: 4,
    scrollTrigger: {
      trigger: ".features",
      start: "center center",
      end: "60% 55%",
      scrub: true,
      // markers: true,
    },
  });

const heroContent = [
  "We Help <br> Companies<span style='color: #f58659;'>.</span>",
  "Grow <br> Stronger<span style='color: #f58659;'>.</span>",
  "Reach <br> Further<span style='color: #f58659;'>.</span>",
];

let currentIndex = 0;

function animateText() {
  const heroHead = document.querySelector(".hero-content h1");

  if (heroHead.splitType) {
    heroHead.splitType.revert();
  }

  heroHead.innerHTML = heroContent[currentIndex];

  const splittedHead = new SplitType(heroHead, { types: "words" });

  heroHead.splitType = splittedHead;

  gsap.from(splittedHead.words, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.6,
    ease: "power2.out",
  });
  currentIndex = (currentIndex + 1) % heroContent.length;
}

animateText();

setInterval(animateText, 4000);

// Constants
const headings = document.querySelectorAll(".heading");
const animeImgs = document.querySelectorAll(".anime-img");

headings.forEach((heading) => {
  const splitHeading = new SplitType(heading);

  gsap.from(splitHeading.chars, {
    opacity: 0,
    y: 20,
    duration: 0.3,
    stagger: 0.03,
    ease: "power1.out",
    scrollTrigger: {
      trigger: splitHeading.chars,
      start: "top bottom",
    },
  });
});

animeImgs.forEach((img) => {
  gsap.to(img, {
    clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)",
    duration: 1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: img,
      start: "top center",
    },
  });
});
