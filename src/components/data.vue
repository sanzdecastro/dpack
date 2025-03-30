<script>
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "DataComponent", // Renombrado para evitar conflictos
  props: {
    pageId: Number,
    apiUrl: String,
    section: Object, // Se espera un objeto con title, subtitle, data y slider_mode
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
    // Calcula el tema en created para evitar llamar a métodos desde data()
    this.theme = this.randomTheme();
  },
  mounted() {
    // Esperamos a que el DOM se renderice
    this.$nextTick(() => {
      setTimeout(() => {
        this.pinElement();
        this.animationNumbers();
        this.sliderData();
        ScrollTrigger.refresh();
      }, 100);
    });
  },
  beforeUnmount() {
    // Destruye todos los triggers para evitar conflictos al navegar
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
            snap: { textContent: 1 },
          });
        });
      }
    },
    randomTheme() {
      const themes = ["Blue", "Red", "Yellow"];
      return themes[Math.floor(Math.random() * themes.length)];
    },
    sliderData() {
      // Usamos el ref del contenedor slider para mayor precisión
      const sliderContainer = this.$refs.sliderDatas;
      if (sliderContainer) {
        // Obtenemos todos los elementos li dentro del contenedor
        const liElements = sliderContainer.querySelectorAll("li");
        let sliderDataWidth = 0;
        liElements.forEach((item) => {
          sliderDataWidth += item.offsetWidth;
          console.log("Elemento width:", item.offsetWidth);
        });
        console.log("Total sliderDataWidth:", sliderDataWidth);
        console.log("Window innerWidth:", window.innerWidth);
        
        const amountToScroll = sliderDataWidth - window.innerWidth;
        gsap.to(sliderContainer, {
          x: -amountToScroll,
          duration: 3,
          ease: "none",
          scrollTrigger: {
            trigger: sliderContainer,
            start: "bottom bottom",
            end: "+=" + amountToScroll,
            pin: true,
            scrub: 1,
          },
        });
      }
    },
    pinElement() {
      // Verificamos que existan ambos elementos antes de animar
      if (this.$refs.stickyBlock && this.$refs.section) {
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
  <!-- Se asigna ref="section" al contenedor principal -->
  <div
    v-if="!sliderMode"
    ref="section"
    :data-theme="theme"
    class="section-data flex relative bg-primary text-foreground"
  >
    <div
      ref="stickyBlock"
      class="sticky-block w-1/2 flex-1 h-[100dvh] flex flex-col justify-between p-sm"
    >
      <h2 class="font-display text-display">{{ title }}</h2>
      <p class="text-lead font-bold">{{ subtitle }}</p>
    </div>
    <ul class="w-1/2 p-sm">
      <li
        v-for="(data, index) in datas"
        :key="index"
        class="flex flex-col items-end border-b-black border-b-2"
      >
        <p class="font-display text-display-extra data-number">
          {{ data.number }}
        </p>
        <p class="text-lead font-bold">{{ data.description }}</p>
      </li>
    </ul>
  </div>
  <div v-else class="section">
    <!-- El contenedor slider tiene un ref para poder manipularlo desde sliderData() -->
    <ul class="p-sm flex slider-data" ref="sliderDatas">
      <li
        v-for="(data, index) in datas"
        :key="index"
        class="items-end border-b-black border-b-2"
      >
        <p class="font-display text-display-extra">
          {{ data.number }}
        </p>
        <p class="text-lead font-bold">{{ data.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style>
/* Puedes agregar aquí estilos personalizados */
</style>
