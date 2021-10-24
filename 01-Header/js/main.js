gsap.registerPlugin(ScrollTrigger);

/**
 * Animations on Nav Links
 *
 * Make sure the set timeout is equal to the transition time
 * so that the entire animation works.
 */
function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksRev = gsap.utils.toArray(".main-nav a").reverse();

  mainNavLinks.forEach((link) => {
    link.addEventListener("mouseleave", (e) => {
      //  add class
      link.classList.add("animate-out");
      setTimeout(() => {
        //   remove class
        link.classList.remove("animate-out");
      }, 300);
    });
  });

  function navAnimation(direction) {
    // console.log(direction);

    // if (direction == 1) {
    //   return gsap.to(mainNavLinks, {
    //     duration: 1,
    //     stagger: 0.5,
    //     autoAlpha: 0,
    //     y: 20,
    //   });
    // } else {
    //   return gsap.to(mainNavLinks, {
    //     duration: 1,
    //     stagger: 0.5,
    //     autoAlpha: 1,
    //     y: -20,
    //   });
    // }

    // Shorter syntax ( logic same )
    const scrollingDown = direction === 1;
    const links = scrollingDown ? mainNavLinks : mainNavLinksRev;
    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: () => (scrollingDown ? 0 : 1),
      y: () => (scrollingDown ? 20 : 0),
      ease: "Power4.out",
      //   scrub: true,
    });
  }

  ScrollTrigger.create({
    start: 100,
    end: "bottom bottom-=20",
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
    // markers: true,
  });
}

function initHeaderTilt() {
  document.querySelector("header").addEventListener("mousemove", moveImages);
}

function moveImages(e) {
  //   console.log(e);
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;

  // console.log(offsetX, offsetY, clientWidth, clientHeight);

  // get 0 0 in the center
  const xPos = offsetX / clientWidth - 0.5;
  const yPos = offsetY / clientHeight - 0.5;

  const leftImages = gsap.utils.toArray(".hg__left .hg__image");
  const rightImages = gsap.utils.toArray(".hg__right .hg__image");

  const modifier = (index) => index * 1.2 + 0.5;

  // move left 3 images
  leftImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.2,
      x: xPos * 20 * modifier(index),
      y: -yPos * 30 * modifier(index),
      rotationY: xPos * 40,
      rotationX: yPos * 10,
    });
  });

  // move right 3 images
  rightImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.2,
      x: xPos * 20 * modifier(index),
      y: yPos * 30 * modifier(index),
      rotationY: xPos * 40,
      rotationX: yPos * 10,
    });
  });

  // decorative circle
  gsap.to(".decor__circle", {
    duration: 1.7,
    x: 100 * xPos,
    y: 120 * yPos,
    ease: "Power4.out",
  });
}

function init() {
  // start here
  initNavigation();
  initHeaderTilt();
}

window.addEventListener("load", function () {
  init();
});
