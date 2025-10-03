import { d as defineMiddleware, s as sequence } from './chunks/index_zG0fFTjl.mjs';
import { s as supabase } from './chunks/supabaseClient_DdVNsowi.mjs';
import { l as locales, d as defaultLocale } from './chunks/config_wYDGN0uF.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_CCSgdXEr.mjs';
import 'kleur/colors';
import './chunks/astro/server_Z03RFxYs.mjs';
import 'clsx';
import 'cookie';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const pathParts = context.url.pathname.split("/").filter((part) => part !== "");
  const hasLocale = pathParts.length > 0 && locales[pathParts[0]];
  if (!hasLocale && !context.url.pathname.startsWith("/admin") && !context.url.pathname.startsWith("/login")) {
    const newPath = `/${defaultLocale}${context.url.pathname}`;
    return context.redirect(newPath);
  }
  if (context.url.pathname.startsWith("/admin") || context.url.pathname.startsWith("/id/admin") || context.url.pathname.startsWith("/en/admin")) {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        return context.redirect("/login");
      }
      const { data: profile, error: profileError } = await supabase.from("profiles").select("full_name").eq("id", session.user.id).single();
      if (profileError || !profile || profile.full_name !== "Admin") {
        return context.redirect("/");
      }
    } catch (error) {
      console.error("Error in admin middleware:", error);
      return context.redirect("/");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
