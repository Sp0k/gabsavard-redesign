import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const service = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) throw new Error("Missing SUPABASE_URL");
if (!service) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

export const adminSupabase = createClient(url, service, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});

