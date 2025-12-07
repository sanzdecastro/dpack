import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initOpacityMovement() {
  const els = document.querySelectorAll(".animation-opacity");

  if (!els) return;

  els.forEach((el) => {
        gsap.set(el, {
            autoAlpha: 0,
            yPercent: 10,
        })
       gsap.to(el, {
            autoAlpha: 1,
            yPercent: 0,
            scrollTrigger: {
                trigger: el,
                start: "top-=50px bottom",
                toggleActions: "play none none reverse",
            },
        });

  })
   
   
  

}
