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

<div class="featured-project flex flex-col gap-xxs mb-md">
  <img class="overflow-hidden rounded" v-if="projectData?.acf?.project_info?.thumbnail != false" :class="full ? 'w-full aspect-[695/502]' : 'w-1/2 aspect-[695/502]'" :src="projectData?.acf?.project_info?.thumbnail" />
  <div v-else :class="full ? 'w-full video-wrapper flex justify-center items-center overflow-hidden rounded object-cover relative aspect-[1393/1005]' : 'w-1/2 video-wrapper flex justify-center items-center overflow-hidden rounded object-cover relative aspect-[1393/1005]'" >
    <video autoplay playsinline muted class="object-cover w-full h-full" :src="projectData?.acf?.project_info?.video" ></video>
  </div>
  <div v-if="projectData" class="flex flex-col gap-xxs"> 
    <div class="tags-line flex ">
      <p class="text-mini leading-0 flex items-center font-sans px-tag-x py-tag-y bg-foreground text-primary rounded">{{ projectData?.acf?.project_info?.client || 'No disponible' }}</p>
      <p class="text-mini leading-0 flex items-center font-sans px-tag-x py-tag-y bg-zinc-100 text-foreground border border-solid rounded-full">{{ projectData?.acf?.project_info?.brand || 'No disponible' }}</p>
    </div>
    <h2 class="text-p font-bold">{{ projectData.title.rendered }}</h2>
    <div class="categories-tags ">
      <p class="text-mini">Packaging</p>
    </div>
  </div>
</div>
  
</template>
  


  