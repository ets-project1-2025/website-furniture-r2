import { d as defineMiddleware, s as sequence } from './chunks/index_zG0fFTjl.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_CCSgdXEr.mjs';
import 'kleur/colors';
import './chunks/astro/server_Z03RFxYs.mjs';
import 'clsx';
import 'cookie';

const onRequest$1 = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith("/admin")) ;
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
