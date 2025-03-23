<script>
import { ref } from 'vue';
import { gsap } from 'gsap';


export default {
  name: 'ProjectThumbnail',
  props: {
      pageId: {
          type: Number,
      },
      key: {
        type: Number,
      },
      full: {
        type: Boolean,
      },
      thumbnail: {
        type: String,
      },
    projectData: {
      type: Object,
      required: false
    }
     
  },
  data() {
    return {
     
      //projects: this.section && this.section.projects ? this.section.projects : []
    }
  },
 mounted() {


  console.log('Project Data:', this.projectData);

    
  },
  methods: {
   
    
  }
}
</script>

<template>


<img :class="full ? 'w-full aspect-video' : 'w-1/2 aspect-video'" :src="thumbnail" />
<div v-if="projectData">
      <h2>{{ projectData.title.rendered }}</h2>
      <p>{{ projectData.acf?.cliente || 'No disponible' }}</p>
    </div>
</template>
  


  