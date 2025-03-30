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
    Marquee
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
      const transformadorasTL = gsap.timeline({repeat: -1, delay: 2})
      const transformadorasText = document.querySelector(".transformadoras");
      transformadorasTL.to(transformadorasText, {
        duration: 1,
        delay: 1,
        delimiter: " ",
        ease:'sine.inOut',
        text: {
          value: "sarodamrofsnart",
        },
      }).to(transformadorasText, {
        duration: 1,
        delay: 0,
        delimiter: " ",
        ease:'sine.inOut',
        text: {
          value: "transformadoras",
        },
      });
    },
    textAnimEntusiastas() {
      const entusiastasTL = gsap.timeline({repeat: -1, delay: 2})
      const entusiastasText = document.querySelector(".entusiastas");
      entusiastasTL.to(entusiastasText, {
        delay: 1,
        duration: .5,
        scale: 1.6,
        ease:'sine.inOut',
      }).to(entusiastasText, {
        duration: .3,
        yPercent: -20,
        ease:'sine.inOut',
      }).to(entusiastasText, {
        duration: .2,
        yPercent: 0,
        ease:'sine.inOut',
      }).to(entusiastasText, {
        duration: .5,
        yPercent: 0,
        scale: .9,
        ease:'sine.inOut',
      }).to(entusiastasText, {
        duration: 1,
        yPercent: 0,
        scale: 1,
        ease:'sine.inOut',
      });
    },
    textAnimConsolidadas() {
      const consolidadasTL = gsap.timeline({repeat: -1, delay: 2})
      const consolidadasText = document.querySelector(".consolidadas");
      consolidadasTL.to(consolidadasText, {
        duration: .5,
        delay: 1,
        scaleX: 1.9,
        scaleY: .01,
        ease:'sine.inOut',
      }).to(consolidadasText, {
        duration: .5,
        scaleX: .9,
        scaleY: 1,
        ease:'sine.inOut',
      }).to(consolidadasText, {
        duration: .5,
        scaleY: 1,
        scaleX: 1,
        ease:'sine.inOut',
      })
    },
    textAnimIntuitivas() {
      const intuitivasTL = gsap.timeline({repeat: -1, delay: 2})
      const intuitivasText = document.querySelector(".intuitivas");
      intuitivasTL.to(intuitivasText, {
       overflow: "hidden",
        delay: 1,
        ease:'sine.inOut',
      }).to(intuitivasText, {
       overflow: "hidden",
        height: 0,
        ease:'sine.inOut',
      }).to(intuitivasText, {
       overflow: "hidden",
        height: 'auto',
        ease:'sine.inOut',
      })
    },
    textAnimAccesibles() {
      const accesiblesTL = gsap.timeline({repeat: -1, delay: 2})
      const accesiblesText = document.querySelector(".accesibles");
      accesiblesTL.to(accesiblesText, {
        scale: .8,
        delay: 1,
        duration: .5,
        ease:'sine.inOut',
      }).to(accesiblesText, {
        scale: 1,
      })
    }
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
        <p :class=value.animation  class="text-display-value font-display">{{ value.value }}</p>
        <div
          class="absolute w-full h-full flex justify-center items-center text-display-ultra font-display opacity-10"
        >
        <Marquee class="gap-[3rem] [--duration:10s] [--gap:3rem]" innerClassName="gap-[3rem]" :fade="true">

            {{ value.value }}
  
          </Marquee>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.marquee-flex-row[data-v-4f206fca]{display:flex;flex-direction:row}.marquee-flex-column[data-v-4f206fca]{display:flex;flex-direction:column}*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.flex{display:flex}.shrink-0{flex-shrink:0}@keyframes marquee-left{0%{transform:translate(0)}to{transform:translate(calc(-100% - var(--gap)))}}.animate-marquee-left{animation:marquee-left var(--duration, 40s) linear infinite}@keyframes marquee-up{0%{transform:translateY(0)}to{transform:translateY(calc(-100% - var(--gap)))}}.animate-marquee-up{animation:marquee-up var(--duration, 40s) linear infinite}.justify-around{justify-content:space-around}.gap-\[1rem\]{gap:1rem}.overflow-hidden{overflow:hidden}@keyframes enter{0%{opacity:var(--tw-enter-opacity, 1);transform:translate3d(var(--tw-enter-translate-x, 0),var(--tw-enter-translate-y, 0),0) scale3d(var(--tw-enter-scale, 1),var(--tw-enter-scale, 1),var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))}}@keyframes exit{to{opacity:var(--tw-exit-opacity, 1);transform:translate3d(var(--tw-exit-translate-x, 0),var(--tw-exit-translate-y, 0),0) scale3d(var(--tw-exit-scale, 1),var(--tw-exit-scale, 1),var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))}}.direction-reverse{animation-direction:reverse}.\[--gap\:1rem\]{--gap: 1rem}.group:hover .group-hover\:\[animation-play-state\:paused\]{animation-play-state:paused}

</style>
