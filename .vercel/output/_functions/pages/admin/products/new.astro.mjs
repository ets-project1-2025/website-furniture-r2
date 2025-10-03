/* empty css                                       */
import { e as createComponent, f as createAstro, k as renderHead, h as addAttribute, r as renderTemplate } from '../../../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../../../chunks/supabaseClient_DdVNsowi.mjs';
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
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const categoryId = formData.get("category_id");
    const isActive = formData.get("is_active") === "on";
    const length = parseFloat(formData.get("length")) || null;
    const width = parseFloat(formData.get("width")) || null;
    const height = parseFloat(formData.get("height")) || null;
    const dimensions = length || width || height ? { length, width, height } : null;
    const materialsInput = formData.get("materials");
    const materials = materialsInput ? materialsInput.split(",").map((m) => m.trim()).filter((m) => m) : [];
    const { data: newProduct, error: insertError } = await supabase.from("products").insert([{
      name,
      description,
      price,
      category_id: categoryId || null,
      is_active: isActive,
      dimensions,
      materials
    }]).select().single();
    if (!insertError && newProduct) {
      return Astro2.redirect(`/admin/products/edit/${newProduct.id}`);
    } else if (insertError) {
      console.error("Error creating product:", insertError);
    }
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Add Product | Admin Dashboard | WIDI Furniture</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col bg-gray-100"> <header class="bg-amber-800 text-white py-4 px-6"> <nav class="flex justify-between items-center"> <h1 class="text-2xl font-bold">Admin Dashboard</h1> <div> <a href="/admin" class="mr-4 text-amber-200 hover:text-white">Dashboard</a> <a href="/admin/products" class="mr-4 text-amber-200 hover:text-white">Products</a> <a href="/" class="mr-4 text-amber-200 hover:text-white">Visit Site</a> <a href="/admin/logout" class="text-amber-200 hover:text-white">Logout</a> </div> </nav> </header> <main class="py-8 px-6 flex-grow"> <div class="max-w-3xl mx-auto"> <h2 class="text-3xl font-semibold text-amber-900 mb-6">Add New Product</h2> <form method="POST" class="space-y-6 bg-white p-6 rounded-lg shadow-md"> <div> <label for="name" class="block text-gray-700 mb-2">Product Name *</label> <input type="text" id="name" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label for="description" class="block text-gray-700 mb-2">Description</label> <textarea id="description" name="description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <div> <label for="price" class="block text-gray-700 mb-2">Price *</label> <input type="number" id="price" name="price" step="0.01" min="0" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label for="category_id" class="block text-gray-700 mb-2">Category</label> <select id="category_id" name="category_id" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> <option value="">Select a category</option> ${categories?.map((category) => renderTemplate`<option${addAttribute(category.id, "key")}${addAttribute(category.id, "value")}>${category.name}</option>`)} </select> </div> </div> <div> <label for="materials" class="block text-gray-700 mb-2">Materials</label> <input type="text" id="materials" name="materials" placeholder="Enter materials separated by commas (e.g., wood, metal, fabric)" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"> <div> <label for="length" class="block text-gray-700 mb-2">Length (cm)</label> <input type="number" id="length" name="length" step="0.01" min="0" placeholder="Length" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label for="width" class="block text-gray-700 mb-2">Width (cm)</label> <input type="number" id="width" name="width" step="0.01" min="0" placeholder="Width" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label for="height" class="block text-gray-700 mb-2">Height (cm)</label> <input type="number" id="height" name="height" step="0.01" min="0" placeholder="Height" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> </div> <div class="flex items-center"> <input type="checkbox" id="is_active" name="is_active" class="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"> <label for="is_active" class="ml-2 block text-gray-700">Active Product</label> </div> <div class="flex space-x-4"> <button type="submit" class="bg-amber-700 text-white py-2 px-6 rounded-md hover:bg-amber-800 transition-colors">
Create Product
</button> <a href="/admin/products" class="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors">
Cancel
</a> </div> </form> </div> </main> <footer class="bg-amber-800 text-white py-6 px-6 text-center"> <p>&copy; 2025 WIDI Furniture Admin. All rights reserved.</p> </footer> </body></html>`;
}, "/workspaces/website-furniture-r2/src/pages/admin/products/new.astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/admin/products/new.astro";
const $$url = "/admin/products/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
