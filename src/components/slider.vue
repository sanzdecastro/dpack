<script>
import { gsap } from 'gsap';

export default {
  name: 'Slider',
  props: {
      pageId: {
          type: Number,
      }
  },
  data() {
    return {
      repeaterItems: [],
      title: ""
    }
  },
  mounted() {
    // Reemplaza la URL por la de tu sitio WordPress
    fetch(`http://dpack.local/wp-json/wp/v2/pages/${this.pageId}`)
      .then(response => response.json())
      
      .then(data => {
          console.log(data.acf)
          this.repeaterItems = data.acf.slider;
          this.title = data.title.rendered;
      })

      .catch(err => console.error('Error al obtener los datos:', err));

        // Ejecuta la animación GSAP en el elemento .box
    gsap.from(this.$el.querySelector('.box'), {
      duration: 1,
      x: -100
    });
  }
}
</script>

<template>
    <div>
      <h1 class="bg-primary">-- {{ title }} --</h1>

      <div class="box"></div>

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
  

  
  <style>
  .box {
    width: 100px;
    height: 100px;
    background-color: blue;
  }
  h1 {
    margin-bottom: 1rem;
  }

  ul {
 
  }
  li {

      
    }
    .image-wrapper {
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        overflow: hidden;
        img {
            height: 100%;
             width: 100%; 
             object-fit: cover;
        }
    }
  
</style>
  