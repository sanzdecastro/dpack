<script>
import { ref } from 'vue';
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Thumbs } from 'swiper/modules';
import 'swiper/css';

export default {
  name: 'data',
  props: {
      pageId: {
          type: Number,
      },
      apiUrl: {
          type: String,
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
      repeaterItems: [],
      title: this.section.title,
      subtitle: this.section.subtitle,
      datas: this.section && this.section.data ? this.section.data : []
    }
  },
 mounted() {
 
    
  },
  methods: {
   
    
  }
}
</script>

<template>
  <h2>{{ title }}</h2>
  <p>{{  subtitle }}</p>
  <ul>
    <li v-for="(data, index) in datas" :key="index">
      <p>{{ data.number }}</p>
      <p>{{ data.description }}</p>
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
  