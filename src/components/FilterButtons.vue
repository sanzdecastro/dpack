<template>
    <ul class="filters flex gap-sm mx-sm pb-sm border-b-2 border-black mb-lg">
      <li
        v-for="(btn, idx) in filters"
        :key="idx"
        @click="filterItems(btn.category)"
        class="cursor-pointer font-bold text-p bg-white text-black rounded flex justify-center items-center px-button-x py-button-y hover:bg-foreground hover:text-primary focus:bg-foreground focus:text-primary"
      >
        {{ btn.label }}
      </li>
    </ul>
  </template>
  
  <script>

  export default {
    name: 'FilterButtons',
    data() {
      return {
        filters: [
          { category: 'Todos', label: 'Todos' },
          { category: '27', label: 'Nuevo lanzamiento' },
          { category: '29', label: 'Reposicionamiento' },
          { category: '31', label: 'Rediseño' },
        ],
      };
    },
    methods: {
      filterItems(category) {
        
        const items = document.querySelectorAll('.grid > li');

        
        items.forEach((item) => {
          const categoriesStr = item.getAttribute('category') || '';
          const categories = categoriesStr.split(' ');
          if (category === 'Todos' || categories.includes(category)) {
            item.style.order = '0';
          } else {
            item.style.order = '1';
          }

        });
        
       
      },
    },
  };
  </script>
  