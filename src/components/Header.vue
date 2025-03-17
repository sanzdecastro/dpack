<script>

export default {
    name: 'Header',
    props: {
        lang: {
            type: String,
        },
        languages: {
            type: Object,
        },
        pages: {
            type: Array,
        },
    },
    data() {
        return {
            currentLang: this.lang,
            currentPages: this.pages,
            currentSlug: ""
        }
    },
    watch: {
        // Detecta cambios en `currentLang` y actualiza las páginas
        currentLang(newLang) {
            this.fetchPages(newLang);
        }
    },
    mounted(){
        console.log(this.currentLang);
        this.fetchPages(this.currentLang);
    },
   
    methods: {
        // Obtiene nuevas páginas cuando cambia el idioma
        async fetchPages(lang) {
            try {
                const response = await fetch(`https://santisanchez.ovh/wp-json/wp/v2/pages?lang=${lang}`);
                this.currentPages = await response.json();
            } catch (error) {
                console.error('Error al obtener páginas:', error);
            }
        },
        // Actualiza el idioma según la URL
        updateLang() {
            const newLang = window.location.pathname.split("/")[1] || "es";
            if (newLang !== this.currentLang) {
                this.currentLang = newLang;
                this.fetchPages(newLang);
            }
        },
        // Cambia el idioma y actualiza todo sin recargar
        changeLanguage(newLang) {
            localStorage.setItem("lang", newLang);
            history.pushState(null, "", `/${newLang}/${this.slug || ""}`);
            this.updateLang(); 
        }
    }
}
</script>

<template>
  <header class="flex w-full flex-row justify-between p-5">
    <div class="logo">
        <a :href="`/${currentLang}/`">
            <img src="../../public/logo.svg?url" alt="Logo">
        </a>
    </div>
    <nav class="flex">
        <ul class="flex">
            <li v-for="(page, index) in currentPages" :key="index">
                <a :href="`/${currentLang}/${page.slug}`">{{ page.title.rendered }}</a>
            </li>
        </ul>
        <ul class="flex">
            <li v-for="(label, key) in languages" :key="key">
                <a :href="`/${key}/`" @click="changeLanguage(key)">{{ label }}</a>
            </li>
        </ul>
    </nav>

  </header>
</template>
