<script>
import { ref } from "vue";
import { gsap } from "gsap";

export default {
  name: "blockProject",
  props: {
    projectId: {
      type: Number,
    },
    section: {
      type: Object,
    },
    text: {
      type: Object,
    },
    images: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<template>
  <div class="flex flex-col md:flex-wrap md:flex-row px-sm">
    <div
      class="text-block flex flex-col justify-between pb-sm"
      :class="(text.size, text.aligment)"
    >
      <div class="header-block md:max-w-1/3 mb-xl md:mb-xxs">
        <span class="font-bold text-mini mb-md md:mb-xxs block">{{
          text.pretitle
        }}</span>
        <h2 class="font-display text-title">{{ text.title }}</h2>
      </div>

      <p class="text-p mt-lg md:max-w-1/3">{{ text.description }}</p>
    </div>

    <div
      v-for="(image, index) in images.block_image"
      class="image-block pb-sm md:pr-sm w-full"
      :class="image.size"
    >
      <div
        v-if="image.video === false"
        :class="image.aspect_ratio"
        class="image-wrapper flex justify-center items-center w-full rounded-dpack overflow-hidden"
        
      >
        <img
          :alt="image.image.alt"
          :src="image.image.url"
          class="w-full h-full object-cover"
        />
      </div>

      <div
        v-else
        class="video-wrapper flex justify-center items-center w-full h-full rounded-dpack overflow-hidden"
        :class="(image.size, image.aspect_ratio)"
      >
        <video
          autoplay
          playsinline
          loop
          muted
          class="w-full h-full object-cover"
          :src="image.video.url"
        ></video>
      </div>
    </div>
  </div>
</template>

<style>
.items-center {
  @apply text-center;
}
</style>
