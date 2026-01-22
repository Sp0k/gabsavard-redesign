import type { APIRoute } from "astro";
import { adminSupabase } from "../../../db/supabase.admin";

export const prerender = false;

export const GET: APIRoute = async () => {
  const { data, error } = await adminSupabase.storage.listBuckets();

  if (error) return new Response(error.message, { status: 500 });

  return new Response(
    JSON.stringify({ ok: true, buckets: data?.map((b) => b.name) ?? [] }),
    { headers: { "content-type": "application/json" } }
  );
};

