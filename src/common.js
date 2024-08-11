import Lenis from "lenis";
import "@fortawesome/fontawesome-free/css/all.min.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

// GSAP code goes here

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
    alert("Something went wrong! Refresh");
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
  LenisInit();
  navbarCode();
});

// GSAP code goes here

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
