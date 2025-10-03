/* empty css                                          */
import { e as createComponent, f as createAstro, k as renderHead, h as addAttribute, r as renderTemplate } from '../../../../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../../../../chunks/supabaseClient_DdVNsowi.mjs';
/* empty css                                          */
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const galleryId = Astro2.params.id;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return Astro2.redirect("/login");
  }
  const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", session.user.id).single();
  if (!profile || profile.full_name !== "Admin") {
    return Astro2.redirect("/");
  }
  const { data: gallery, error: galleryError } = await supabase.from("lookbook_galleries").select("id, title, cover_image_url").eq("id", galleryId).single();
  if (galleryError || !gallery) {
    return Astro2.redirect("/admin/lookbooks");
  }
  const { data: hotspots, error: hotspotsError } = await supabase.from("lookbook_hotspots").select(`
    id, 
    coordinates,
    hotspot_label,
    products(name)
  `).eq("gallery_id", galleryId).order("created_at", { ascending: true });
  if (hotspotsError) {
    console.error("Error fetching hotspots:", hotspotsError);
  }
  const { data: products, error: productsError } = await supabase.from("products").select("id, name").eq("is_active", true).order("name");
  if (productsError) {
    console.error("Error fetching products:", productsError);
  }
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const productId = formData.get("product_id");
    const hotspotLabel = formData.get("hotspot_label");
    const x = parseFloat(formData.get("x"));
    const y = parseFloat(formData.get("y"));
    const coordinates = { x, y };
    const { error: insertError } = await supabase.from("lookbook_hotspots").insert([{
      gallery_id: galleryId,
      product_id: productId,
      coordinates,
      hotspot_label: hotspotLabel
    }]);
    if (!insertError) {
      return Astro2.redirect(`/admin/lookbooks/${galleryId}/hotspots`);
    } else {
      console.error("Error creating hotspot:", insertError);
    }
  }
  return renderTemplate`<html lang="en" data-astro-cid-rmtt4sgk> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Hotspots for ${gallery.title} | Admin Dashboard | WIDI Furniture</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col bg-gray-100" data-astro-cid-rmtt4sgk> <header class="bg-amber-800 text-white py-4 px-6" data-astro-cid-rmtt4sgk> <nav class="flex justify-between items-center" data-astro-cid-rmtt4sgk> <h1 class="text-2xl font-bold" data-astro-cid-rmtt4sgk>Admin Dashboard</h1> <div data-astro-cid-rmtt4sgk> <a href="/admin" class="mr-4 text-amber-200 hover:text-white" data-astro-cid-rmtt4sgk>Dashboard</a> <a href="/admin/lookbooks" class="mr-4 text-amber-200 hover:text-white" data-astro-cid-rmtt4sgk>Lookbooks</a> <a href="/" class="mr-4 text-amber-200 hover:text-white" data-astro-cid-rmtt4sgk>Visit Site</a> <a href="/admin/logout" class="text-amber-200 hover:text-white" data-astro-cid-rmtt4sgk>Logout</a> </div> </nav> </header> <main class="py-8 px-6 flex-grow" data-astro-cid-rmtt4sgk> <div class="max-w-6xl mx-auto" data-astro-cid-rmtt4sgk> <div class="mb-6" data-astro-cid-rmtt4sgk> <a${addAttribute(`/admin/lookbooks/edit/${galleryId}`, "href")} class="text-amber-700 hover:underline" data-astro-cid-rmtt4sgk>&larr; Back to Gallery</a> </div> <h2 class="text-3xl font-semibold text-amber-900 mb-6" data-astro-cid-rmtt4sgk>Manage Hotspots for: ${gallery.title}</h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8" data-astro-cid-rmtt4sgk> <!-- Image with hotspots --> <div data-astro-cid-rmtt4sgk> <h3 class="text-xl font-semibold text-amber-800 mb-4" data-astro-cid-rmtt4sgk>Gallery Image</h3> <div class="hotspot-image-container" data-astro-cid-rmtt4sgk> <img${addAttribute(gallery.cover_image_url, "src")}${addAttribute(gallery.title, "alt")} class="w-full h-auto rounded-lg shadow-md" id="galleryImage" data-astro-cid-rmtt4sgk> ${hotspots?.map((hotspot) => renderTemplate`<div class="hotspot-marker"${addAttribute(`left: ${hotspot.coordinates.x}px; top: ${hotspot.coordinates.y}px;`, "style")}${addAttribute(`${hotspot.hotspot_label}: ${hotspot.products?.name}`, "title")} data-astro-cid-rmtt4sgk></div>`)} </div> </div> <!-- Form to add new hotspot --> <div data-astro-cid-rmtt4sgk> <h3 class="text-xl font-semibold text-amber-800 mb-4" data-astro-cid-rmtt4sgk>Add New Hotspot</h3> <form method="POST" class="space-y-4 bg-white p-6 rounded-lg shadow-md" data-astro-cid-rmtt4sgk> <div data-astro-cid-rmtt4sgk> <label for="product_id" class="block text-gray-700 mb-2" data-astro-cid-rmtt4sgk>Product *</label> <select id="product_id" name="product_id" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" data-astro-cid-rmtt4sgk> <option value="" data-astro-cid-rmtt4sgk>Select a product</option> ${products?.map((product) => renderTemplate`<option${addAttribute(product.id, "key")}${addAttribute(product.id, "value")} data-astro-cid-rmtt4sgk>${product.name}</option>`)} </select> </div> <div data-astro-cid-rmtt4sgk> <label for="hotspot_label" class="block text-gray-700 mb-2" data-astro-cid-rmtt4sgk>Hotspot Label</label> <input type="text" id="hotspot_label" name="hotspot_label" placeholder="e.g., Chair, Table, Lamp" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" data-astro-cid-rmtt4sgk> </div> <div class="grid grid-cols-2 gap-4" data-astro-cid-rmtt4sgk> <div data-astro-cid-rmtt4sgk> <label for="x" class="block text-gray-700 mb-2" data-astro-cid-rmtt4sgk>X Coordinate *</label> <input type="number" id="x" name="x" min="0" required placeholder="X position" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" data-astro-cid-rmtt4sgk> </div> <div data-astro-cid-rmtt4sgk> <label for="y" class="block text-gray-700 mb-2" data-astro-cid-rmtt4sgk>Y Coordinate *</label> <input type="number" id="y" name="y" min="0" required placeholder="Y position" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" data-astro-cid-rmtt4sgk> </div> </div> <div class="text-sm text-gray-500" data-astro-cid-rmtt4sgk> <p data-astro-cid-rmtt4sgk>Click on the image to get coordinates (JavaScript implementation needed)</p> </div> <button type="submit" class="w-full bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors" data-astro-cid-rmtt4sgk>
Add Hotspot
</button> </form> </div> </div> <!-- List of existing hotspots --> <div class="mt-12" data-astro-cid-rmtt4sgk> <h3 class="text-xl font-semibold text-amber-800 mb-4" data-astro-cid-rmtt4sgk>Existing Hotspots</h3> <div class="bg-white rounded-lg shadow-md overflow-hidden" data-astro-cid-rmtt4sgk> <table class="min-w-full divide-y divide-gray-200" data-astro-cid-rmtt4sgk> <thead class="bg-amber-100" data-astro-cid-rmtt4sgk> <tr data-astro-cid-rmtt4sgk> <th class="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider" data-astro-cid-rmtt4sgk>Label</th> <th class="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider" data-astro-cid-rmtt4sgk>Product</th> <th class="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider" data-astro-cid-rmtt4sgk>Coordinates</th> <th class="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider" data-astro-cid-rmtt4sgk>Actions</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200" data-astro-cid-rmtt4sgk> ${hotspots?.map((hotspot) => renderTemplate`<tr${addAttribute(hotspot.id, "key")} data-astro-cid-rmtt4sgk> <td class="px-6 py-4 whitespace-nowrap" data-astro-cid-rmtt4sgk> <div class="text-sm font-medium text-gray-900" data-astro-cid-rmtt4sgk>${hotspot.hotspot_label}</div> </td> <td class="px-6 py-4 whitespace-nowrap" data-astro-cid-rmtt4sgk> <div class="text-sm text-gray-500" data-astro-cid-rmtt4sgk>${hotspot.products?.name}</div> </td> <td class="px-6 py-4 whitespace-nowrap" data-astro-cid-rmtt4sgk> <div class="text-sm text-gray-500" data-astro-cid-rmtt4sgk>X: ${hotspot.coordinates.x}, Y: ${hotspot.coordinates.y}</div> </td> <td class="px-6 py-4 whitespace-nowrap text-sm" data-astro-cid-rmtt4sgk> <a${addAttribute(`/admin/lookbooks/${galleryId}/hotspots/edit/${hotspot.id}`, "href")} class="text-amber-600 hover:text-amber-900 mr-4" data-astro-cid-rmtt4sgk>
Edit
</a> <a${addAttribute(`/admin/lookbooks/${galleryId}/hotspots/delete/${hotspot.id}`, "href")} class="text-red-600 hover:text-red-900" data-astro-cid-rmtt4sgk>
Delete
</a> </td> </tr>`)} </tbody> </table> </div> </div> </div> </main> <footer class="bg-amber-800 text-white py-6 px-6 text-center" data-astro-cid-rmtt4sgk> <p data-astro-cid-rmtt4sgk>&copy; 2025 WIDI Furniture Admin. All rights reserved.</p> </footer> </body></html>`;
}, "/workspaces/website-furniture-r2/src/pages/admin/lookbooks/[id]/hotspots/index.astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/admin/lookbooks/[id]/hotspots/index.astro";
const $$url = "/admin/lookbooks/[id]/hotspots";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
