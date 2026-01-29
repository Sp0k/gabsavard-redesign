export const prerender = false;

import type { APIRoute } from "astro";
import { adminSupabase } from "../../../../db/supabase.admin";
import {
  BLOG_BUCKET,
  DEVLOG_POSTS,
  DRAFT_FOLDER,
  PUBLISHED_FOLDER,
} from "../../../../db/storage.constants";

type PostType = "blog" | "devlog";

export const POST: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token")?.value;
  if (!accessToken) return new Response("Unauthorized", { status: 401 });

  const { data: userData, error: userErr } = await adminSupabase.auth.getUser(accessToken);
  if (userErr || !userData?.user) return new Response("Unauthorized", { status: 401 });

  const body = await request.json().catch(() => ({}));

  const type = String(body.type ?? "").trim() as PostType;
  let slug = String(body.slug ?? "").trim();
  const toStatus = String(body.toStatus ?? "").trim();

  slug = slug.replace(/\.md$/i, "");

  if (!slug) return new Response("Missing slug", { status: 400 });
  if (type !== "blog" && type !== "devlog") {
    return new Response("Invalid type", { status: 400 });
  }
  if (toStatus !== "published" && toStatus !== "draft") {
    return new Response("Invalid toStatus", { status: 400 });
  }

  if (slug.includes("/") || slug.includes("\\") || slug.includes("..")) {
    return new Response("Invalid slug", { status: 400 });
  }

  const bucket = type === "devlog" ? DEVLOG_POSTS : BLOG_BUCKET;

  const fromPath =
    toStatus === "published"
      ? `${DRAFT_FOLDER}/${slug}.md`
      : `${PUBLISHED_FOLDER}/${slug}.md`;

  const toPath =
    toStatus === "published"
      ? `${PUBLISHED_FOLDER}/${slug}.md`
      : `${DRAFT_FOLDER}/${slug}.md`;

  const { error } = await adminSupabase.storage.from(bucket).move(fromPath, toPath);

  if (error) {
    return new Response(`Move failed: ${error.message}`, { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true, slug, status: toStatus, type }), {
    headers: { "content-type": "application/json" },
  });
};
