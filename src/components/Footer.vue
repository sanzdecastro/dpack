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

<footer>
<div :theme="theme" class="bg-primary flex flex-col justify-between min-h-[100dvh]  text-foreground p-sm pt-header">
  <div class="menu-footer flex flex-col md:flex-row">
    <div class="w-1/4">
      <p class="mb-md text-sans uppercase text-foreground text-mini">Explore</p>
      <ul>
        <li class="text-big font-display text-foreground">Proyectos</li>
        <li class="text-big font-display text-foreground">Servicios</li>
        <li class="text-big font-display text-foreground">About</li>
      </ul>
    </div>
    <div class="w-1/4">
      <p class="mb-md text-sans uppercase text-foreground text-mini">Social</p>
      <ul>
        <li class="text-big font-display text-foreground">Instagram</li>
        <li class="text-big font-display text-foreground">LinkedIn</li>
      </ul>
    </div>
    <div class="w-2/4">
      <p class="mb-md text-sans uppercase text-foreground text-mini">Contact</p>
      <ul>
        <li class="text-big font-display text-foreground">hola@dpack.es</li>
        <li class="text-big font-display text-foreground">Plató 2n</li>
        <li class="text-big font-display text-foreground">08006 Barcelona</li>
      </ul>
    </div>
  </div>

  <div class="logo w-full">
      <a :href="`/`" class="w-full">
        <svg width="100%" viewBox="0 0 118 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="fill-foreground">
        <g clip-path="url(#clip0_582_11569)">
        <path d="M9.29841 1.02808H0V29.0181H9.29841C10.5302 29.0684 11.759 28.8626 12.9071 28.4138C14.0552 27.965 15.0976 27.2828 15.9684 26.4105C17.6591 24.6215 18.5506 21.9744 18.5506 18.7529V11.4913C18.5506 5.02193 15.0043 1.02808 9.29841 1.02808ZM12.0589 18.6737C12.0589 21.4727 10.8702 22.8325 8.42008 22.8325H6.60399V7.29282H8.42008C11.6825 7.29282 12.0589 9.69573 12.0589 11.4979V18.6737Z"/>
        <path d="M23.3649 29.0181L33.8124 1.0083H28.8066L18.3591 29.0181H23.3649Z"/>
        <path d="M45.125 1.02808H35.9454V29.0181H42.5494V22.8986H45.1382C50.9035 22.8986 54.3838 19.0631 54.3838 12.6334V11.4583C54.3243 5.02193 50.8044 1.02808 45.125 1.02808ZM47.8656 12.5541C47.8656 15.3531 46.6637 16.713 44.1872 16.713H42.5362V7.29282H44.1872C45.0986 7.29282 47.8656 7.29282 47.8656 11.4979V12.5541Z"/>
        <path d="M60.5652 1.02808L53.3008 29.0181H59.8585L60.902 24.4367L60.9548 24.1924H67.3342L67.3871 24.4367L68.4305 29.0181H74.9949L67.8163 1.02808H60.5652ZM65.67 18.6208H62.1699L62.2426 18.2446L63.8672 10.1776L64.1841 8.5933L64.4813 10.1842L65.9804 18.2512L66.0465 18.6208H65.67Z"/>
        <path d="M84.6036 0.506592C79.1289 0.506592 75.3052 4.42783 75.3052 10.0456V19.9477C75.3052 25.5854 79.1289 29.5264 84.6036 29.5264C90.0783 29.5264 93.8492 25.5655 93.8492 19.9477V18.6275H87.2452V20.2184C87.2452 22.9646 85.7263 23.2881 84.6036 23.2881C83.4809 23.2881 81.896 22.9646 81.896 20.2184V9.79478C81.896 7.81436 82.8073 6.76473 84.6036 6.76473C86.3999 6.76473 87.2452 7.75495 87.2452 9.79478V11.0226H93.8492V10.039C93.8558 4.42123 90.0519 0.506592 84.6036 0.506592Z"/>
        <path d="M117.531 1.02148H110.082L102.903 12.7456L102.897 1.02148H96.4248V29.0181H102.897V20.9709L104.891 17.8155L110.478 29.0181H118L110.055 13.2077L117.531 1.02148Z"/>
        </g>
        <defs>
        <clipPath id="clip0_582_11569">
        <rect width="118" height="29" fill="white" transform="translate(0 0.5)"/>
        </clipPath>
        </defs>
        </svg>

      </a>
  </div>
</div>
</footer>
</template>

  


  