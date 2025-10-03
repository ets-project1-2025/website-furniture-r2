/* empty css                                       */
import { e as createComponent, f as createAstro, k as renderHead, h as addAttribute, r as renderTemplate } from '../../../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../../../chunks/supabaseClient_DD_SplUw.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return Astro2.redirect("/login");
  }
  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", session.user.id).single();
  if (!profile || profile.full_name !== "Admin") {
    return Astro2.redirect("/");
  }
  const { data: categories, error: categoriesError } = await supabase.from("categories").select("id, name").order("name");
  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError);
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const name = formData.get("name");
    const slug = formData.get("slug");
    const parentId = formData.get("parent_id");
    const { data: newCategory, error: insertError } = await supabase.from("categories").insert([{
      name,
      slug,
      parent_id: parentId || null
    }]).select().single();
    if (!insertError && newCategory) {
      return Astro2.redirect(`/admin/categories/edit/${newCategory.id}`);
    } else if (insertError) {
      console.error("Error creating category:", insertError);
    }
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Add Category | Admin Dashboard | WIDI Furniture</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col bg-gray-100"> <header class="bg-amber-800 text-white py-4 px-6"> <nav class="flex justify-between items-center"> <h1 class="text-2xl font-bold">Admin Dashboard</h1> <div> <a href="/admin" class="mr-4 text-amber-200 hover:text-white">Dashboard</a> <a href="/admin/categories" class="mr-4 text-amber-200 hover:text-white">Categories</a> <a href="/" class="mr-4 text-amber-200 hover:text-white">Visit Site</a> <a href="/admin/logout" class="text-amber-200 hover:text-white">Logout</a> </div> </nav> </header> <main class="py-8 px-6 flex-grow"> <div class="max-w-3xl mx-auto"> <h2 class="text-3xl font-semibold text-amber-900 mb-6">Add New Category</h2> <form method="POST" class="space-y-6 bg-white p-6 rounded-lg shadow-md"> <div> <label for="name" class="block text-gray-700 mb-2">Category Name *</label> <input type="text" id="name" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label for="slug" class="block text-gray-700 mb-2">Slug *</label> <input type="text" id="slug" name="slug" required placeholder="e.g., living-room-furniture" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> <p class="mt-1 text-sm text-gray-500">Used in URLs, only lowercase letters, numbers, and hyphens allowed</p> </div> <div> <label for="parent_id" class="block text-gray-700 mb-2">Parent Category</label> <select id="parent_id" name="parent_id" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> <option value="">No parent (Top-level category)</option> ${categories?.map((category) => renderTemplate`<option${addAttribute(category.id, "key")}${addAttribute(category.id, "value")}>${category.name}</option>`)} </select> <p class="mt-1 text-sm text-gray-500">Leave empty for top-level categories</p> </div> <div class="flex space-x-4"> <button type="submit" class="bg-amber-700 text-white py-2 px-6 rounded-md hover:bg-amber-800 transition-colors">
Create Category
</button> <a href="/admin/categories" class="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors">
Cancel
</a> </div> </form> </div> </main> <footer class="bg-amber-800 text-white py-6 px-6 text-center"> <p>&copy; 2025 WIDI Furniture Admin. All rights reserved.</p> </footer> </body></html>`;
}, "/workspaces/website-furniture-r2/src/pages/admin/categories/new.astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/admin/categories/new.astro";
const $$url = "/admin/categories/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
