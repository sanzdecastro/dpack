<script>
import { ref } from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
      },
      lang: {
        type: String,
      }
  },
  data() {
    return {
      services: this.section && this.section.services ? this.section.services : [],
      theme: this.randomTheme(),
    }
  },
 mounted() {
  this.openAccordeon()
    
  },
  methods: {
    openAccordeon() {
      const accordeon = document.querySelectorAll('.service');
      accordeon.forEach((item) => {
        item.addEventListener('click', () => {
          const description = item.querySelector('p');

          ScrollTrigger.refresh();

          accordeon.forEach((el) => {
            if (el !== item) {
              el.querySelector('p').classList.remove('opened');
              el.removeAttribute('theme');
              el.classList.remove('bg-primary');
              gsap.to(el.querySelector('p'), {
                minHeight: '0',
                duration: 0.5,
                ease: 'power2.inOut',
              });
            } else {
              el.classList.add('bg-primary');
              el.classList.add('text-foreground');
            }
          })

          if(description.classList.contains('opened')) {
            description.classList.remove('opened'); 
            description.classList.remove('bg-primary'); 
            item.removeAttribute('theme');
            gsap.to(description, {
                minHeight: '0',
                duration: 0.5,
                ease: 'power2.inOut',
          }); 
          } else {
            description.classList.add('opened'); 
            const random = this.randomTheme();
            item.setAttribute('theme', random);
            gsap.to(description, {
                minHeight: '25vh',
                duration: 0.5,
                ease: 'power2.inOut',
          }); 
          }
          
        });
      });
    },
    randomTheme() {
      const themes = ["Blue", "Red", "Yellow", "Coral"];
      return themes[Math.floor(Math.random() * themes.length)];
    },
  }
}
</script>

<template>
  <div class="services-block ">
    <h2 class="text-p font-bold p-sm">{{ section.title }}</h2>
    <ul>
      <li v-for="(service, index) in services" :key="index" class="p-sm service border-t-2 border-black ">
        <h3 class="font-display text-big cursor-pointer">{{ service.service_title }}</h3>
        <p class="text-lead h-0 overflow-hidden flex items-end">{{ service.service_description }}</p>
      </li>
    </ul>
    <div class="flex pt-lg justify-end p-sm">
      <a class="font-bold bg-primary text-foreground rounded flex items-center px-button-x py-button-y hover:bg-foreground hover:text-primary" :href=section.link.url>{{ section.link.title }}</a>
    </div>
    
  </div>
 
</template>
  

  
  <style>
  .service {
    &:last-of-type {
      @apply
      border-b-2;
    }
   
  }

  
</style>
  