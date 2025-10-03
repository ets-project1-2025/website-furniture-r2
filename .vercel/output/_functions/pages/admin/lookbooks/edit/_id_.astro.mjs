import { e as createComponent, f as createAstro, k as renderHead, h as addAttribute, r as renderTemplate } from '../../../../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../../../../chunks/supabaseClient_DdVNsowi.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const galleryId = Astro2.params.id;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return Astro2.redirect("/login");
  }
  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", session.user.id).single();
  if (!profile || profile.full_name !== "Admin") {
    return Astro2.redirect("/");
  }
  const { data: gallery, error: galleryError } = await supabase.from("lookbook_galleries").select("id, title, description, cover_image_url, is_active").eq("id", galleryId).single();
  if (galleryError || !gallery) {
    return Astro2.redirect("/admin/lookbooks");
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const coverImageUrl = formData.get("cover_image_url");
    const isActive = formData.get("is_active") === "on";
    const { error: updateError } = await supabase.from("lookbook_galleries").update({
      title,
      description,
      cover_image_url: coverImageUrl,
      is_active: isActive
    }).eq("id", galleryId);
    if (!updateError) {
      return Astro2.redirect(`/admin/lookbooks/edit/${galleryId}`);
    } else {
      console.error("Error updating lookbook gallery:", updateError);
    }
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Edit Lookbook Gallery | Admin Dashboard | WIDI Furniture</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col bg-gray-100"> <header class="bg-amber-800 text-white py-4 px-6"> <nav class="flex justify-between items-center"> <h1 class="text-2xl font-bold">Admin Dashboard</h1> <div> <a href="/admin" class="mr-4 text-amber-200 hover:text-white">Dashboard</a> <a href="/admin/lookbooks" class="mr-4 text-amber-200 hover:text-white">Lookbooks</a> <a href="/" class="mr-4 text-amber-200 hover:text-white">Visit Site</a> <a href="/admin/logout" class="text-amber-200 hover:text-white">Logout</a> </div> </nav> </header> <main class="py-8 px-6 flex-grow"> <div class="max-w-3xl mx-auto"> <h2 class="text-3xl font-semibold text-amber-900 mb-6">Edit Lookbook Gallery: ${gallery.title}</h2> <form method="POST" class="space-y-6 bg-white p-6 rounded-lg shadow-md"> <div> <label for="title" class="block text-gray-700 mb-2">Gallery Title *</label> <input type="text" id="title" name="title" required${addAttribute(gallery.title, "value")} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label for="description" class="block text-gray-700 mb-2">Description</label> <textarea id="description" name="description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500">${gallery.description}</textarea> </div> <div> <label for="cover_image_url" class="block text-gray-700 mb-2">Cover Image URL *</label> <input type="text" id="cover_image_url" name="cover_image_url" required${addAttribute(gallery.cover_image_url, "value")} placeholder="https://example.com/image.jpg" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div class="flex items-center"> <input type="checkbox" id="is_active" name="is_active"${addAttribute(gallery.is_active ? "checked" : "", "gallery.is_active ? 'checked' : ''")} class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"> <label for="is_active" class="ml-2 block text-gray-700">Active Gallery</label> </div> <div class="flex space-x-4"> <button type="submit" class="bg-amber-700 text-white py-2 px-6 rounded-md hover:bg-amber-800 transition-colors">
Update Gallery
</button> <a href="/admin/lookbooks" class="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors">
Cancel
</a> </div> </form> <!-- Link to manage hotspots for this gallery --> <div class="mt-8 bg-white p-6 rounded-lg shadow-md"> <h3 class="text-xl font-semibold text-amber-800 mb-4">Manage Hotspots</h3> <a${addAttribute(`/admin/lookbooks/${galleryId}/hotspots`, "href")} class="inline-block bg-amber-600 text-white py-2 px-6 rounded-md hover:bg-amber-700 transition-colors">
Edit Hotspots for this Gallery
</a> </div> </div> </main> <footer class="bg-amber-800 text-white py-6 px-6 text-center"> <p>&copy; 2025 WIDI Furniture Admin. All rights reserved.</p> </footer> </body></html>`;
}, "/workspaces/website-furniture-r2/src/pages/admin/lookbooks/edit/[id].astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/admin/lookbooks/edit/[id].astro";
const $$url = "/admin/lookbooks/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
