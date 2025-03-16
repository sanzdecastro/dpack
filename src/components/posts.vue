<script>

export default {
  name: 'Posts',
  props: {
        lang: {
          type: String,
      }
  },
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    fetch(`https://santisanchez.ovh/wp-json/wp/v2/posts?lang=${this.lang}`)
      .then(response => response.json())
      .then(data => {
        this.posts = data;
      })
      .catch(err => console.error('Error al cargar los posts:', err));
  }
}
</script>

<template>
    <div>
      <h1>Posts de WordPress</h1>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h2 v-html="post.title.rendered"></h2>
          <div v-html="post.excerpt.rendered"></div>
        </li>
      </ul>
    </div>
  </template>
  

  
  <style scoped>
  h1 {
    margin-bottom: 1rem;
  }
  li {
    margin-bottom: 1.5rem;
  }
  </style>