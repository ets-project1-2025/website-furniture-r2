import { supabase } from '../../lib/supabaseClient';

export async function POST({ request }) {
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return new Response(
      JSON.stringify({ error: 'User not authenticated' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const body = await request.json();
  const { product_id } = body;

  if (!product_id) {
    return new Response(
      JSON.stringify({ error: 'Product ID is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Check if the product is already in the user's wishlist
  const { data: existingItem, error: fetchError } = await supabase
    .from('wishlists')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('product_id', product_id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "Row not found"
    return new Response(
      JSON.stringify({ error: 'Error checking wishlist status' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let result;
  if (existingItem) {
    // Remove from wishlist
    const { error: deleteError } = await supabase
      .from('wishlists')
      .delete()
      .eq('id', existingItem.id);

    if (deleteError) {
      return new Response(
        JSON.stringify({ error: 'Error removing from wishlist' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    result = { message: 'Removed from wishlist', inWishlist: false };
  } else {
    // Add to wishlist
    const { error: insertError } = await supabase
      .from('wishlists')
      .insert({ user_id: session.user.id, product_id });

    if (insertError) {
      return new Response(
        JSON.stringify({ error: 'Error adding to wishlist' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    result = { message: 'Added to wishlist', inWishlist: true };
  }

  return new Response(
    JSON.stringify(result),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function DELETE({ request }) {
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return new Response(
      JSON.stringify({ error: 'User not authenticated' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const body = await request.json();
  const { wishlist_id } = body;

  if (!wishlist_id) {
    return new Response(
      JSON.stringify({ error: 'Wishlist ID is required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Remove from wishlist
  const { error: deleteError } = await supabase
    .from('wishlists')
    .delete()
    .eq('id', wishlist_id)
    .eq('user_id', session.user.id);

  if (deleteError) {
    return new Response(
      JSON.stringify({ error: 'Error removing from wishlist' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  return new Response(
    JSON.stringify({ message: 'Removed from wishlist' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

// Astro API routes export handler functions for different HTTP methods