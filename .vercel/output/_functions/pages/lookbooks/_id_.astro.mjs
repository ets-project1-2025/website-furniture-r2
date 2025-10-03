/* empty css                                    */
import { e as createComponent, f as createAstro, k as renderHead, h as addAttribute, l as renderScript, r as renderTemplate } from '../../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../../chunks/supabaseClient_DD_SplUw.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const galleryId = Astro2.params.id;
  const { data: gallery, error: galleryError } = await supabase.from("lookbook_galleries").select("id, title, description, cover_image_url").eq("id", galleryId).eq("is_active", true).single();
  if (galleryError || !gallery) {
    return Astro2.redirect("/lookbooks");
  }
  const { data: hotspots, error: hotspotsError } = await supabase.from("lookbook_hotspots").select(`
    id,
    coordinates,
    hotspot_label,
    products(id, name, price, is_active)
  `).eq("gallery_id", galleryId).eq("products.is_active", true);
  if (hotspotsError) {
    console.error("Error fetching hotspots:", hotspotsError);
  }
  const { data: relatedGalleries, error: relatedError } = await supabase.from("lookbook_galleries").select("id, title, cover_image_url").eq("is_active", true).neq("id", galleryId).limit(3);
  if (relatedError) {
    console.error("Error fetching related galleries:", relatedError);
  }
  return renderTemplate`<html lang="en" data-astro-cid-zygsgyel> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${gallery.title} | Lookbooks | WIDI Furniture</title><meta name="description" content="{gallery.description}"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col" data-astro-cid-zygsgyel> <header class="bg-amber-100 shadow-md py-4 px-6" data-astro-cid-zygsgyel> <nav class="flex justify-between items-center" data-astro-cid-zygsgyel> <a href="/" class="text-2xl font-bold text-amber-900" data-astro-cid-zygsgyel>WIDI Furniture</a> <ul class="flex space-x-6" data-astro-cid-zygsgyel> <li data-astro-cid-zygsgyel><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/" data-astro-cid-zygsgyel>Home</a></li> <li data-astro-cid-zygsgyel><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/products" data-astro-cid-zygsgyel>Products</a></li> <li data-astro-cid-zygsgyel><a class="text-gray-700 hover:text-amber-800 transition-colors font-semibold" href="/lookbooks" data-astro-cid-zygsgyel>Lookbooks</a></li> <li data-astro-cid-zygsgyel><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/about" data-astro-cid-zygsgyel>About</a></li> <li data-astro-cid-zygsgyel><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/contact" data-astro-cid-zygsgyel>Contact</a></li> <li data-astro-cid-zygsgyel><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/login" data-astro-cid-zygsgyel>Login</a></li> </ul> </nav> </header> <main class="py-8 px-6 flex-grow" data-astro-cid-zygsgyel> <div class="max-w-7xl mx-auto" data-astro-cid-zygsgyel> <div class="mb-6" data-astro-cid-zygsgyel> <a href="/lookbooks" class="text-amber-700 hover:underline" data-astro-cid-zygsgyel>&larr; Back to Lookbooks</a> </div> <h1 class="text-3xl font-bold text-amber-900 mb-2" data-astro-cid-zygsgyel>${gallery.title}</h1> <p class="text-gray-600 mb-8" data-astro-cid-zygsgyel>${gallery.description}</p> <div class="hotspot-image-container" data-astro-cid-zygsgyel> <img${addAttribute(gallery.cover_image_url, "src")}${addAttribute(gallery.title, "alt")} class="w-full h-auto rounded-lg shadow-md" id="lookbookImage" data-astro-cid-zygsgyel> ${hotspots?.map((hotspot) => renderTemplate`<div${addAttribute(hotspot.id, "key")} class="hotspot-marker"${addAttribute(`left: ${hotspot.coordinates.x}px; top: ${hotspot.coordinates.y}px;`, "style")}${addAttribute(hotspot.id, "data-hotspot-id")}${addAttribute(hotspot.products?.id, "data-product-id")}${addAttribute(hotspot.products?.name, "data-product-name")}${addAttribute(hotspot.products?.price, "data-product-price")} data-astro-cid-zygsgyel></div>`)}  ${hotspots?.map((hotspot) => renderTemplate`<div${addAttribute(`popup-${hotspot.id}`, "key")}${addAttribute(`popup-${hotspot.id}`, "id")} class="hotspot-popup" data-astro-cid-zygsgyel> <div class="bg-gray-200 border-2 border-dashed rounded-lg w-full h-32 mb-2" data-astro-cid-zygsgyel></div> <h3 class="font-semibold text-gray-800" data-astro-cid-zygsgyel>${hotspot.products?.name}</h3> <p class="text-amber-700 font-bold" data-astro-cid-zygsgyel>Rp${hotspot.products?.price?.toLocaleString("id-ID")}</p> <div class="mt-2 flex space-x-2" data-astro-cid-zygsgyel> <a${addAttribute(`/products/${hotspot.products?.id}`, "href")} class="text-xs bg-amber-700 text-white py-1 px-2 rounded hover:bg-amber-800 transition-colors" data-astro-cid-zygsgyel>
View Details
</a> <button class="text-xs border border-amber-700 text-amber-700 py-1 px-2 rounded hover:bg-amber-50 transition-colors" data-astro-cid-zygsgyel>
Add to Cart
</button> </div> </div>`)} </div> <div class="mt-8" data-astro-cid-zygsgyel> <h2 class="text-2xl font-bold text-amber-900 mb-4" data-astro-cid-zygsgyel>Featured Items</h2> <div class="grid grid-cols-2 md:grid-cols-4 gap-4" data-astro-cid-zygsgyel> ${hotspots?.map((hotspot) => renderTemplate`<a${addAttribute(`/products/${hotspot.products?.id}`, "href")} class="product-card flex flex-col" data-astro-cid-zygsgyel> <div class="bg-gray-200 border-2 border-dashed rounded-lg w-full h-32 mb-2" data-astro-cid-zygsgyel></div> <div class="p-2 flex-grow" data-astro-cid-zygsgyel> <h3 class="text-sm font-semibold text-gray-800 truncate" data-astro-cid-zygsgyel>${hotspot.products?.name}</h3> <p class="text-amber-700 font-bold text-sm" data-astro-cid-zygsgyel>Rp${hotspot.products?.price?.toLocaleString("id-ID")}</p> </div> </a>`)} </div> </div> </div> <!-- Related galleries --> ${relatedGalleries && relatedGalleries.length > 0 && renderTemplate`<div class="mt-16 max-w-7xl mx-auto" data-astro-cid-zygsgyel> <h2 class="text-2xl font-bold text-amber-900 mb-6" data-astro-cid-zygsgyel>More Looks</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-astro-cid-zygsgyel> ${relatedGalleries.map((relatedGallery) => renderTemplate`<a${addAttribute(`/lookbooks/${relatedGallery.id}`, "href")} class="product-card group" data-astro-cid-zygsgyel> <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48" data-astro-cid-zygsgyel></div> <div class="p-4" data-astro-cid-zygsgyel> <h3 class="text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition-colors" data-astro-cid-zygsgyel> ${relatedGallery.title} </h3> </div> </a>`)} </div> </div>`} </main> <footer class="bg-amber-100 py-6 px-6 text-center text-gray-600" data-astro-cid-zygsgyel> <p data-astro-cid-zygsgyel>&copy; 2025 WIDI Furniture. All rights reserved.</p> </footer> ${renderScript($$result, "/workspaces/website-furniture-r2/src/pages/lookbooks/[id].astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/workspaces/website-furniture-r2/src/pages/lookbooks/[id].astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/lookbooks/[id].astro";
const $$url = "/lookbooks/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
