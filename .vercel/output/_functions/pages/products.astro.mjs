import { e as createComponent, k as renderHead, h as addAttribute, r as renderTemplate } from '../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../chunks/supabaseClient_DdVNsowi.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: products, error: productsError } = await supabase.from("products").select(`
    id, 
    name, 
    description, 
    price, 
    is_active,
    categories(name)
  `).eq("is_active", true).order("created_at", { ascending: false });
  if (productsError) {
    console.error("Error fetching products:", productsError);
  }
  const { data: categories, error: categoriesError } = await supabase.from("categories").select("id, name").order("name");
  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError);
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Products | WIDI Furniture</title><meta name="description" content="Browse our collection of modern furniture"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col"> <header class="bg-amber-100 shadow-md py-4 px-6"> <nav class="flex justify-between items-center"> <a href="/" class="text-2xl font-bold text-amber-900">WIDI Furniture</a> <ul class="flex space-x-6"> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/">Home</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors font-semibold" href="/products">Products</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/about">About</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/contact">Contact</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/login">Login</a></li> </ul> </nav> </header> <main class="py-8 px-6 flex-grow"> <div class="max-w-7xl mx-auto"> <h1 class="text-3xl font-bold text-amber-900 mb-2">Our Products</h1> <p class="text-gray-600 mb-8">Discover our collection of modern and elegant furniture</p> <div class="mb-8"> <h2 class="text-xl font-semibold text-amber-800 mb-4">Filter by Category</h2> <div class="flex flex-wrap gap-2"> <a href="/products" class="px-4 py-2 bg-amber-200 text-amber-800 rounded-full hover:bg-amber-300 transition-colors">
All Products
</a> ${categories?.map((category) => renderTemplate`<a${addAttribute(`/products?category=${category.id}`, "href")} class="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"> ${category.name} </a>`)} </div> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"> ${products?.map((product) => renderTemplate`<a${addAttribute(`/products/${product.id}`, "href")} class="product-card group"> <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center text-gray-500">
Product Image
</div> <div class="p-4"> <h3 class="text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition-colors"> ${product.name} </h3> <p class="text-amber-700 font-bold mt-2">Rp${product.price?.toLocaleString("id-ID")}</p> <p class="text-gray-600 text-sm mt-2 line-clamp-2"> ${product.description?.substring(0, 100) + (product.description?.length > 100 ? "..." : "")} </p> <p class="text-xs text-gray-500 mt-2"> ${product.categories?.name || "Uncategorized"} </p> </div> </a>`)} </div> ${(!products || products.length === 0) && renderTemplate`<div class="text-center py-12"> <p class="text-gray-600 text-lg">No products available at the moment.</p> </div>`} </div> </main> <footer class="bg-amber-100 py-6 px-6 text-center text-gray-600"> <p>&copy; 2025 WIDI Furniture. All rights reserved.</p> </footer> </body></html>`;
}, "/workspaces/website-furniture-r2/src/pages/products/index.astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/products/index.astro";
const $$url = "/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
