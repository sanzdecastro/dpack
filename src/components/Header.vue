<script>
import { gsap } from 'gsap';
export default {
    name: 'Header',
    props: {
        slug: {
            type: String,
        },
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
            currentSlug: this.slug,
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
        this.setMenu();
        this.openItemsMenu();
        console.log(this.currentSlug)
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
            const segments = window.location.pathname.split("/");
            const newLang = segments[1] || "es";
            const newSlug = segments[2] || "";
            if (newLang !== this.currentLang) {
                this.currentLang = newLang;
                this.currentSlug = newSlug;
                this.fetchPages(newLang);
            }
        },
        // Cambia el idioma y actualiza todo sin recargar
        changeLanguage(newLang) {
            // Usamos la prop currentSlug para mantener el slug actual
            localStorage.setItem("lang", newLang);
            history.pushState(null, "", `/${newLang}/${this.currentSlug}`);
            this.updateLang(); 
        },
        setMenu() {
            gsap.set("header nav ul" , {
                autoAlpha: 0,
                xPercent: -20,
            });
        },
        openMenu() {
            gsap.to("header nav ul" , {
                autoAlpha: 1,
                xPercent: 0,
            });
        },
        closeMenu() {
            gsap.to("header nav ul" , {
                autoAlpha: 0,
                xPercent: -20,
            });
        },
        openItemsMenu() {
            const menuButton = document.querySelector("#menuButton");
            menuButton.addEventListener("click", () => {
                // Alterna la clase 'active' en el botón
                menuButton.classList.toggle("active");

                // Ejecuta la función según el estado
                if (menuButton.classList.contains("active")) {
                    this.openMenu(); // Función para abrir o animar el menú
                } else {
                    this.closeMenu();   // Función para cerrar el menú (debes implementarla)
                }
            });
        }
    }
}
</script>

<template>
  <header class="flex w-full flex-row justify-between p-sm fixed top-0 left-0 z-10">
    <div class="logo">
        <a :href="`/${currentLang}`">
            <img src="../../public/logo.svg?url" alt="Logo">
        </a>
    </div>
    
    <nav class="flex items-center gap-2">
        <ul class="flex gap-2">
            <li v-for="(page, index) in currentPages" :key="index" class="flex">
                <a class="font-bold py-button-y px-button-x backdrop-blur-sm  rounded" :href="`/${currentLang}/${page.slug}`">{{ page.title.rendered }}</a>
            </li>
        </ul>
        <ul class="flex gap-2">
            <li v-for="(label, key) in languages" :key="key" class="flex">
                <a class="font-bold py-button-y px-button-x bg-white-10 backdrop-blur-sm rounded" :href="`/${key}`" @click="changeLanguage(key)">{{ label }}</a>
            </li>
        </ul>
        <div id="menuButton" >
            <li class="flex">
                <a class="open py-button-y  px-button-x cursor-pointer font-bold rounded">Menú</a>
            </li>
        </div>
    </nav>

  </header>
</template>

<style>
li {
    a {
        -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.5);  
    }
}
</style>