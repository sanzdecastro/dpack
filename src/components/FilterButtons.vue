<script>
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'FilterButtons',
  data() {
    return {
      activeCategory: 'Todos',
      filters: [
        { category: 'Todos', label: 'Todos' },
        { category: '29', label: 'Reposicionamiento' },
        { category: '31', label: 'Rediseño' },
        { category: '27', label: 'Nuevo lanzamiento' },
        
        
      ],
    };
  },
  methods: {
  filterItems(category) {
    this.activeCategory = category;

    const items = Array.from(document.querySelectorAll('.grid > li'));
    const showAll = category === 'Todos';

    const toShow = [];
    const toHide = [];

    items.forEach((item) => {
      const categoriesStr = item.getAttribute('data-category') || '';
      const categories = categoriesStr.split(' ').filter(Boolean);

      const shouldShow = showAll || categories.includes(category);

      if (shouldShow) {
        toShow.push(item);
      } else {
        toHide.push(item);
      }
    });

    // 1) Matamos tweens previos sobre TODOS los items para evitar colisiones
    gsap.killTweensOf(items);

    // 2) Matamos los ScrollTriggers ligados a las thumbnails (si los tienes)
    ScrollTrigger.getAll().forEach((st) => {
      const trigger = st.trigger;
      if (trigger && trigger.classList && trigger.classList.contains('animation-thumbnail')) {
        st.kill();
      }
    });

    // 3) Ocultamos con animación los que se van
    gsap.to(toHide, {
      autoAlpha: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        toHide.forEach((el) => {
          el.style.display = 'none';
        });
      },
    });

    // 4) Mostramos los visibles, quitamos la clase con animación de scroll
    toShow.forEach((el) => {
      el.style.display = 'block';

      // quitar clase que tiene su propia animación
      el.classList.remove('animation-thumbnail');

      // opcional: limpiar estilos que haya dejado GSAP de la anim de thumbnail
      gsap.set(el, { clearProps: 'y,opacity,transform' });

      // clase nueva si quieres estilos específicos
      el.classList.add('featured-result');
    });

    // 5) Animación de aparición del filtro
    gsap.fromTo(
      toShow,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      }
    );
  },
},

};
</script>

<template>
  <ul class="filters overflow-scroll md:overflow-hidden flex gap-sm mx-sm pb-sm border-b-2 border-black mb-lg">
    <li
      v-for="(btn, idx) in filters"
      :key="idx"
      @click="filterItems(btn.category)"
      class="cursor-pointer font-medium text-p rounded flex justify-center leading-none text-trim items-center px-button-x py-button-y
             transition-colors duration-200"
      :class="{
        'bg-white text-black whitespace-nowrap hover:bg-foreground hover:text-primary':
          activeCategory !== btn.category,
        'bg-foreground text-primary':
          activeCategory === btn.category
      }"
    >
      {{ btn.label }}
    </li>
  </ul>
</template>