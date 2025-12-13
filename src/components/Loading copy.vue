<script>
import { gsap } from "gsap";
export default {
  name: "Loading",
  props: {},
  data() {
    return {};
  },
  mounted() {
    this.animateLoadingBack();
  },

  methods: {
    animateLoadingBack() {
      const loading = document.querySelector(".loadingBackCont");
      const red = loading.querySelectorAll(".red");
      const yellow = loading.querySelectorAll(".yellow");
      const blue = loading.querySelectorAll(".blue");
      const coral = loading.querySelectorAll(".coral");

      const tl = gsap.timeline({ repeat: -1 });

      gsap.set(red, {
        yPercent: 100,
      });
      gsap.set(yellow, {
        yPercent: 100,
      });
      gsap.set(blue, {
        yPercent: 100,
      });
      gsap.set(coral, {
        yPercent: 100,
      });

      tl.to(red, {
        yPercent: 0,
        duration: 1,
        ease: "power4.inOut",
      }, "-=75%").to(yellow, {
        yPercent: 0,
        duration: 1,
        ease: "power4.inOut",
      }, "-=75%").to(blue, {
        yPercent: 0,
        duration: 1,
        ease: "power4.inOut",
      }, "-=75%").to(coral, {
        yPercent: 0,
        duration: 1,
        ease: "power4.inOut",
      }, "-=75%").to(coral, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      }).to(blue, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      }, "-=75%").to(yellow, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      }, "-=75%").to(red, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      }, "-=75%")
      
    },
  },
};
</script>

<template>
  <div
    ref="loadingContainer"
    class="loadingBackCont scale-130 md:scale-100 z-25 w-full p-sm h-[0dvh] bg-default-10 fixed bottom-0 left-0 flex flex-col items-start"
  > 
  
    <div
      class="red w-full absolute top-0 left-0 h-[100dvh] bg-red rounded-md overflow-hidden"
    ></div>
    <div
      class="yellow w-full absolute top-0 left-0 h-[100dvh] bg-yellow rounded-md overflow-hidden"
    ></div>
    <div
      class="blue w-full absolute top-0 left-0 h-[100dvh] bg-blue rounded-md overflow-hidden"
    ></div>
    <div
      class="coral w-full absolute top-0 left-0 h-[100dvh] bg-coral rounded-md overflow-hidden"
    ></div>
    
    
  </div>
</template>
