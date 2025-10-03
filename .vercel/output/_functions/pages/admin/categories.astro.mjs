/* empty css                                    */
import { e as createComponent, f as createAstro, k as renderHead, h as addAttribute, r as renderTemplate } from '../../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../../chunks/supabaseClient_DdVNsowi.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return Astro2.redirect("/login");
  }
  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", session.user.id).single();
  if (!profile || profile.full_name !== "Admin") {
    return Astro2.redirect("/");
  }
  const { data: categories, error } = await supabase.from("categories").select(`
    id, 
    name, 
    slug,
    parent_id,
    parent:parent_id (name)
  `).order("name");
  if (error) {
    console.error("Error fetching categories:", error);
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Categories | Admin Dashboard | WIDI Furniture</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col bg-gray-100"> <header class="bg-amber-800 text-white py-4 px-6"> <nav class="flex justify-between items-center"> <h1 class="text-2xl font-bold">Admin Dashboard</h1> <div> <a href="/admin" class="mr-4 text-amber-200 hover:text-white">Dashboard</a> <a href="/" class="mr-4 text-amber-200 hover:text-white">Visit Site</a> <a href="/admin/logout" class="text-amber-200 hover:text-white">Logout</a> </div> </nav> </header> <main class="py-8 px-6 flex-grow"> <div class="max-w-6xl mx-auto"> <div class="flex justify-between items-center mb-6"> <h2 class="text-3xl font-semibold text-amber-900">Categories Management</h2> <a href="/admin/categories/new" class="bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors">
Add New Category
</a> </div> <div class="bg-white rounded-lg shadow-md overflow-hidden"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-amber-100"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Name</th> <th class="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Slug</th> <th class="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Parent</th> <th class="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Actions</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200"> ${categories?.map((category) => renderTemplate`<tr${addAttribute(category.id, "key")}> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm font-medium text-gray-900">${category.name}</div> </td> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm text-gray-500">${category.slug}</div> </td> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm text-gray-500">${category.parent?.name || "None"}</div> </td> <td class="px-6 py-4 whitespace-nowrap text-sm"> <a${addAttribute(`/admin/categories/edit/${category.id}`, "href")} class="text-amber-600 hover:text-amber-900 mr-4">
Edit
</a> <a${addAttribute(`/admin/categories/delete/${category.id}`, "href")} class="text-red-600 hover:text-red-900">
Delete
</a> </td> </tr>`)} </tbody> </table> </div> </div> </main> <footer class="bg-amber-800 text-white py-6 px-6 text-center"> <p>&copy; 2025 WIDI Furniture Admin. All rights reserved.</p> </footer> </body></html>`;
}, "/workspaces/website-furniture-r2/src/pages/admin/categories/index.astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/admin/categories/index.astro";
const $$url = "/admin/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
