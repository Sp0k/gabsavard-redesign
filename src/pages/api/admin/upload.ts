export const prerender = false;

import type { APIRoute } from "astro";
import { adminSupabase } from "../../../db/supabase.admin";
import {
  BLOG_BUCKET,
  ASSETS_BUCKET,
  DRAFT_FOLDER,
  PUBLISHED_FOLDER,
} from "../../../db/storage.constants";

function safeName(name: string) {
  return name.replace(/[^\w.\-()]/g, "_");
}

function slugFromFilename(filename: string) {
  return filename
    .replace(/\.(md|mdx)$/i, "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const POST: APIRoute = async ({ request }) => {
  const ct = request.headers.get("content-type") ?? "";
  if (!ct.includes("multipart/form-data")) {
    return new Response("Expected multipart/form-data", { status: 400 });
  }

  const fd = await request.formData();

  // "post" => upload .md to posts bucket under draft/ or published/
  // "asset" => upload images to assets bucket under <slug>/
  const target = String(fd.get("target") ?? "post");
  const status = String(fd.get("status") ?? "draft"); // draft | published
  const slugInput = String(fd.get("slug") ?? "").trim();

  const files = fd.getAll("files").filter(Boolean) as File[];
  if (files.length === 0) return new Response("No files uploaded", { status: 400 });

  const results: any[] = [];

  // If uploading a post, expect exactly one .md/.mdx file.
  if (target === "post") {
    const mdFile = files.find((f) => /\.(md|mdx)$/i.test(f.name));
    if (!mdFile) return new Response("Please upload a .md or .mdx file", { status: 400 });

    const slug = slugInput || slugFromFilename(mdFile.name) || `post-${Date.now()}`;
    const prefix = status === "published" ? PUBLISHED_FOLDER : DRAFT_FOLDER;
    const path = `${prefix}/${slug}.md`;

    const bytes = new Uint8Array(await mdFile.arrayBuffer());

    // Supabase may reject `text/markdown; charset=utf-8`, so keep it simple:
    const contentType = "text/markdown";

    const { error } = await adminSupabase.storage
      .from(BLOG_BUCKET)
      .upload(path, bytes, { upsert: true, contentType });

    if (error) return new Response(`Upload failed: ${error.message}`, { status: 500 });

    results.push({ ok: true, bucket: BLOG_BUCKET, path, slug });
    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { "content-type": "application/json" },
    });
  }

  // Assets upload: requires slug
  if (target === "asset") {
    const slug = slugInput;
    if (!slug) return new Response("Slug is required for assets upload", { status: 400 });

    for (const f of files) {
      const filename = safeName(f.name);
      const path = `${slug}/${filename}`;
      const bytes = new Uint8Array(await f.arrayBuffer());

      const contentType = f.type || "application/octet-stream";

      const { error } = await adminSupabase.storage
        .from(ASSETS_BUCKET)
        .upload(path, bytes, { upsert: true, contentType });

      if (error) {
        results.push({ ok: false, file: f.name, error: error.message });
      } else {
        results.push({ ok: true, bucket: ASSETS_BUCKET, path, file: f.name });
      }
    }

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { "content-type": "application/json" },
    });
  }

  return new Response("Invalid target", { status: 400 });
};
