import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function initThumbnailAnim() {
  const elsOdd = document.querySelectorAll(".animation-thumbnail:nth-child(odd)");
  const elsEven = document.querySelectorAll(".animation-thumbnail:nth-child(even)");

  if (!elsOdd || !elsEven) return;

  elsOdd.forEach((el) => {
        gsap.set(el, {
            autoAlpha: 0,
            yPercent: 10,
            rotate: -10,
            transformOrigin: "bottom left"
        })
       gsap.to(el, {
            autoAlpha: 1,
            rotate: 0,
            yPercent: 0,
            duration: .8,
            ease: "expo.out",
            scrollTrigger: {
                trigger: el,
                start: "top-=50px bottom",
                toggleActions: "play none none reverse",
            },
        });

  })

  elsEven.forEach((el) => {
        gsap.set(el, {
            autoAlpha: 0,
            yPercent: 10,
            rotate: 10,
            transformOrigin: "bottom right"
        })
       gsap.to(el, {
            autoAlpha: 1,
            rotate: 0,
            yPercent: 0,
            duration: .8,
            ease: "expo.out",
            scrollTrigger: {
                trigger: el,
                start: "top-=50px bottom",
                toggleActions: "play none none reverse",
            },
        });

  })
   
   
  

}
