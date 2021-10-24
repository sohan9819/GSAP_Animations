gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".rg__column");
function initHoverReveal() {
  sections.forEach((section) => {
    // get components for animation
    section.imageBlock = section.querySelector(".rg__image");
    section.image = section.querySelector(".rg__image img");
    section.mask = section.querySelector(".rg__image--mask");
    section.text = section.querySelector(".rg__text");
    section.textCopy = section.querySelector(".rg__text--copy");
    section.textMask = section.querySelector(".rg__text--mask");

    // reset the initial position
    gsap.set(section.imageBlock, { yPercent: -101 });
    gsap.set(section.image, { scale: 1.2 });
    gsap.set(section.mask, { yPercent: 100 });
    gsap.set(section.textMask, { yPercent: 100 });
    gsap.set(section.textCopy, { yPercent: -101 });

    //add event listners to each section
    section.addEventListener("mouseenter", createHoverReveal);
    section.addEventListener("mouseleave", createHoverReveal);
  });
}

function getTextHeight(textCopy) {
  return textCopy.clientHeight;
}

function createHoverReveal(e) {
  // console.log(e.type);
  // console.log(e.target);

  const { imageBlock, mask, text, textMask, textCopy, image } = e.target;

  let tl = gsap.timeline({
    defaults: {
      duration: 0.7,
      ease: "Power4.out",
    },
  });

  if (e.type === "mouseenter") {
    tl.to([mask, imageBlock, textMask, textCopy], { yPercent: 0 });
    tl.to(
      text,
      {
        y: () => -getTextHeight(textCopy) / 2,
      },
      0
    );
    tl.to(image, { scale: 1 }, 0);
  } else if (e.type === "mouseleave") {
    tl.to([mask, textMask], { yPercent: 100 }, 0);
    tl.to([imageBlock, textCopy], { yPercent: -101 }, 0);
    tl.to(text, { y: 0 }, 0);
    tl.to(image, { scale: 1.2 }, 0);
  }

  //   return tl;
}

// function init() {
//   // start here
//   initHoverReveal();
// }

// window.addEventListener("load", function () {
//   init();
// });

// define a breakpoint
const mq = window.matchMedia("(min-width: 768px)");

// add change listner to this break point
mq.addListener(handleWidthChange);

// first page load
handleWidthChange(mq);

function resetProps(elements) {
  console.log(elements);

  // stop all tweens
  gsap.killTweensOf("*");

  if (elements.length) {
    elements.forEach((el) => {
      el && gsap.set(el, { clearProps: "all" });
    });
  }
}

// media query change
function handleWidthChange(mq) {
  // console.log(mq);

  // check if we are on the right breakpoint
  if (mq.matches) {
    // setup hover animation
    initHoverReveal();

    //remove
  } else {
    //width is less tha 768px
    console.log("we are on mobile");

    // remove event listners for  each sections
    sections.forEach((section) => {
      section.removeEventListener("mouseenter", createHoverReveal);
      section.removeEventListener("mouseleave", createHoverReveal);

      const { imageBlock, mask, text, textMask, textCopy, image } = section;
      resetProps([imageBlock, mask, text, textMask, textCopy, image]);
    });
  }
}
