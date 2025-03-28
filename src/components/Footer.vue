<script>
import { ref } from 'vue';
import { gsap } from 'gsap';


export default {
  name: 'Footer',
  props: {
      
  },
  data() {
    return {
     
      theme: this.randomTheme(),
    }
  },
 mounted() {




    
  },
  methods: {
    randomTheme() {
      const themes = ['Blue', 'Red'];
      return themes[Math.floor(Math.random() * themes.length)];
    },
    
  }
}
</script>

<template>

<footer  :theme="theme" class="bg-primary flex flex-col justify-between h-[100dvh] max-h-[1080px] text-foreground p-sm">
  <div class="menu-footer flex">
    <div class="w-1/4">
      <p class="mb-md text-sans uppercase text-foreground text-mini">Explore</p>
      <ul>
        <li class="text-big font-display text-foreground">Proyectos</li>
      </ul>
    </div>
    <div class="w-1/4">
      <p class="mb-md text-sans uppercase text-foreground text-mini">Explore</p>
      <ul>
        <li class="text-big font-display text-foreground">Proyectos</li>
      </ul>
    </div>
    <div class="w-2/4">
      <p class="mb-md text-sans uppercase text-foreground text-mini">Explore</p>
      <ul>
        <li class="text-big font-display text-foreground">Proyectos</li>
      </ul>
    </div>
  </div>

  <div class="logo w-full">
      <a :href="`/`" class="w-full">
          <img class="w-full" src="../../public/logo.svg?url" alt="Logo">
      </a>
  </div>
</footer>
  
</template>
  


  