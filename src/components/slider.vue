<script>
import { ref } from "vue";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Thumbs } from "swiper/modules";
import "swiper/css";

export default {
  name: "slider",
  props: {
    pageId: {
      type: Number,
    },
    apiUrl: {
      type: String,
    },
    section: {
      type: Object,
    },
  },
  data() {
    return {
      theme: this.randomTheme(),
      slides: this.section && this.section.slider ? this.section.slider : [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };
    return {
      onSwiper,
      onSlideChange,
      Thumbs,
      thumbsSwiper,
      setThumbsSwiper,
    };
  },
  mounted() {
    console.log(this.section.slider);
    if (this.section.slider) {
      gsap.from(this.$refs.box, {
      duration: 1,
      x: -100,
    });
    }
   
  },
  methods: {
    splitTitle(title) {
      // Separa el string por espacios
      return title.split(" ");
    },
    randomTheme() {
      const themes = ["Blue", "Red", "Yellow", "Coral"];
      return themes[Math.floor(Math.random() * themes.length)];
    },
  },
};
</script>

<template>
  <!-- <div ref="box" class="box"></div> -->
  <div :theme="theme" class="relative w-[100vw] h-[100dvh] aspect-[9/16] md:aspect-[16/9]">
    <swiper
      v-if="slides.length"
      :slides-per-view="1"
      :space-between="0"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :modules="[Thumbs]"
      :thumbs="{ swiper: thumbsSwiper }"
      class="w-full h-full flex justify-center items-center"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <!-- Se muestran los subcampos; personaliza según tu configuración -->
        <div
          class="title-slide max-w-1/2 absolute bottom-0 left-0 flex p-5 gap-5 flex-wrap"
        >
          <div
            class="px-bigtag-x py-bigtag-y flex items-center text-big font-medium leading-15 bg-primary text-foreground rounded"
            v-for="(word, wordIndex) in splitTitle(slide.title)"
            :key="wordIndex"
          >
            {{ word }}
          </div>
        </div>

        <div class="w-full h-full flex justify-center items-center">
          <video
            v-if="slide.video"
            autoplay
            playsinline
            muted
            loop
            :src="slide.video"
            class="object-cover w-full h-full"
          ></video>
          <img
            v-else
            :src="slide.imagen.url"
            :width="slide.imagen.sizes?.['large-width']"
  :height="slide.imagen.sizes?.['large-height']"
            class="object-cover w-full h-full"
          />
        </div>
      </swiper-slide>
    </swiper>
    <swiper
      class="thumbs !absolute bottom-0 w-1/8 h-[100vh] right-5 h-fit-content "
      :modules="[Thumbs]"
      direction="vertical"
      :space-between="10"
      watch-slides-progress
      @swiper="setThumbsSwiper"
      :slides-per-view="'auto'"
    >
      <swiper-slide
        class="aspect-square overflow-hidden cursor-pointer relative !h-fit"
        v-for="(slide, index) in slides"
        :key="index"
      >
        <!-- Se muestran los subcampos; personaliza según tu configuración -->
        <h2 class="absolute">{{ slide.caption }}</h2>

        <img
          :src="slide.thumbnail" :width="slide.imagen.sizes?.['thumbnail-width']"
  :height="slide.imagen.sizes?.['thumbnail-height']"
          class="aspect-square object-cover w-full h-full rounded-2xl"
        />
      </swiper-slide>
    </swiper>
  </div>

  <!-- <p v-else>Cargando contenido...</p> -->
</template>

<style>

</style>
