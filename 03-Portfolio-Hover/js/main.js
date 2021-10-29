gsap.registerPlugin(ScrollTrigger);

const allLinks = gsap.utils.toArray(".portfolio__categories a");
const pageBackground = document.querySelector(".fill-background");
const largeImage = document.querySelector(".portfolio__image--l");
const smallImage = document.querySelector(".portfolio__image--s");
const lInside = document.querySelector(".portfolio__image--l .image_inside");
const sInside = document.querySelector(".portfolio__image--s .image_inside");

function initPortfolioHover(params) {
  allLinks.forEach((link) => {
    link.addEventListener("mouseenter", createPortfolioHover);
    link.addEventListener("mouseleave", createPortfolioHover);
    link.addEventListener("mousemove", createPortfolioMove);
  });
}

function createPortfolioHover(e) {
  if (e.type === "mouseenter") {
    /**
     * change images to the right urls
     * fade in images
     * all siblings to white and fade out
     * active link to white
     * update page background color
     */

    const { color, imagelarge, imagesmall } = e.target.dataset;
    const allSiblings = allLinks.filter((item) => item !== e.target);
    const tl = gsap.timeline();
    tl.set(lInside, { backgroundImage: `url(${imagelarge})` });
    tl.set(sInside, { backgroundImage: `url(${imagesmall})` });
    tl.to([largeImage, smallImage], { autoAlpha: 1 });
    tl.to(allSiblings, { color: "#fff", autoAlpha: 0.2 }, 0);
    tl.to(e.target, { color: "#fff", autoAlpha: 1 }, 0);
    tl.to(pageBackground, { backgroundColor: color, ease: "none" }, 0);
  } else if (e.type === "mouseleave") {
    /**
     * fade out images
     * all links back to back
     * change background color back to default #ACB7AB
     */
    const tl = gsap.timeline();
    tl.to([largeImage, smallImage], { autoAlpha: 0 });
    tl.to(allLinks, { color: "#000", autoAlpha: 1 }, 0);
    tl.to(pageBackground, { backgroundColor: "#ACB7AB", ease: "none" }, 0);
  }
}

function createPortfolioMove(e) {
  const { clientY } = e;
  //   console.log(clientY);

  // move large image
  gsap.to(largeImage, {
    duration: 1.2,
    y: getPortfolioOffset(clientY) / 6,
    ease: "Power3.out",
  });

  // move small image

  gsap.to(smallImage, {
    duration: 1.5,
    y: getPortfolioOffset(clientY) / 3,
    ease: "Power3.out",
  });
}

function getPortfolioOffset(clientY) {
  return -(
    document.querySelector(".portfolio__categories").clientHeight - clientY
  );
}

function init() {
  // start here
  initPortfolioHover();
}

window.addEventListener("load", function () {
  init();
});
