export const prerender = false;

import type { APIRoute } from "astro";
import { adminSupabase } from "../../../../db/supabase.admin";
import { BLOG_BUCKET, DRAFT_FOLDER, PUBLISHED_FOLDER } from "../../../../db/storage.constants";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => ({}));
  const slug = String(body.slug ?? "").trim();
  const toStatus = String(body.toStatus ?? "").trim();

  if (!slug) return new Response("Missing slug", { status: 400 });
  if (toStatus !== "published" && toStatus !== "draft") {
    return new Response("Invalid toStatus", { status: 400 });
  }

  const fromPath =
    toStatus === "published"
      ? `${DRAFT_FOLDER}/${slug}.md`
      : `${PUBLISHED_FOLDER}/${slug}.md`;

  const toPath =
    toStatus === "published"
      ? `${PUBLISHED_FOLDER}/${slug}.md`
      : `${DRAFT_FOLDER}/${slug}.md`;

  const { error } = await adminSupabase.storage.from(BLOG_BUCKET).move(fromPath, toPath);

  if (error) {
    return new Response(`Move failed: ${error.message}`, { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true, slug, status: toStatus }), {
    headers: { "content-type": "application/json" },
  });
};
