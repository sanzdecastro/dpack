<script>
import { ref } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'intro_proyectos',
  props: {
      pageTitle: {
          type: String,
      },
      pageId: {
          type: Number,
      },
      section: {
        type: Object,
      }
  },
  data() {
    return {
      title: this.pageTitle,
      intro: this.section,
    }
  },
 mounted() {
 
    
  },
  methods: {
   
    
  }
}
</script>

<template>
  <div class="intro-block p-sm pt-header flex flex-col justify-between">
    <div class="intro-top  !border-black !border-b-2 flex flex-col gap-y-sm">
      <span class="text-mini w-fit flex items-end font-sans px-tag-x py-tag-y bg-white border border-solid text-foreground rounded-dpack">{{ title }}</span>
      <h1 class="!font-display !text-display pb-sm md:max-w-3/4" v-html="intro.title"></h1>
    </div>
  </div>
</template>
  

  
  <style>

</style>
  