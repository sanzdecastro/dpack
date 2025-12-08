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
          const description = item.querySelector('.accordion-content');

          ScrollTrigger.refresh();

          accordeon.forEach((el) => {
            if (el !== item) {
              el.querySelector('.accordion-content').classList.remove('opened');
              el.removeAttribute('theme');
              el.classList.remove('bg-primary');
              gsap.to(el.querySelector('.accordion-content'), {
                minHeight: '0',
                height: '0',
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
            item.classList.remove('bg-primary'); 
            item.removeAttribute('theme');
            gsap.to(description, {
                minHeight: '0',
                height: '0',
                duration: 0.5,
                ease: 'power2.inOut',
          }); 
          } else {
            description.classList.add('opened'); 
            const random = this.randomTheme();
            item.setAttribute('theme', random);
            gsap.to(description, {
                minHeight: 'auto',
                height: "auto",
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
        <div class="accordion-content gap-2 h-0 overflow-hidden  flex flex-col">
          <div class="flex gap-2 first:mt-30 border-t-1 pt-3 border-foreground-fix-2 items-start" v-for="(subservice, index) in service.subservices" :key="index">
              <h3 class="ml-2  font-display text-title-3  w-1/2 flex items-end md:pr-40">{{ subservice.subservice_title }}</h3>
              <div class="text-lead w-1/2 flex items-end md:pr-10 pb-10 indent-6">{{ subservice.subservice_text }}</div>
          </div>
        </div>
        
      </li>
    </ul>
    <div class="flex pb-lg justify-end p-sm">
      <a class="font-bold bg-primary text-foreground rounded flex items-center px-button-x py-button-y hover:bg-foreground hover:text-primary" :href=section.link.url>
        <span class="leading-none">{{ section.link.title }}</span>
      </a>
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
  