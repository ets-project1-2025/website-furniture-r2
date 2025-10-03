import { defineMiddleware } from 'astro:middleware';
import { supabase } from './lib/supabaseClient';
import { locales, defaultLocale } from './i18n/config';

export const onRequest = defineMiddleware(async (context, next) => {
  // Redirect to default locale if no locale is specified in the path
  const pathParts = context.url.pathname.split('/').filter(part => part !== '');
  const hasLocale = pathParts.length > 0 && locales[pathParts[0]];
  
  if (!hasLocale && !context.url.pathname.startsWith('/admin') && !context.url.pathname.startsWith('/login')) {
    // Redirect to default locale
    const newPath = `/${defaultLocale}${context.url.pathname}`;
    return context.redirect(newPath);
  }

  // Periksa apakah path dimulai dengan /admin
  if (context.url.pathname.startsWith('/admin') || context.url.pathname.startsWith('/id/admin') || context.url.pathname.startsWith('/en/admin')) {
    try {
      // Ambil sesi pengguna
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        // Jika tidak ada sesi atau terjadi error, arahkan ke halaman login
        return context.redirect('/login');
      }

      // Periksa apakah pengguna adalah admin
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profile || profile.full_name !== 'Admin') {
        // Jika bukan admin, arahkan ke homepage
        return context.redirect('/');
      }
    } catch (error) {
      console.error('Error in admin middleware:', error);
      // Jika terjadi error, arahkan ke homepage
      return context.redirect('/');
    }
  }

  // Lanjutkan ke rute berikutnya
  return next();
});