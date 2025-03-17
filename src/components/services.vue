<script>
import { ref } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'services',
  props: {
      pageId: {
          type: Number,
      },
      key: {
        type: Number,
      },
      section: {
        type: String,
      }
  },
  data() {
    return {
      services: this.section && this.section.services ? this.section.services : []
    }
  },
 mounted() {
 
    
  },
  methods: {
   
    
  }
}
</script>

<template>

  <ul>
    <li v-for="(service, index) in services" :key="index">
      <p>{{ service.service_title }}</p>
      <p>{{ service.service_description }}</p>
    </li>
  </ul>
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
  