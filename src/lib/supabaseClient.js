import { createClient } from '@supabase/supabase-js';

// Create a supabase client for browser-side operations
export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

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