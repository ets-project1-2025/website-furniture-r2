/* empty css                                    */
import { e as createComponent, f as createAstro, k as renderHead, h as addAttribute, l as renderScript, r as renderTemplate } from '../../chunks/astro/server_Z03RFxYs.mjs';
import 'kleur/colors';
import 'clsx';
import { s as supabase } from '../../chunks/supabaseClient_DdVNsowi.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const productId = Astro2.params.id;
  const { data: { session } } = await supabase.auth.getSession();
  const { data: product, error: productError } = await supabase.from("products").select(`
    id, 
    name, 
    description, 
    price, 
    dimensions,
    materials,
    is_active,
    categories(name)
  `).eq("id", productId).eq("is_active", true).single();
  if (productError || !product) {
    return Astro2.redirect("/products");
  }
  let isInWishlist = false;
  if (session) {
    const { data: wishlistItem, error: wishlistError } = await supabase.from("wishlists").select("id").eq("user_id", session.user.id).eq("product_id", productId).single();
    if (wishlistItem) {
      isInWishlist = true;
    }
  }
  const { data: images, error: imagesError } = await supabase.from("product_images").select("id, image_url, is_primary").eq("product_id", productId).order("is_primary", { ascending: false });
  if (imagesError) {
    console.error("Error fetching product images:", imagesError);
  }
  const { data: relatedProducts, error: relatedError } = await supabase.from("products").select(`
    id, 
    name, 
    price, 
    is_active,
    categories(name)
  `).eq("category_id", product.category_id).eq("is_active", true).neq("id", productId).limit(4);
  if (relatedError) {
    console.error("Error fetching related products:", relatedError);
  }
  const { data: reviews, error: reviewsError } = await supabase.from("reviews").select(`
    id,
    rating,
    comment,
    created_at,
    profiles(full_name)
  `).eq("product_id", productId).order("created_at", { ascending: false });
  if (reviewsError) {
    console.error("Error fetching reviews:", reviewsError);
  }
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${product.name} | WIDI Furniture</title><meta name="description" content="{product.description}"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"><link rel="stylesheet" href="/src/styles/global.css">${renderHead()}</head> <body class="min-h-screen flex flex-col"> <header class="bg-amber-100 shadow-md py-4 px-6"> <nav class="flex justify-between items-center"> <a href="/" class="text-2xl font-bold text-amber-900">WIDI Furniture</a> <ul class="flex space-x-6"> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/">Home</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/products">Products</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/about">About</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/contact">Contact</a></li> <li><a class="text-gray-700 hover:text-amber-800 transition-colors" href="/login">Login</a></li> </ul> </nav> </header> <main class="py-8 px-6 flex-grow"> <div class="max-w-7xl mx-auto"> <div class="mb-6"> <a href="/products" class="text-amber-700 hover:underline">&larr; Back to Products</a> </div> <div class="flex flex-col lg:flex-row gap-12"> <!-- Product Images --> <div class="lg:w-1/2"> <div class="bg-gray-100 rounded-lg p-4 mb-4"> <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-500"> ${images && images.length > 0 ? "Product Main Image" : "No Image Available"} </div> </div> ${images && images.length > 1 && renderTemplate`<div class="grid grid-cols-4 gap-4"> ${images.map((image) => renderTemplate`<div class="bg-gray-100 rounded-lg p-2 cursor-pointer"> <div class="bg-gray-200 border-2 border-dashed rounded-lg w-full h-24 flex items-center justify-center text-gray-500 text-sm"> ${image.is_primary ? "Primary" : "Thumbnail"} </div> </div>`)} </div>`} </div> <!-- Product Details --> <div class="lg:w-1/2"> <h1 class="text-3xl font-bold text-amber-900 mb-2">${product.name}</h1> <div class="flex items-center mb-4"> <p class="text-2xl font-bold text-amber-700">Rp${product.price?.toLocaleString("id-ID")}</p> <span class="ml-4 px-2 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"> ${product.categories?.name} </span> </div> <div class="prose max-w-none mb-6"> <p>${product.description}</p> </div> <div class="mb-6"> <h3 class="text-lg font-semibold text-amber-800 mb-2">Details</h3> <ul class="space-y-2"> ${product.dimensions && renderTemplate`<li class="flex"> <span class="font-medium w-32">Dimensions:</span> <span> ${product.dimensions.length && `L: ${product.dimensions.length}cm`} ${product.dimensions.width && ` \xD7 W: ${product.dimensions.width}cm`} ${product.dimensions.height && ` \xD7 H: ${product.dimensions.height}cm`} </span> </li>`} ${product.materials && product.materials.length > 0 && renderTemplate`<li class="flex"> <span class="font-medium w-32">Materials:</span> <span>${product.materials.join(", ")}</span> </li>`} </ul> </div> <div class="flex space-x-4 mb-8"> <button class="bg-amber-700 text-white py-3 px-8 rounded-md hover:bg-amber-800 transition-colors">
Add to Cart
</button> <button class="border-2 border-amber-700 text-amber-700 py-3 px-8 rounded-md hover:bg-amber-50 transition-colors add-to-wishlist-btn"${addAttribute(product.id, "data-product-id")}> ${isInWishlist ? "In Wishlist \u2713" : "Add to Wishlist"} </button> </div> <div class="border-t border-gray-200 pt-6"> <h3 class="text-lg font-semibold text-amber-800 mb-4">Share Product</h3> <div class="flex space-x-4"> <a href="#" class="text-gray-600 hover:text-amber-700"> <span class="sr-only">Facebook</span> <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.129 22 16.99 22 12z" clip-rule="evenodd"></path> </svg> </a> <a href="#" class="text-gray-600 hover:text-amber-700"> <span class="sr-only">Instagram</span> <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path> </svg> </a> <a href="#" class="text-gray-600 hover:text-amber-700"> <span class="sr-only">Twitter</span> <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path> </svg> </a> </div> </div> </div> </div> <!-- Reviews Section --> <div class="mt-16"> <h2 class="text-2xl font-bold text-amber-900 mb-6">Customer Reviews</h2> ${reviews && reviews.length > 0 ? renderTemplate`<div class="space-y-6"> ${reviews.map((review) => renderTemplate`<div class="border-b border-gray-200 pb-6"> <div class="flex items-center mb-2"> <h4 class="font-semibold text-gray-900">${review.profiles?.full_name || "Anonymous"}</h4> <div class="ml-4 flex items-center">  ${[...Array(5)].map((_, i) => renderTemplate`<svg${addAttribute(i, "key")}${addAttribute(`w-5 h-5 ${i < review.rating ? "text-amber-400" : "text-gray-300"}`, "class")} fill="currentColor" viewBox="0 0 20 20"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg>`)} </div> </div> <p class="text-gray-600">${review.comment}</p> <p class="text-sm text-gray-500 mt-2"> ${new Date(review.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} </p> </div>`)} </div>` : renderTemplate`<p class="text-gray-600">No reviews yet. Be the first to review this product!</p>`} </div> <!-- Related Products --> ${relatedProducts && relatedProducts.length > 0 && renderTemplate`<div class="mt-16"> <h2 class="text-2xl font-bold text-amber-900 mb-6">You May Also Like</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> ${relatedProducts.map((relatedProduct) => renderTemplate`<a${addAttribute(`/products/${relatedProduct.id}`, "href")} class="product-card group"> <div class="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 flex items-center justify-center text-gray-500">
Related Product
</div> <div class="p-4"> <h3 class="text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition-colors"> ${relatedProduct.name} </h3> <p class="text-amber-700 font-bold mt-2">Rp${relatedProduct.price?.toLocaleString("id-ID")}</p> </div> </a>`)} </div> </div>`} </div> </main> <footer class="bg-amber-100 py-6 px-6 text-center text-gray-600"> <p>&copy; 2025 WIDI Furniture. All rights reserved.</p> </footer> ${renderScript($$result, "/workspaces/website-furniture-r2/src/pages/products/[id].astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/workspaces/website-furniture-r2/src/pages/products/[id].astro", void 0);

const $$file = "/workspaces/website-furniture-r2/src/pages/products/[id].astro";
const $$url = "/products/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
