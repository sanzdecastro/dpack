// src/lib/api.js
export async function getPages() {
    const response = await fetch('http://santisanchez.ovh/wp-json/wp/v2/pages');
    if (!response.ok) throw new Error('Error al obtener las páginas');
    return await response.json();
}

export async function getPosts() {
    const response = await fetch('http://santisanchez.ovh/wp-json/wp/v2/posts');
    if (!response.ok) throw new Error('Error al obtener las páginas');
    return await response.json();
}