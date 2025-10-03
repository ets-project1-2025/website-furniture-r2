/* empty css                                 */
import { e as createComponent, f as createAstro, k as renderHead, r as renderTemplate } from '../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../chunks/supabaseClient_DdVNsowi.mjs';
export { renderers } from '../renderers.mjs';

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
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Admin Dashboard | WIDI Furniture</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col bg-gray-100"> <header class="bg-amber-800 text-white py-4 px-6"> <nav class="flex justify-between items-center"> <h1 class="text-2xl font-bold">Admin Dashboard</h1> <div> <a href="/" class="mr-4 text-amber-200 hover:text-white">Visit Site</a> <a href="/admin/logout" class="text-amber-200 hover:text-white">Logout</a> </div> </nav> </header> <main class="py-8 px-6 flex-grow"> <div class="max-w-6xl mx-auto"> <h2 class="text-3xl font-semibold text-amber-900 mb-8">Admin Dashboard</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <a href="/admin/products" class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"> <h3 class="text-xl font-semibold text-amber-800 mb-2">Products</h3> <p class="text-gray-600">Manage your product catalog</p> </a> <a href="/admin/categories" class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"> <h3 class="text-xl font-semibold text-amber-800 mb-2">Categories</h3> <p class="text-gray-600">Manage product categories</p> </a> <a href="/admin/lookbooks" class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"> <h3 class="text-xl font-semibold text-amber-800 mb-2">Lookbooks</h3> <p class="text-gray-600">Manage "Shop the Look" galleries</p> </a> </div> </div> </main> <footer class="bg-amber-800 text-white py-6 px-6 text-center"> <p>&copy; 2025 WIDI Furniture Admin. All rights reserved.</p> </footer> </body></html>`;
}, "/workspaces/website-furniture-r2/src/pages/admin/index.astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
