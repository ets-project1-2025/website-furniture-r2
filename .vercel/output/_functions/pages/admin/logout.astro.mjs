import { e as createComponent, f as createAstro } from '../../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../../chunks/supabaseClient_DdVNsowi.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Logout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  await supabase.auth.signOut();
  return Astro2.redirect("/");
}, "/workspaces/website-furniture-r2/src/pages/admin/logout.astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/admin/logout.astro";
const $$url = "/admin/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
