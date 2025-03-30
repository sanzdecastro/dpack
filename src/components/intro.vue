<script>
import { ref } from 'vue';
import { gsap } from 'gsap';

export default {
  name: 'intro',
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
  <div class="intro-block p-sm h-[100vh]">
    <span class="text-mini leading-0 flex items-center font-sans px-tag-x py-tag-y">{{ title }}</span>
    <h1 class="!font-display !text-display" v-html="intro.title"></h1>
    <p class="text-lead font-bold" v-html="intro.paragraph"></p>
  </div>
</template>
  

  
  <style>

</style>
  