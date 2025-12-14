import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import  SplitText  from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

export function initTextAnimation() {
  const els = document.querySelectorAll(".animation-text");

  if (!els) return;

  els.forEach((el) => {
    const split = SplitText.create(el, { type: "chars,words,lines" });


    gsap.set(split.chars, {
      opacity: 0,
      className: "letra"
    })

    gsap.fromTo(split.chars, {
        y: 6,
        opacity: 0,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.04
    }, {
       y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.04
    });

  })
   
   
  

}
