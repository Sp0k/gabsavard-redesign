import { createClient } from "@supabase/supabase-js";


const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      flowType: "pkce",
    },
  },
);

export const blogBucket = "blog-posts";
export const projectsBucket = "project-posts";
export const publishedTable = "published";
