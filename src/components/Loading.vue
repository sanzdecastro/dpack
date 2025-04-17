<script>
import { gsap } from "gsap";
export default {
  name: "Loading",
  props: {},
  data() {
    return {};
  },
  mounted() {
    this.animateLoading();
  },

  methods: {
    animateLoading() {
      const loading = document.querySelector(".loading");
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
        duration: .8,
        ease: "power4.inOut",
      }, "-=75%").to(yellow, {
        yPercent: 0,
        duration: .8,
        ease: "power4.inOut",
      }, "-=75%").to(blue, {
        yPercent: 0,
        duration: .8,
        ease: "power4.inOut",
      }, "-=75%").to(coral, {
        yPercent: 0,
        duration: .8,
        ease: "power4.inOut",
      }, "-=75%").to(coral, {
        yPercent: -100,
        duration: .8,
        ease: "power4.inOut",
      }).to(blue, {
        yPercent: -100,
        duration: .8,
        ease: "power4.inOut",
      }, "-=75%").to(yellow, {
        yPercent: -100,
        duration: .8,
        ease: "power4.inOut",
      }, "-=75%").to(red, {
        yPercent: -100,
        duration: .8,
        ease: "power4.inOut",
      }, "-=75%")
      
    },
  },
};
</script>

<template>
  <div
    ref="loadingContainer"
    class="loading scale-130 md:scale-100 z-25 w-full p-sm h-[0dvh] bg-white fixed top-0 left-0 flex flex-col items-start"
  > 
  
    <div
      class="red w-full absolute top-0 left-0 h-[100dvh] bg-red rounded-md"
    ></div>
    <div
      class="yellow w-full absolute top-0 left-0 h-[100dvh] bg-yellow rounded-md"
    ></div>
    <div
      class="blue w-full absolute top-0 left-0 h-[100dvh] bg-blue rounded-md"
    ></div>
    <div
      class="coral w-full absolute top-0 left-0 h-[100dvh] bg-coral rounded-md"
    ></div>
    <div class="w-[100vw] h-[100dvh] fixed -z-10 top-0 left-0 p-sm flex items-start">
      <svg
        width="100%"
        viewBox="0 0 118 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="fill-black"
      >
        <g clip-path="url(#clip0_582_11569)">
          <path
            d="M9.29841 1.02808H0V29.0181H9.29841C10.5302 29.0684 11.759 28.8626 12.9071 28.4138C14.0552 27.965 15.0976 27.2828 15.9684 26.4105C17.6591 24.6215 18.5506 21.9744 18.5506 18.7529V11.4913C18.5506 5.02193 15.0043 1.02808 9.29841 1.02808ZM12.0589 18.6737C12.0589 21.4727 10.8702 22.8325 8.42008 22.8325H6.60399V7.29282H8.42008C11.6825 7.29282 12.0589 9.69573 12.0589 11.4979V18.6737Z"
          ></path>
          <path
            d="M23.3649 29.0181L33.8124 1.0083H28.8066L18.3591 29.0181H23.3649Z"
          ></path>
          
          
          
        </g>
        <defs>
          <clipPath id="clip0_582_11569">
            <rect
              width="118"
              height="29"
              fill="white"
              transform="translate(0 0.5)"></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
    
  </div>
</template>
