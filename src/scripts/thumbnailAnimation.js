import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initThumbnailAnim() {
  const thumbnails = document.querySelectorAll(".animation-thumbnail");
  if (!thumbnails.length) return;

  thumbnails.forEach((el, i) => {
    const isOdd = i % 2 === 0; // alternancia VISUAL

    gsap.set(el, {
      autoAlpha: 0,
      yPercent: 10,
      rotate: isOdd ? -10 : 10,
      transformOrigin: isOdd ? "bottom left" : "bottom right",
    });

    gsap.to(el, {
      autoAlpha: 1,
      rotate: 0,
      yPercent: 0,
      duration: 0.8,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: "top-=50px bottom",
        toggleActions: "play none none reverse",
      },
    });
  });
}
