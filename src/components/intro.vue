<script>
import { ref } from "vue";
import gsap from "gsap";

export default {
  name: "intro",
  props: {
    pageTitle: {
      type: String,
    },
    pageId: {
      type: Number,
    },
    section: {
      type: Object,
    },
  },
  data() {
    return {
      title: this.pageTitle,
      intro: this.section,
    };
  },
  mounted() {
    this.initCursorTrail()
  },
  methods: {
    initCursorTrail() {
      const container = this.$refs.introBlock;
      const imgsRef = this.$refs.imageBack;

      const images = Array.isArray(imgsRef) ? imgsRef : imgsRef ? [imgsRef] : [];
      if (!container || images.length === 0) return;

      // Estado inicial
      gsap.set(images, {
        autoAlpha: 0,
        scale: 0.98,
        xPercent: -50,
        yPercent: -50,
        transformOrigin: "50% 50%",
        willChange: "transform, opacity",
      });

      let idx = 0;
      let lastX = 0;
      let lastY = 0;
      let hasEntered = false;

      // Umbral de movimiento (px) para disparar un nuevo "stamp"
      const MOVE_THRESHOLD = 180;

      const showAt = (clientX, clientY) => {
        const rect = container.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // siguiente imagen
        const el = images[idx % images.length];
        idx++;

        // coloca instantáneo en la posición
        gsap.set(el, { x, y });

        // anima entrada + seguimiento suave
        gsap.killTweensOf(el);

        gsap.fromTo(
          el,
          {  scale: 0, rotation: gsap.utils.random(-5, 5) },
          {
            autoAlpha: 1,
            scale: 1,
            duration: .8,
            ease: "expo.out",
          }
        );

        // “follow”: una pequeña inercia hacia donde está el cursor
        gsap.to(el, {
          x,
          y,
          duration: 5,
          ease: "power3.out",
        });

        // desvanecer pasado un rato (para que deje estela)
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.out",
          delay: 3,
        });
      };

      const onMove = (e) => {
        // Solo dentro del bloque
        if (!hasEntered) return;

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOVE_THRESHOLD) return;

        lastX = e.clientX;
        lastY = e.clientY;

        showAt(e.clientX, e.clientY);
      };

      const onEnter = (e) => {
        hasEntered = true;
        lastX = e.clientX;
        lastY = e.clientY;
        showAt(e.clientX, e.clientY);
      };

      const onLeave = () => {
        hasEntered = false;
        // apaga todas
        gsap.to(images, { autoAlpha: 0, duration: 0.2, overwrite: true });
      };

      container.addEventListener("mousemove", onMove, { passive: true });
      container.addEventListener("mouseenter", onEnter, { passive: true });
      container.addEventListener("mouseleave", onLeave, { passive: true });

      this._trail = {
        cleanup: () => {
          container.removeEventListener("mousemove", onMove);
          container.removeEventListener("mouseenter", onEnter);
          container.removeEventListener("mouseleave", onLeave);
        },
      };
    },
  },
};
</script>

<template>
  <div
    ref="introBlock"
    class="intro-block p-sm h-[100vh] pt-header flex flex-col justify-between relative overflow-hidden min-h-fit"
  >
    <div class="intro-top !border-black !border-b-2 flex flex-col gap-y-sm relative">
      <div class="animation-opacity w-fit px-tag-x py-tag-y bg-white flex items-end border border-solid text-foreground rounded-dpack">
        <span class="text-mini text-trim leading-none font-sans">{{ title }}</span>
      </div>

      <h1 class="animation-text !font-display  !text-display pb-sm" v-html="intro.title"></h1>
    </div>

    <p class="text-lead font-bold w-full md:max-w-max-w-text pt-sm" v-html="intro.paragraph"></p>

    
  </div>
  <!-- Trail layer -->
      <div class="images-back-container absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
        <img
          v-for="(image, index) in section.images"
          :key="index"
          ref="imageBack"
          class="image-back absolute top-0 left-0 pointer-events-none select-none overflow-hidden rounded-lg"
          :src="image.image"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
</template>

<style scoped>
/* Ajusta tamaño del “trail” */
.image-back {
  width: 350px;          /* cambia a tu gusto */
  height: auto;
  object-fit: cover;
  /* opcional: borde/blur */
  /* filter: blur(0px); */
}
</style>
