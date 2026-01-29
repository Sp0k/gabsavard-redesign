export const prerender = false;

import type { APIRoute } from "astro";
import { adminSupabase } from "../../../db/supabase.admin";
import {
  BLOG_BUCKET,
  DEVLOG_POSTS,
  ASSETS_BUCKET,
  DEVLOG_ASSETS,
  DRAFT_FOLDER,
} from "../../../db/storage.constants";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();

  const target = String(form.get("target") ?? "").trim(); // "post" | "asset"
  const kind = String(form.get("kind") ?? "blog").trim(); // "blog" | "devlog"
  const slugOverride = String(form.get("slug") ?? "").trim();

  const files = form.getAll("files").filter((v): v is File => v instanceof File);

  if (target !== "post" && target !== "asset") {
    return new Response("Invalid target", { status: 400 });
  }
  if (kind !== "blog" && kind !== "devlog") {
    return new Response("Invalid kind", { status: 400 });
  }
  if (files.length === 0) {
    return new Response("No files provided", { status: 400 });
  }

  const postsBucket = kind === "devlog" ? DEVLOG_POSTS : BLOG_BUCKET;
  const assetsBucket = kind === "devlog" ? DEVLOG_ASSETS : ASSETS_BUCKET;

  // Upload markdown
  if (target === "post") {
    const f = files[0];
    const base = f.name.replace(/\.(md|mdx)$/i, "");
    const slug = slugOverride || slugify(base);

    if (!slug) return new Response("Could not determine slug", { status: 400 });

    const path = `${DRAFT_FOLDER}/${slug}.md`;

    const { error } = await adminSupabase.storage
      .from(postsBucket)
      .upload(path, f, {
        upsert: true,
        contentType: "text/markdown",
      });

    if (error) {
      return new Response(`Post upload failed: ${error.message}`, { status: 500 });
    }

    return new Response(
      JSON.stringify({ ok: true, kind, target, results: [{ slug, path }] }),
      { headers: { "content-type": "application/json" } },
    );
  }

  // Upload assets
  const slug = slugOverride;
  if (!slug) return new Response("Missing slug for assets upload", { status: 400 });

  const results: Array<{ name: string; path: string }> = [];

  for (const f of files) {
    const path = `${slug}/${f.name}`;
    const { error } = await adminSupabase.storage
      .from(assetsBucket)
      .upload(path, f, {
        upsert: true,
        contentType: f.type || undefined,
      });

    if (error) {
      return new Response(`Asset upload failed (${f.name}): ${error.message}`, { status: 500 });
    }

    results.push({ name: f.name, path });
  }

  return new Response(
    JSON.stringify({ ok: true, kind, target, results }),
    { headers: { "content-type": "application/json" } },
  );
};
