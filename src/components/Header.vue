<script>
import { gsap } from 'gsap';
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
        this.setMenu();
        this.openItemsMenu();
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
  <header class="flex w-full flex-row justify-between p-5 fixed top-0 left-0">
    <div class="logo">
        <a :href="`/${currentLang}/home`">
            <img src="../../public/logo.svg?url" alt="Logo">
        </a>
    </div>
    
    <nav class="flex items-center">
        <ul class="flex gap-2">
            <li v-for="(page, index) in currentPages" :key="index">
                <a class="font-bold p-2 bg-white rounded" :href="`/${currentLang}/${page.slug}`">{{ page.title.rendered }}</a>
            </li>
        </ul>
        <ul class="flex">
            <li v-for="(label, key) in languages" :key="key">
                <a class="font-bold" :href="`/${key}/home`" @click="changeLanguage(key)">{{ label }}</a>
            </li>
        </ul>
        <div id="menuButton" class="open p-2 bg-white rounded cursor-pointer font-bold">Menú</div>
    </nav>

  </header>
</template>
