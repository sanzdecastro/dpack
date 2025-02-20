<template>
    <div>
      <h1>Contenido del Repeater</h1>
      <ul v-if="repeaterItems.length">
        <li v-for="(item, index) in repeaterItems" :key="index">
          <!-- Se muestran los subcampos; personaliza según tu configuración -->
          <h2>{{ item.caption }}</h2>
          <img :src="item.imagen.url">
        </li>
      </ul>
      <p v-else>Cargando contenido...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Slider',
    props: {
        pageId: {
            type: Number,
        }
    },
    data() {
      return {
        repeaterItems: []
      }
    },
    mounted() {
      // Reemplaza la URL por la de tu sitio WordPress
      fetch(`http://dpack.local/wp-json/wp/v2/pages/${this.pageId}`)
        .then(response => response.json())
        
        .then(data => {
            console.log(data.acf)
            this.repeaterItems = data.acf.slider;
          
        })
        .catch(err => console.error('Error al obtener los datos:', err));
    }
  }
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 1rem;
  }
  li {
    margin-bottom: 1.5rem;
  }
  </style>
  