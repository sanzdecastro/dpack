<script>
import { ref } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'blockProject',
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
      images : {
        type: Object
      }
  },
  data() {
    return {
   
    }
  },
 mounted() {
 
    
  },
  methods: {
   
    
  }
}
</script>

<template>

<div class="flex flex-wrap">
    <div class="text-block flex flex-col justify-between" :class="text.size, text.aligment">
        <div class="header-block">
            <span>{{ text.pretitle }}</span>
            <h2>{{ text.title }}</h2>
        </div>
      
        <p>{{ text.description }}</p>
    </div>

  <div v-for="(image, index) in images.block_image" class="image-block" :class="image.size">
    <div v-if="image.video === false" class="image-wrapper flex justify-center items-center w-full" :class="image.aspect_ratio">
        <img :alt="image.image.alt" :src="image.image.url" class="w-full h-full object-cover" >
    </div>
    
    <div v-else class="video-wrapper  flex justify-center items-center w-full h-full" :class="image.size, image.aspect_ratio">
        <video autoplay playsinline loop muted class="w-full h-full object-cover" :src="image.video.url"></video>
    </div>
  </div>
</div>
  



  
</template>
  

  
<style>

</style>
  