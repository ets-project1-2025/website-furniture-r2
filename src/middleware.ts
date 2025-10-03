import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Hanya terapkan proteksi ke route /admin
  if (context.url.pathname.startsWith('/admin')) {
    // Lewati middleware ini untuk sekarang dan kita tambahkan fungsionalitas nanti
  }
  
  return next();
});