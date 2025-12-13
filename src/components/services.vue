<script>
import { ref } from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

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
      // theme: this.randomTheme(),
    }
  },
 mounted() {
  this.openAccordeon()
  this.animationTags()
    
  },
  methods: {
    animationTags() {
      const tags = this.$refs.tags

      gsap.fromTo(tags, {
        y: 100,
        rotate: 20,
        autoAlpha: 0,
      }, {
        y: 0,
        rotate: 0,
        autoAlpha: 1,
        stagger: .08,
        scrollTrigger: {
          trigger: tags,
          toggleActions: "play play none reverse",
        }
      })

    },
    openAccordeon() {
      const accordeon = document.querySelectorAll('.accordion .service');
      accordeon.forEach((item) => {
        item.addEventListener('click', () => {
          const description = item.querySelector('.accordion-content');

          ScrollTrigger.refresh();

          accordeon.forEach((el) => {
            if (el !== item) {
              el.querySelector('.accordion-content').classList.remove('opened');
              
              
              gsap.to(el.querySelector('.accordion-content'), {
                minHeight: '0',
                height: '0',
                duration: 0.5,
                ease: 'power2.inOut',
              });
            } else {
             
            }
          })

          if(description.classList.contains('opened')) {
            description.classList.remove('opened'); 
            item.classList.remove('bg-primary'); 
            
            gsap.to(description, {
                minHeight: '0',
                height: '0',
                duration: 0.5,
                ease: 'power2.inOut',
          }); 
          } else {
            description.classList.add('opened'); 
 
            
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
    // randomTheme() {
    //   const themes = ["Blue", "Red", "Yellow", "Coral"];
    //   return themes[Math.floor(Math.random() * themes.length)];
    // },
  }
}
</script>

<template>
  <div class="services-block " :class="section.desplegable ? 'accordion' : ''">
    <h2 class="text-p font-bold p-sm">{{ section.title }}</h2>
    
    
    <ul>
      <li v-for="(service, index) in services" :key="index" :theme="service.theme" class="p-sm service border-t-2 border-black ">
        <div class="flex justify-between items-center overflow-hidden">
          <div class="flex flex-col">
            <h3 class="font-display text-big ">{{ service.service_title }}</h3>
            <div v-if="service.services_tags" class="flex gap-2 mt-3">
              <div v-for="(tag, index) in service.services_tags" :key="index" ref="tags" class="bg-stone-200 rounded-full py-1 px-4">
                {{ tag.tag }}
              </div>
            </div>
          </div>
          <div v-if="section.desplegable" class="plus text-big ">+</div>
        </div>
        
        <div class="accordion-content gap-2 h-0 overflow-hidden  flex flex-col">
          <div class="flex gap-2 first:mt-30 pt-3  items-start" v-for="(subservice, index) in service.subservices" :key="index">
              <h3 class="ml-2  font-bold text-title-3  w-1/2 flex items-end md:pr-40">{{ subservice.subservice_title }}</h3>
              <div class="w-1/2 text-title-3 leading-[120%] flex items-end md:pr-10 pb-10 ">{{ subservice.subservice_text }}</div>
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
  
