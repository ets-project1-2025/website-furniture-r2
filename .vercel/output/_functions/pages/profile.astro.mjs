/* empty css                                 */
import { e as createComponent, f as createAstro, k as renderHead, l as renderScript, h as addAttribute, r as renderTemplate } from '../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../chunks/supabaseClient_DD_SplUw.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return Astro2.redirect("/login");
  }
  const { data: profile, error: profileError } = await supabase.from("profiles").select("full_name, avatar_url, loyalty_points").eq("id", session.user.id).single();
  if (profileError) {
    console.error("Error fetching profile:", profileError);
  }
  const { data: wishlistItems, error: wishlistError } = await supabase.from("wishlists").select(`
    id,
    products(id, name, price, is_active, product_images(image_url, is_primary))
  `).eq("user_id", session.user.id).order("created_at", { ascending: false });
  if (wishlistError) {
    console.error("Error fetching wishlist:", wishlistError);
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>User Profile | WIDI Furniture</title><meta name="description" content="Your profile and wishlist"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col"> <header class="bg-amber-100 shadow-md py-4 px-6"> <nav class="flex justify-between items-center"> <a href="/" class="text-2xl font-bold text-amber-900">WIDI Furniture</a> <ul class="flex space-x-6"> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/">Home</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/products">Products</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/lookbooks">Lookbooks</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors font-semibold" href="/profile">Profile</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/login">Login</a></li> </ul> </nav> </header> <main class="py-8 px-6 flex-grow"> <div class="max-w-6xl mx-auto"> <h1 class="text-3xl font-bold text-amber-900 mb-8">User Profile</h1> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Profile Info --> <div class="lg:col-span-1"> <div class="bg-white rounded-lg shadow-md p-6"> <div class="flex flex-col items-center"> <div class="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 flex items-center justify-center text-gray-500 mb-4"> ${profile?.avatar_url ? renderTemplate`<img${addAttribute(profile.avatar_url, "src")} alt="Avatar" class="rounded-full w-full h-full object-cover">` : renderTemplate`<span class="text-3xl">👤</span>`} </div> <h2 class="text-xl font-semibold text-gray-800">${profile?.full_name || "User"}</h2> <div class="mt-4 w-full"> <div class="flex justify-between items-center py-2 border-b border-gray-100"> <span class="text-gray-600">Loyalty Points:</span> <span class="font-semibold text-amber-700">${profile?.loyalty_points || 0}</span> </div> <div class="flex justify-between items-center py-2 border-b border-gray-100"> <span class="text-gray-600">Wishlist Items:</span> <span class="font-semibold text-amber-700">${wishlistItems?.length || 0}</span> </div> </div> </div> </div> </div> <!-- Wishlist Section --> <div class="lg:col-span-2"> <div class="bg-white rounded-lg shadow-md p-6"> <div class="flex justify-between items-center mb-6"> <h2 class="text-2xl font-semibold text-amber-800">Your Wishlist (${wishlistItems?.length || 0} items)</h2> </div> ${wishlistItems && wishlistItems.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${wishlistItems.map((item) => renderTemplate`<div${addAttribute(item.id, "key")} class="product-card flex"> <div class="bg-gray-200 border-2 border-dashed rounded-lg w-24 h-24 flex-shrink-0 mr-4"></div> <div class="flex-grow"> <h3 class="text-lg font-semibold text-gray-800">${item.products?.name}</h3> <p class="text-amber-700 font-bold mt-1">Rp${item.products?.price?.toLocaleString("id-ID")}</p> <div class="mt-2 flex space-x-2"> <a${addAttribute(`/products/${item.products?.id}`, "href")} class="text-xs bg-amber-700 text-white py-1 px-2 rounded hover:bg-amber-800 transition-colors">
View Details
</a> <button class="remove-from-wishlist-btn text-xs border border-red-700 text-red-700 py-1 px-2 rounded hover:bg-red-50 transition-colors"${addAttribute(item.id, "data-wishlist-id")}>
Remove
</button> </div> </div> </div>`)} </div>` : renderTemplate`<div class="text-center py-8"> <p class="text-gray-600">Your wishlist is empty.</p> <a href="/products" class="inline-block mt-4 text-amber-700 hover:underline">Browse Products</a> </div>`} </div> <!-- Loyalty Points History --> <div class="bg-white rounded-lg shadow-md p-6 mt-6"> <h2 class="text-2xl font-semibold text-amber-800 mb-6">Loyalty Points History</h2> <div class="overflow-x-auto"> <table class="min-w-full divide-y divide-gray-200"> <thead class="bg-amber-100"> <tr> <th class="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Date</th> <th class="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Reason</th> <th class="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Points</th> </tr> </thead> <tbody class="bg-white divide-y divide-gray-200"> <tr> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01-15</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">First Purchase</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-700 font-semibold">+100</td> </tr> <tr> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01-20</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Product Review</td> <td class="px-6 py-4 whitespace-nowrap text-sm text-amber-700 font-semibold">+50</td> </tr> </tbody> </table> </div> </div> </div> </div> </div> </main> <footer class="bg-amber-100 py-6 px-6 text-center text-gray-600"> <p>&copy; 2025 WIDI Furniture. All rights reserved.</p> </footer> ${renderScript($$result, "/workspaces/website-furniture-r2/src/pages/profile/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/workspaces/website-furniture-r2/src/pages/profile/index.astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/profile/index.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
