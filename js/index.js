$(document).ready(function () {
  const owl$ = $('#owl-carousel');

  owl$.owlCarousel({
    items: 1,
    loop: false,
    margin: 0,
    dots: true,
    lazyLoad:true,
    navRewind:false,
    mouseDrag:false,
    smartSpeed: 1000
  });


  const imgCarousel = (function setNext() {
    const imgCarousel$ = $('#img-carousel');
    const children$ = imgCarousel$.children();
    let activeImage = 0;
    let totalImages = 5;

    return {
      next: function () {
        if (activeImage + 1 >= totalImages) {
          return;
        }
        activeImage = activeImage + 1;
        children$.each((index) => {
          const currentEl$ = children$.eq(index);
          const shiftIndex = index - activeImage;

          currentEl$.animate({
            'z-index': totalImages - shiftIndex,
            'top': -(shiftIndex * 20),
            'left': shiftIndex * 40,
            opacity: shiftIndex < 0 ? 0 : (5 - shiftIndex) * 1 / 5
          });
        });
      },
      prev: function () {
        if (activeImage <= 0) {
          return;
        }
        activeImage = activeImage - 1;

        children$.each((index) => {
          const currentEl$ = children$.eq(index);
          const shiftIndex = index - activeImage;

          currentEl$.animate({
            'z-index': totalImages - shiftIndex,
            'top': -(shiftIndex * 20),
            'left': shiftIndex * 40,
            opacity: shiftIndex < 0 ? 0 : (5 - shiftIndex) * 1 / 5
          });
        });
      }
    }
  })();


  $('#controller--right ,#controller--right2,#controller--right3,#controller--right4').click(() => {
    owl$.trigger('next.owl.carousel');
    imgCarousel.next();
  });

  $('#controller--left,#controller--left2,#controller--left3,#controller--left4').click(() => {
    owl$.trigger('prev.owl.carousel');
    imgCarousel.prev();
  });
});

var animation;
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

gsap.set("#motionSVG", {
  scale: 0.8,
  autoAlpha: 1
});

animation = gsap.to("#motionSVG", {
  scrollTrigger: {
    trigger: "#motionPath",
    start: "top 40%",
    end: "bottom 70%",
    scrub: 2,
  },
  duration: 10,
  ease: "none",
  immediateRender: true,
  motionPath: {
    path: "#motionPath",
    align: "#motionPath",
    alignOrigin: [0.5, 0.5],
  }
});


let mainNavLinks = document.querySelectorAll("nav ul li a");
let mainSections = document.querySelector("main");


let lastId;
let cur = [];

window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;
  let el = document.getElementById("header-scroll");

  if (fromTop > 100) {
    el.classList.add("header-scroll");
  } else {
    el.classList.remove("header-scroll");
  }

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});


// mobile menu

// define all UI variable
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.mobile-header-menu__list');
const navLinks = document.querySelectorAll('.mobile-header-menu-item__link');

// load all event listners
allEventListners();

// functions of all event listners
function allEventListners() {
  // toggler icon click event
  navToggler.addEventListener('click', togglerClick);
  // nav links click event
  navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}

// navLinkClick function
function navLinkClick() {
  if(navMenu.classList.contains('open')) {
    navToggler.click();
  }
}
