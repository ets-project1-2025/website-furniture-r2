import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderScript, r as renderTemplate } from '../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getMessages, d as defaultLocale } from '../chunks/config_BvrzYFJu.mjs';
import { s as supabase } from '../chunks/supabaseClient_DdVNsowi.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const locale = Astro2.url.pathname.startsWith("/en/") ? "en" : "id";
  const t = getMessages(locale);
  let session = null;
  try {
    if (supabase && typeof supabase.auth.getSession === "function") {
      const sessionResponse = await supabase.auth.getSession();
      session = sessionResponse?.data?.session || null;
    }
  } catch (error) {
    console.error("Error getting session:", error);
    session = null;
  }
  return renderTemplate`<html${addAttribute(locale, "lang")}> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${t["home_title"]}</title><meta name="description"${addAttribute(t["home_description"], "content")}><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col"> <header class="bg-amber-100 shadow-md py-4 px-6"> <nav class="flex justify-between items-center"> <a${addAttribute(`/${locale !== defaultLocale ? locale : ""}`, "href")} class="text-2xl font-bold text-amber-900">WIDI Furniture</a> <ul class="flex space-x-6"> <li><a class="text-gray-700 hover:text-amber-800 transition-colors"${addAttribute(`/${locale !== defaultLocale ? locale : ""}`, "href")}>${t["nav_home"]}</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors"${addAttribute(`/${locale !== defaultLocale ? locale : ""}/products`, "href")}>${t["nav_products"]}</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors"${addAttribute(`/${locale !== defaultLocale ? locale : ""}/about`, "href")}>${t["nav_about"]}</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors"${addAttribute(`/${locale !== defaultLocale ? locale : ""}/contact`, "href")}>${t["nav_contact"]}</a></li> ${session ? renderTemplate`<li><a class="text-gray-700 hover:text-amber-800 transition-colors"${addAttribute(`/${locale !== defaultLocale ? locale : ""}/profile`, "href")}>${t["nav_profile"]}</a></li>` : renderTemplate`<li><a class="text-gray-700 hover:text-amber-800 transition-colors"${addAttribute(`/${locale !== defaultLocale ? locale : ""}/login`, "href")}>${t["nav_login"]}</a></li>`} <li> <select onchange="window.location = this.value;" class="bg-amber-50 text-gray-700 px-2 py-1 rounded-md"> <option value="/"${addAttribute(locale === "id" ? "selected" : "", "locale === 'id' ? 'selected' : ''")}>ID</option> <option value="/en"${addAttribute(locale === "en" ? "selected" : "", "locale === 'en' ? 'selected' : ''")}>EN</option> </select> </li> </ul> </nav> </header> <main class="py-8 px-6 flex-grow"> <section class="text-center py-12"> <h2 class="text-4xl font-bold text-amber-900 mb-4">${t["home_welcome"]}</h2> <p class="text-xl text-gray-700 max-w-2xl mx-auto">${t["home_description"]}</p> </section> <section class="py-8"> <h3 class="text-2xl font-semibold text-amber-900 mb-6 text-center">${t["featured_products"]}</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <div class="product-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"> <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48"></div> <div class="p-4"> <h4 class="text-lg font-semibold text-gray-800">Modern Chair</h4> <p class="text-amber-700 font-bold mt-2">$199.99</p> </div> </div> <div class="product-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"> <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48"></div> <div class="p-4"> <h4 class="text-lg font-semibold text-gray-800">Elegant Sofa</h4> <p class="text-amber-700 font-bold mt-2">$899.99</p> </div> </div> <div class="product-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"> <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48"></div> <div class="p-4"> <h4 class="text-lg font-semibold text-gray-800">Designer Table</h4> <p class="text-amber-700 font-bold mt-2">$599.99</p> </div> </div> </div> </section> </main> <footer class="bg-amber-100 py-6 px-6 text-center text-gray-600"> <p>${t["footer_copyright"]} &copy; 2025 WIDI Furniture. All rights reserved.</p> </footer> ${renderScript($$result, "/workspaces/website-furniture-r2/src/pages/[locale]/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/workspaces/website-furniture-r2/src/pages/[locale]/index.astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/[locale]/index.astro";
const $$url = "/[locale]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
