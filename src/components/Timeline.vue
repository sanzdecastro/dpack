<script>
import { ref } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default {
  name: "Timeline",

  props: {
    projectId: {
      type: Number,
    },
    hitos: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        ScrollTrigger.refresh();
        this.timeline();            
      }, 300);
    });
   
  
       
      
      
    
  },
  beforeUnmount() {
    // Se destruyen todos los triggers para evitar conflictos al navegar
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    ScrollTrigger.refresh();
  },
  methods: {
    timeline() {
      if (this.$refs.timeline) {
        const timeline = this.$refs.timeline.querySelectorAll(".hito");
        let timelineWidth = 0;

        timeline.forEach((hito) => {
          timelineWidth += hito.offsetWidth;
          console.log(hito.offsetWidth);
        });

      
        console.log(timelineWidth);
        if (!timeline) return;
        // let sliderDataWidth = sliderData.offsetWidth;
        let amountToScroll = timelineWidth - window.innerWidth;
        console.log("sliderDataWidth", timelineWidth);
        console.log("window.innerWidth", window.innerWidth);

        gsap.to(this.$refs.timeline, {
          x: -amountToScroll,
          duration: 3,
          ease: "none",
          scrollTrigger: {
            trigger: this.$refs.timeline,
            start: "top top",
            end: "+=" + amountToScroll,
            pin: true,
            scrub: 1,
          },
        });
      }
    },
  },
};
</script>

<template>
  <div class="timeline flex flex-row pb-sm h-[80dvh]" ref="timeline">
    <div v-for="(hito, index) in hitos" class="hito w-auto flex flex-row h-full">
      <div class="flex flex-row gap-md justify-between min-w-1/2 h-full">
        <div class="flex flex-col justify-between w-full min-w-[800px] ml-xl">
          <div></div>
          <h3 class="font-display w-full text-display-value text-foreground-50">{{ hito.title }}</h3>
          <div class="flex flex-col pb-sm">
            <p class="font-bold text-p">{{ hito.subtitle }}</p>
            <p class="text-p">{{ hito.description }}</p>
          </div>
        </div>

        <div class="flex items-center gap-md h-full">
          <div v-for="(image, index) in hito.images" class="aspect-square h-full w-auto flex items-center">
            <img :src="image.image.url" :alt="image.image.alt" class="h-full w-full object-contain"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.icv {
  position: relative;
  overflow: hidden;
  cursor: row-resize;
}
.icv__icv--vertical {
  cursor: row-resize;
}
.icv__icv--horizontal {
  cursor: col-resize;
}
.icv__img {
  pointer-events: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  max-width: none;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  top: 0;
  display: block;
}
.icv__is--fluid .icv__img {
  display: none;
}
.icv__img-a {
  height: auto;
  position: static;
  z-index: 1;
  left: 0px;
}
.icv__img-b {
  height: 100%;
  position: absolute;
  z-index: 2;
  left: auto;
  right: 0px;
  width: auto;
}
.icv__icv--vertical .icv__img-b {
  width: 100%;
  height: auto;
}
.icv__imposter {
  z-index: 4;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.icv__wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0px;
  top: 0px;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  z-index: 3;
}
.icv__is--fluid .icv__wrapper,
.icv__icv--vertical .icv__wrapper {
  width: 100% !important;
}
.icv__is--fluid .icv__wrapper,
.icv__icv--horizontal .icv__wrapper {
  height: 100% !important;
}
.icv__fluidwrapper {
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.icv__control {
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  top: 0px;
  z-index: 5;
}
.icv__icv--vertical .icv__control {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  left: 0;
  width: 100%;
}
.icv__control-line {
  height: 50%;
  width: 2px;
  z-index: 6;
}
.icv__icv--vertical .icv__control-line {
  width: 50%;
}
.icv__theme-wrapper {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: absolute;
  -webkit-transition: all 0.1s ease-out 0s;
  transition: all 0.1s ease-out 0s;
  z-index: 5;
}
.icv__icv--vertical .icv__theme-wrapper {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.icv__arrow-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transition: all 0.1s ease-out 0s;
  transition: all 0.1s ease-out 0s;
}
.icv__arrow-a {
  -webkit-transform: scale(1.5) rotateZ(180deg);
  transform: scale(1.5) rotateZ(180deg);
  height: 20px;
  width: 20px;
  -webkit-filter: drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.33));
  filter: drop-shadow(0px -3px 5px rgba(0, 0, 0, 0.33));
}
.icv__arrow-b {
  -webkit-transform: scale(1.5) rotateZ(0deg);
  transform: scale(1.5) rotateZ(0deg);
  height: 20px;
  width: 20px;
  -webkit-filter: drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.33));
  filter: drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.33));
}
.icv__circle {
  width: 50px;
  height: 50px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  border-radius: 999px;
}
.icv__label {
  position: absolute;
  bottom: 1rem;
  z-index: 12;
  background: rgba(0, 0, 0, 0.33);
  color: white;
  border-radius: 3px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.icv__label.vertical {
  bottom: auto;
  left: 1rem;
}
.icv__label.on-hover {
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transition: 0.25s cubic-bezier(0.68, 0.26, 0.58, 1.22);
  transition: 0.25s cubic-bezier(0.68, 0.26, 0.58, 1.22);
}
.icv:hover .icv__label.on-hover {
  -webkit-transform: scale(1);
  transform: scale(1);
}
.icv__label-before {
  left: 1rem;
}
.icv__label-after {
  right: 1rem;
}
.icv__label-before.vertical {
  top: 1rem;
}
.icv__label-after.vertical {
  bottom: 1rem;
  right: auto;
}
.icv__body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
