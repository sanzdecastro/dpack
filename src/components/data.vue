<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import { initOpacityMovement } from "../scripts/opacityMovement";

// Registra el plugin
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "DataComponent", // Renombrado para evitar conflictos con palabras reservadas
  props: {
    pageId: Number,
    apiUrl: String,
    section: Object, // Se espera un objeto con title, subtitle y data
  },
  data() {
    return {
      title: this.section.title,
      subtitle: this.section.subtitle,
      datas: this.section && this.section.data ? this.section.data : [],
      sliderMode: this.section.slider_mode,
      theme: null,
    };
  },
  created() {
    this.theme = this.randomTheme();
  },
  mounted() {
    // Esperamos a que el DOM se renderice y se apliquen los estilos
    this.$nextTick(() => {
      setTimeout(() => {
        ScrollTrigger.refresh();
        this.pinElement();
        this.animationNumbers();
        this.sliderData();     
        initOpacityMovement();    
      }, 300);
    });
    
  },
  beforeUnmount() {
    // Se destruyen todos los triggers para evitar conflictos al navegar
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    ScrollTrigger.refresh();
  },
  methods: {
    animationNumbers() {
     
        if (this.$refs.section) {
          const numbers = this.$refs.section.querySelectorAll(".data-number");
          numbers.forEach((element) => {
            gsap.from(element, {
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none",
              },
              textContent: 0,
              duration: 4,
              snap: { textContent: 2 },
            });
          });
        }
      
     
    },
    randomTheme() {
      const themes = ["Blue", "Red", "Yellow"];
      return themes[Math.floor(Math.random() * themes.length)];
    },
    sliderData() {
    
        if (this.$refs.sliderDatas) {
          const sliderData = document.querySelectorAll(".slider-data li");
          let sliderDataWidth = 0;

          sliderData.forEach((item) => {
            sliderDataWidth += item.offsetWidth;
            console.log(item.offsetWidth);
          });

          console.log(sliderDataWidth);
          if (!sliderData) return;
          // let sliderDataWidth = sliderData.offsetWidth;
          let amountToScroll = sliderDataWidth - window.innerWidth;
          console.log("sliderDataWidth", sliderDataWidth);
          console.log("window.innerWidth", window.innerWidth);

          gsap.to(sliderData, {
            x: -amountToScroll,
            duration: 3,
            ease: "none",
            scrollTrigger: {
              trigger: ".slider-data",
              start: "bottom bottom",
              end: amountToScroll,
              pin: true,
              // markers: true,
              scrub: 1,
            },
          });
        }
      
    },
    pinElement() {
      // Utilizamos refs para delimitar el contenedor y el elemento sticky
      if (this.$refs.stickyBlock) {
        gsap.to(this.$refs.stickyBlock, {
          scrollTrigger: {
            trigger: this.$refs.section,
            pin: this.$refs.stickyBlock,
            start: "top top",
            end: "bottom bottom",
          },
        });
      }
    },
  },
};
</script>

<template>
  <!-- Se asigna ref="section" al contenedor y ref="stickyBlock" al elemento a fijar -->
  <div
    v-if="!sliderMode"
    ref="section"
    :theme="theme"
    class="section-data  flex flex-col md:flex-row relative bg-primary text-foreground min-h-[100svh] md:h-auto justify-between"
  >
    <div
      ref="stickyBlock"
      class="sticky-block w-full md:w-1/2 flex-1 !h-fit md:!h-[100svh] flex flex-col justify-between p-sm"
    >
      <h2 class="!font-display !text-display pt-header pb-sm">{{ title }}</h2>
      <p class="text-lead font-bold max-w-[500px]">{{ subtitle }}</p>
    </div>
    <ul
      class="w-full md:w-1/2 p-sm flex flex-row gap-xl md:gap-sm md:flex-col overflow-x-scroll md:overflow-hidden md:pt-xl"
    >
      <li
        v-for="(data, index) in datas"
        :key="index"
        class="animation-opacity flex flex-col md:items-end md:border-b-foreground md:border-b-2 pb-sm"
      >
        <p class="font-display text-trim text-display-extra items-center flex leading-none">
          <span class="data-number leading-[100%] inline-flex">{{ data.number }}</span><div class="inline-flex leading-[100%] data-symbol">{{ data.symbol }}</div>
        </p>
        <p class="text-lead -mt-3 font-bold leading-none">{{ data.description }}</p>
      </li>
    </ul>
  </div>
  <div v-else class="section bg-primary" theme="Default">
    <ul class="flex slider-data" ref="sliderDatas">
      <li
        v-for="(data, index) in datas"
        :key="index"
        class="bg-primary h-[50vh] px-lg pr-100 py-xl flex flex-col justify-center items-start border-b-black border-b-2"
      >
        <p class="font-display text-display-extra leading-none text-foreground">
          {{ data.number }}
        </p>
        <p class="text-lead font-bold">{{ data.description }}</p>
      </li>
    </ul>
  </div>
  <div
    v-if="!sliderMode"
    :theme="theme"
    class="bg-primary text-foreground flex pb-lg justify-end p-sm"
  >
    <a
      class="w-full  md:w-fit font-medium text-p  bg-white text-foreground-fix rounded flex justify-center items-center px-button-x py-button-y hover:bg-foreground hover:text-primary"
      :href="section.link.url"
      ><span class="">{{ section.link.title }}</span></a
    >
  </div>
</template>

<style></style>
