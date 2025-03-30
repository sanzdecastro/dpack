<script>
import { ref } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {
  name: "method",
  props: {
    pageId: {
      type: Number,
    },
    section: {
      type: Object,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      method: this.section,
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.pinElements();
        ScrollTrigger.refresh();
      }, 100);
    });
  },
  beforeUnmount() {
    // Se destruyen todos los triggers para evitar conflictos al navegar
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    ScrollTrigger.refresh();
  },
  methods: {
    pinElements() {
      const footer = document.querySelector("footer");
      gsap.utils.toArray(".section-method li").forEach((container, i) => {
        let prev = container.previousElementSibling;

        ScrollTrigger.create({
          trigger: container,
          start: "bottom bottom",
          endTrigger: footer,
          end: "top bottom",
          pin: true,
          pinSpacing: false,
        });

        if (prev) {
          gsap.to(prev, {
            opacity: 0,
            scrollTrigger: {
              trigger: container,
              start: "top 90%",
              scrub: 1,
              toggleActions: "play none reverse reset",
            },
          });
        }
      });
    },
  },
};
</script>

<template>
  <div class="method-block">
    <h2 class="text-p font-bold p-sm">{{ method.title }}</h2>
    <ul ref="section" class="section-method">
      <li 
        v-for="(step, index) in method.step" :key="index"  class="flex h-[100vh]">

        <div class="step-left w-1/2">
          <swiper
            :slides-per-view="1"
            :space-between="0"
            class="w-full h-full flex justify-center items-center bg-white"
          >
            <swiper-slide :theme="step.theme" class="bg-primary text-foreground">
              <p class="h-full w-full flex justify-center items-center font-display text-display-ultra">{{ step.number_step }}</p>
            </swiper-slide>
            <swiper-slide v-for="(slide, index) in step.slider_step " :key="index">
              <img :src="slide.image" alt="Slide Image" class="w-full h-full object-cover" />
            </swiper-slide>
          </swiper>
        </div>
        <div class="bg-white step-right w-1/2 flex flex-col items-start justify-center p-md">
          <h3 class="text-lead font-bold"> {{ step.title_step }} </h3>
          <p class="text-lead pt-sm">{{ step.test_step }}</p>
        </div>
        

      </li>
    </ul>
  </div>
</template>

<style></style>
