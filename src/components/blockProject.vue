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
    return {
      
    };
  },
  mounted() {

  },
  methods: {},
};
</script>

<template>
  <div class="flex flex-col  md:flex-wrap md:flex-row " :class="[ section.no_padding_bottom ? 'mb-0' : 'mb-lg', section.no_paddings ? 'px-0 no-paddings' : 'pl-sm', section.inverted ? 'md:flex-row-reverse' : '' ]">

    <div v-if="section.block_text_check"
      class="animation-opacity text-block flex flex-col justify-between pb-sm "
      :class="[ text.size, text.aligment, text.aligment === 'items-center' ? 'md:max-w-3/4 md:mx-auto' : 'md:pr-lg' ]"
    >

      <div class="header-block  " :class="[text.text_size, text.aligment === 'items-center' ? 'mb-sm' : 'mb-xl']">
        <span class="font-bold text-mini mb-md md:mb-xxs block">{{
          text.pretitle
        }}</span>
        <h2 class="font-display text-title" v-html=" text.title"></h2>
      </div>

      <div>
        <h3 class="text-lead font-bold mb-sm md:max-w-[1000px]" v-html="text.title_2"></h3>
        <p class="text-p md:max-w-[1000px]" v-html="text.description"></p>
      </div>
      
    </div>

    <div v-if="section.block_image_check"
      v-for="(image, index) in images.block_image"
      class="image-block pb-sm md:pr-sm w-full"
      :class="image.size"
    >
      <div
        v-if="image.video === false"
        :class="image.aspect_ratio"
        class="animation-opacity image-wrapper flex justify-center items-center w-full rounded-dpack overflow-hidden"
        
      >
        <img
          :alt="image.image.alt"
          :src="image.image.url"
          class="w-full h-full object-cover"
        />
      </div>

      <div
        v-else
        class="animation-opacity video-wrapper flex justify-center items-center w-full h-full rounded-dpack overflow-hidden bg-gray-400"
        :class="[ image.aspect_ratio ]"
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
