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
  const productId = Astro2.params.id;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return Astro2.redirect("/login");
  }
  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", session.user.id).single();
  if (!profile || profile.full_name !== "Admin") {
    return Astro2.redirect("/");
  }
  const { data: product, error: productError } = await supabase.from("products").select("id, name").eq("id", productId).single();
  if (productError || !product) {
    return Astro2.redirect("/admin/products");
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const confirmDelete = formData.get("confirm_delete");
    if (confirmDelete === "yes") {
      const { error: deleteError } = await supabase.from("products").delete().eq("id", productId);
      if (!deleteError) {
        return Astro2.redirect("/admin/products");
      } else {
        console.error("Error deleting product:", deleteError);
      }
    } else {
      return Astro2.redirect(`/admin/products/edit/${productId}`);
    }
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Delete Product | Admin Dashboard | WIDI Furniture</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col bg-gray-100"> <header class="bg-amber-800 text-white py-4 px-6"> <nav class="flex justify-between items-center"> <h1 class="text-2xl font-bold">Admin Dashboard</h1> <div> <a href="/admin" class="mr-4 text-amber-200 hover:text-white">Dashboard</a> <a href="/admin/products" class="mr-4 text-amber-200 hover:text-white">Products</a> <a href="/" class="mr-4 text-amber-200 hover:text-white">Visit Site</a> <a href="/admin/logout" class="text-amber-200 hover:text-white">Logout</a> </div> </nav> </header> <main class="py-8 px-6 flex-grow"> <div class="max-w-3xl mx-auto"> <h2 class="text-3xl font-semibold text-amber-900 mb-6">Delete Product</h2> <div class="bg-white p-6 rounded-lg shadow-md"> <p class="text-gray-700 mb-4">Are you sure you want to delete the product <strong>${product?.name}</strong>?</p> <p class="text-red-600 font-semibold mb-6">Warning: This action cannot be undone.</p> <form method="POST" class="space-y-4"> <div class="flex items-center"> <input type="checkbox" id="confirm_delete" name="confirm_delete" value="yes" required class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"> <label for="confirm_delete" class="ml-2 block text-gray-700">Yes, I want to delete this product</label> </div> <div class="flex space-x-4"> <button type="submit" class="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-colors">
Delete Product
</button> <a${addAttribute(`/admin/products/edit/${product?.id}`, "href")} class="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors">
Cancel
</a> </div> </form> </div> </div> </main> <footer class="bg-amber-800 text-white py-6 px-6 text-center"> <p>&copy; 2025 WIDI Furniture Admin. All rights reserved.</p> </footer> </body></html>`;
}, "/workspaces/website-furniture-r2/src/pages/admin/products/delete/[id].astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/admin/products/delete/[id].astro";
const $$url = "/admin/products/delete/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
