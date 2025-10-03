import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_D1CRdw8N.mjs';
import { manifest } from './manifest_DnubLVCi.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/categories/delete/_id_.astro.mjs');
const _page2 = () => import('./pages/admin/categories/edit/_id_.astro.mjs');
const _page3 = () => import('./pages/admin/categories/new.astro.mjs');
const _page4 = () => import('./pages/admin/categories.astro.mjs');
const _page5 = () => import('./pages/admin/logout.astro.mjs');
const _page6 = () => import('./pages/admin/lookbooks/edit/_id_.astro.mjs');
const _page7 = () => import('./pages/admin/lookbooks/new.astro.mjs');
const _page8 = () => import('./pages/admin/lookbooks/_id_/hotspots.astro.mjs');
const _page9 = () => import('./pages/admin/lookbooks.astro.mjs');
const _page10 = () => import('./pages/admin/products/delete/_id_.astro.mjs');
const _page11 = () => import('./pages/admin/products/edit/_id_.astro.mjs');
const _page12 = () => import('./pages/admin/products/new.astro.mjs');
const _page13 = () => import('./pages/admin/products.astro.mjs');
const _page14 = () => import('./pages/admin.astro.mjs');
const _page15 = () => import('./pages/api/wishlist.astro.mjs');
const _page16 = () => import('./pages/login.astro.mjs');
const _page17 = () => import('./pages/lookbooks/_id_.astro.mjs');
const _page18 = () => import('./pages/lookbooks.astro.mjs');
const _page19 = () => import('./pages/products/_id_.astro.mjs');
const _page20 = () => import('./pages/products.astro.mjs');
const _page21 = () => import('./pages/profile.astro.mjs');
const _page22 = () => import('./pages/_locale_.astro.mjs');
const _page23 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/categories/delete/[id].astro", _page1],
    ["src/pages/admin/categories/edit/[id].astro", _page2],
    ["src/pages/admin/categories/new.astro", _page3],
    ["src/pages/admin/categories/index.astro", _page4],
    ["src/pages/admin/logout.astro", _page5],
    ["src/pages/admin/lookbooks/edit/[id].astro", _page6],
    ["src/pages/admin/lookbooks/new.astro", _page7],
    ["src/pages/admin/lookbooks/[id]/hotspots/index.astro", _page8],
    ["src/pages/admin/lookbooks/index.astro", _page9],
    ["src/pages/admin/products/delete/[id].astro", _page10],
    ["src/pages/admin/products/edit/[id].astro", _page11],
    ["src/pages/admin/products/new.astro", _page12],
    ["src/pages/admin/products/index.astro", _page13],
    ["src/pages/admin/index.astro", _page14],
    ["src/pages/api/wishlist.ts", _page15],
    ["src/pages/login.astro", _page16],
    ["src/pages/lookbooks/[id].astro", _page17],
    ["src/pages/lookbooks/index.astro", _page18],
    ["src/pages/products/[id].astro", _page19],
    ["src/pages/products/index.astro", _page20],
    ["src/pages/profile/index.astro", _page21],
    ["src/pages/[locale]/index.astro", _page22],
    ["src/pages/index.astro", _page23]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "674d82bc-4c39-4663-acc5-59c56f9b7c44",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
