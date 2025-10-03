import { createClient } from '@supabase/supabase-js';

let supabase;
{
  supabase = createClient(
    "https://auwzqcdidvritdauhyrg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1d3pxY2RpZHZyaXRkYXVoeXJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NDAzNzUsImV4cCI6MjA3NTAxNjM3NX0.KtkWNuo2LQPB868lk983FbFR4oskdzKOLZoQBklhAHk"
  );
}

export { supabase as s };
