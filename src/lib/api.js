const domain = import.meta.env.WP_DOMAIN
export const apiUrl = `${domain}/wp-json/wp/v2`;

export async function getPages(lang) {
    const response = await fetch(`${apiUrl}/pages?lang=${lang}`);
    if (!response.ok) throw new Error("Error al obtener pages");
    return await response.json();
}

export async function getProjects(lang) {
    const response = await fetch(`${apiUrl}/projects?lang=${lang}`);
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
 
     // Devolver la página de inmediato sin traducciones
     return { ...page, translations: {} };


  }

  export async function getProject(slug, lang) {
    // Obtener la página en el idioma actual
    const response = await fetch(`${apiUrl}/projects?slug=${slug}&lang=${lang}&_embed`);
    const projects = await response.json();

    if (!projects.length) return null;

    const project = projects[0]; // La página encontrada ya tiene la información básica

    // Devolver la página de inmediato sin traducciones
    return { ...project, translations: {} };


 }

 export async function getProjectsByIds(ids = [], lang) {
  if (!ids.length) return [];

  const query = new URLSearchParams();
  query.set("include", ids.join(","));
  query.set("per_page", String(Math.min(ids.length, 100))); // WP suele limitar a 100 por página
  query.set("lang", lang);
  query.set("_embed", "1");

  const url = `${apiUrl}/projects?${query.toString()}`;

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} ${res.url}\n${text.slice(0, 200)}`);
  }
  return await res.json();
}


  // Nueva función para cargar traducciones después de la transición
// export async function getTranslations(page) {
//   if (!page || !page.translations) return {};

//   const translationPromises = Object.entries(page.translations).map(async ([key, id]) => {
//       const res = await fetch(`${apiUrl}/pages/${id}`);
//       const transData = await res.json();
//       return [key, transData.slug]; // Guardamos un array con [idioma, slug]
//   });

//   const resolvedTranslations = await Promise.all(translationPromises);
//   return Object.fromEntries(resolvedTranslations);
// }

export async function getPost(slug, lang) {
    const response = await fetch(`${apiUrl}/posts?slug=${slug}&lang=${lang}`);
    const posts = await response.json();
    return posts.length ? posts[0] : null;
  }