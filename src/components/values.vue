<script>
import { ref } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { Vue3Marquee } from "vue3-marquee";

export default {
  name: "values",
  props: {
    pageId: {
      type: Number,
    },
    section: {
      type: Object,
    },
  },
  components: {
    Vue3Marquee,
  },
  data() {
    return {
      values: this.section,
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
      gsap.utils.toArray(".section-values li").forEach((container, i) => {
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
  <div class="values-block">
    <ul ref="section" class="section-values">
      <li
        v-for="(value, index) in values.values"
        :key="index"
        :theme="value.theme"
        class="flex relative bg-primary text-foreground justify-center items-center h-[100dvh] w-[100vw]"
      >
        <p class="text-display-value font-display">{{ value.value }}</p>
        <div
          class="absolute w-full h-full flex justify-center items-center text-display-ultra font-display opacity-10"
        >
          <Vue3Marquee :clone="true" :duration="15">
            {{ value.value }}<span class="w-100"></span>
          </Vue3Marquee>
        </div>
      </li>
    </ul>
  </div>
</template>

<style></style>
