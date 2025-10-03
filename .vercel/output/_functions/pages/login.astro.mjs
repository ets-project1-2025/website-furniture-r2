/* empty css                                 */
import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, r as renderTemplate } from '../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { g as getMessages } from '../chunks/config_wYDGN0uF.mjs';
import { s as supabase } from '../chunks/supabaseClient_DdVNsowi.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const locale = Astro2.url.pathname.startsWith("/en/") ? "en" : "id";
  const t = getMessages(locale);
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const email = formData.get("email");
      const password = formData.get("password");
      if (!supabase || typeof supabase.auth?.signInWithPassword !== "function") {
        console.error("Supabase client not properly initialized");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (!error) {
          const { data: { session } } = await supabase.auth.getSession();
          const { data: profile, error: profileError } = await supabase.from("profiles").select("full_name").eq("id", session?.user.id).single();
          if (!profileError && profile && profile.full_name === "Admin") {
            return Astro2.redirect(`/${locale}/admin`);
          } else {
            await supabase.auth.signOut();
          }
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }
  return renderTemplate`<html${addAttribute(locale, "lang")}> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${t["login_title"]} | WIDI Furniture</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex items-center justify-center bg-amber-50"> <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> <h2 class="text-2xl font-bold text-amber-900 mb-6 text-center">${t["login_title"]}</h2> <form method="POST" class="space-y-4"> <div> <label for="email" class="block text-gray-700 mb-2">${t["login_email"]}</label> <input type="email" id="email" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <div> <label for="password" class="block text-gray-700 mb-2">${t["login_password"]}</label> <input type="password" id="password" name="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"> </div> <button type="submit" class="w-full bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors"> ${t["login_button"]} </button> </form> <div class="mt-4 text-center"> <a${addAttribute(`/${locale}`, "href")} class="text-amber-700 hover:underline">${t["login_back_to_home"]}</a> </div> </div> </body></html>`;
}, "/workspaces/website-furniture-r2/src/pages/login.astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
