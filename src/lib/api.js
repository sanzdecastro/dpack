const domain = import.meta.env.WP_DOMAIN
const apiUrl = `${domain}/wp-json/wp/v2`;

export async function getPages(lang) {
    const response = await fetch(`${apiUrl}/pages?lang=${lang}`);
    if (!response.ok) throw new Error("Error al obtener pages");
    return await response.json();
}


export async function getPosts(lang) {
    const response = await fetch(`${apiUrl}/posts?lang=${lang}`);
    if (!response.ok) throw new Error("Error al obtener posts");
    return await response.json();
}

export async function getPage(slug, lang) {
     // Obtener la página en el idioma actual
     const response = await fetch(`${apiUrl}/pages?slug=${slug}&lang=${lang}`);
     const pages = await response.json();
 
     if (!pages.length) return null;
 
     const page = pages[0]; // La página encontrada ya tiene la información básica
     const translations = {};
 
     // Si existen traducciones, hacemos una sola consulta paralela para obtener los slugs
     if (page.translations && Object.keys(page.translations).length > 0) {
         const translationIds = Object.entries(page.translations);

         console.log(translationIds);
 
         // Hacemos las peticiones en paralelo
         const translationPromises = translationIds.map(([key, id]) =>
             fetch(`${apiUrl}/pages/${id}`).then(res => res.json())
         );
 
         const translationData = await Promise.all(translationPromises);
 
         // Mapeamos los slugs directamente
         translationData.forEach((transData, index) => {
             const langKey = translationIds[index][0]; // El idioma correspondiente
             translations[langKey] = transData.slug;
         });

         console.log(translations);
     }
 
     return { ...page, translations };


  }


export async function getPost(slug, lang) {
    const response = await fetch(`${apiUrl}/posts?slug=${slug}&lang=${lang}`);
    const posts = await response.json();
    return posts.length ? posts[0] : null;
  }