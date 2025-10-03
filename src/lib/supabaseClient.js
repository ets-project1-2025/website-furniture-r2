import { createClient } from '@supabase/supabase-js';

// Create a supabase client for browser-side operations
let supabase;

// Initialize client safely
if (import.meta.env.PUBLIC_SUPABASE_URL && import.meta.env.PUBLIC_SUPABASE_ANON_KEY) {
  supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );
} else {
  console.error('Missing Supabase environment variables');
  // Create a mock client or throw an error that will be handled gracefully
  supabase = {
    from: () => ({
      select: () => ({ eq: () => ({ single: () => ({ data: null, error: { message: 'Supabase not configured' } }) }) }),
      insert: () => ({ error: { message: 'Supabase not configured' } }),
      update: () => ({ eq: () => ({ error: { message: 'Supabase not configured' } }) }),
      delete: () => ({ eq: () => ({ error: { message: 'Supabase not configured' } }) }),
    }),
    auth: {
      getSession: () => ({ data: { session: null }, error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => ({ error: { message: 'Supabase not configured' } }),
      signOut: () => ({ error: { message: 'Supabase not configured' } }),
    }
  };
}

// For server-side operations, you might want to use the service role key
// Be very careful with the service role key - it should only be used on the server
export const createServiceClient = () => {
  if (!import.meta.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in environment variables');
  }

  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  );
};

export { supabase };