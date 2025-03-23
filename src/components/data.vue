<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';

// Registra el plugin
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'DataComponent', // Renombrado para evitar conflictos con palabras reservadas
  props: {
    pageId: Number,
    apiUrl: String,
    key: Number,
    section: Object, // Se espera un objeto con title, subtitle y data
  },
  data() {
    return {
      title: this.section.title,
      subtitle: this.section.subtitle,
      datas: this.section && this.section.data ? this.section.data : [],
      theme: this.randomTheme(),
    }
  },
  mounted() {
    // Esperamos a que el DOM se renderice y se apliquen los estilos
    this.$nextTick(() => {
      setTimeout(() => {
        this.pinElement();
        this.animationNumbers();
        ScrollTrigger.refresh();
      }, 100);
    });
  },
  beforeUnmount() {
    // Se destruyen todos los triggers para evitar conflictos al navegar
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ScrollTrigger.refresh();
  },
  methods: {
    animationNumbers() {
      // Seleccionamos los elementos .data-number dentro del contenedor usando ref
      const numbers = this.$refs.section.querySelectorAll('.data-number');
      numbers.forEach(element => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: "play none none none"
          },
          textContent: 0,
          duration: 4,
          snap: { textContent: 1 },
        });
      });
    },
    randomTheme() {
      const themes = ['Blue', 'Red'];
      return themes[Math.floor(Math.random() * themes.length)];
    },
    pinElement() {
      // Utilizamos refs para delimitar el contenedor y el elemento sticky
      gsap.to(this.$refs.stickyBlock, { 
        scrollTrigger: {
          trigger: this.$refs.section,
          pin: this.$refs.stickyBlock,
          start: "top top",
          end: "bottom bottom",
        }
      });
    }
  }
};
</script>

<template>
  <!-- Se asigna ref="section" al contenedor y ref="stickyBlock" al elemento a fijar -->
  <div ref="section" :theme="theme" class="section-data flex relative bg-primary text-foreground">
    <div ref="stickyBlock" class="sticky-block w-1/2 flex-1 h-[100dvh] flex flex-col justify-between p-sm">
      <h2 class="font-display text-display">{{ title }}</h2>
      <p class="text-lead font-bold">{{ subtitle }}</p>
    </div>
    <ul class="w-1/2 p-sm">
      <li v-for="(data, index) in datas" :key="index" class="flex flex-col items-end border-b-black border-b-2">
        <p class="font-display text-display-extra data-number">{{ data.number }}</p>
        <p class="text-lead font-bold">{{ data.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style>
.box {
  width: 100px;
  height: 100px;
  background-color: blue;
}
.thumbs .swiper-wrapper {
  justify-content: flex-end;
}
</style>
