<script>
import { ref } from "vue";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

import { Marquee } from "@selemondev/vue3-marquee";
// import "@selemondev/vue3-marquee/dist/style.css";

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
    Marquee,
  },
  data() {
    return {
      values: this.section,
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        ScrollTrigger.refresh();
        this.pinElements();
        this.textAnimTransformadoras();
        this.textAnimEntusiastas();
        this.textAnimConsolidadas();
        this.textAnimIntuitivas();
        this.textAnimAccesibles();
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
    textAnimTransformadoras() {
      const transformadorasTL = gsap.timeline({ repeat: -1, delay: 2 });
      const transformadorasText = document.querySelector(".transformadoras");
      transformadorasTL
        .to(transformadorasText, {
          duration: 1,
          delay: 1,
          delimiter: " ",
          ease: "sine.inOut",
          text: {
            value: "sarodamrofsnart",
          },
        })
        .to(transformadorasText, {
          duration: 1,
          delay: 0,
          delimiter: " ",
          ease: "sine.inOut",
          text: {
            value: "transformadoras",
          },
        });
    },
    textAnimEntusiastas() {
      const entusiastasTL = gsap.timeline({ repeat: -1, delay: 2 });
      const entusiastasText = document.querySelector(".entusiastas");
      entusiastasTL
        .to(entusiastasText, {
          delay: 1,
          duration: 0.5,
          scale: 1.6,
          ease: "sine.inOut",
        })
        .to(entusiastasText, {
          duration: 0.3,
          yPercent: -20,
          ease: "sine.inOut",
        })
        .to(entusiastasText, {
          duration: 0.2,
          yPercent: 0,
          ease: "sine.inOut",
        })
        .to(entusiastasText, {
          duration: 0.5,
          yPercent: 0,
          scale: 0.9,
          ease: "sine.inOut",
        })
        .to(entusiastasText, {
          duration: 1,
          yPercent: 0,
          scale: 1,
          ease: "sine.inOut",
        });
    },
    textAnimConsolidadas() {
      const consolidadasTL = gsap.timeline({ repeat: -1, delay: 2 });
      const consolidadasText = document.querySelector(".consolidadas");
      consolidadasTL
        .to(consolidadasText, {
          duration: 0.5,
          delay: 1,
          scaleX: 1.9,
          scaleY: 0.01,
          ease: "sine.inOut",
        })
        .to(consolidadasText, {
          duration: 0.5,
          scaleX: 0.9,
          scaleY: 1,
          ease: "sine.inOut",
        })
        .to(consolidadasText, {
          duration: 0.5,
          scaleY: 1,
          scaleX: 1,
          ease: "sine.inOut",
        });
    },
    textAnimIntuitivas() {
      const intuitivasTL = gsap.timeline({ repeat: -1, delay: 2 });
      const intuitivasText = document.querySelector(".intuitivas");
      intuitivasTL
        .to(intuitivasText, {
          overflow: "hidden",
          delay: 1,
          ease: "sine.inOut",
        })
        .to(intuitivasText, {
          overflow: "hidden",
          height: 0,
          ease: "sine.inOut",
        })
        .to(intuitivasText, {
          overflow: "hidden",
          height: "auto",
          ease: "sine.inOut",
        });
    },
    textAnimAccesibles() {
      const accesiblesTL = gsap.timeline({ repeat: -1, delay: 2 });
      const accesiblesText = document.querySelector(".accesibles");
      accesiblesTL
        .to(accesiblesText, {
          scale: 0.8,
          delay: 1,
          duration: 0.5,
          ease: "sine.inOut",
        })
        .to(accesiblesText, {
          scale: 1,
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
        <p :class="value.animation" class="text-display-value font-display">
          {{ value.value }}
        </p>
        <div
          class="absolute w-full h-full flex justify-center items-center text-display-ultra font-display opacity-10"
        >
          <Marquee
            class="gap-[3rem] [--duration:10s] [--gap:3rem]"
            innerClassName="gap-[3rem]"
            :fade="true"
          >
            {{ value.value }}
          </Marquee>
        </div>
      </li>
    </ul>
  </div>
</template>



