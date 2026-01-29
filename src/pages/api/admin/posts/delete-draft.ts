export const prerender = false;

import type { APIRoute } from "astro";
import { adminSupabase } from "../../../../db/supabase.admin";
import {
  ASSETS_BUCKET,
  BLOG_BUCKET,
  DRAFT_FOLDER,
  DEVLOG_POSTS,
  DEVLOG_ASSETS,
} from "../../../../db/storage.constants";

async function removeAllUnderPrefix(bucket: string, prefix: string) {
  const toDelete: string[] = [];

  async function walk(pathPrefix: string) {
    const { data, error } = await adminSupabase.storage
      .from(bucket)
      .list(pathPrefix, { limit: 1000 });

    if (error) throw error;
    if (!data?.length) return;

    for (const item of data) {
      const fullPath = pathPrefix ? `${pathPrefix}/${item.name}` : item.name;

      const isFolder = item.metadata == null && (item.id == null || item.updated_at == null);

      if (isFolder) {
        await walk(fullPath);
      } else {
        toDelete.push(fullPath);
      }
    }
  }

  await walk(prefix);

  const CHUNK = 100;
  for (let i = 0; i < toDelete.length; i += CHUNK) {
    const chunk = toDelete.slice(i, i + CHUNK);
    const { error } = await adminSupabase.storage.from(bucket).remove(chunk);
    if (error) throw error;
  }

  return toDelete.length;
}

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => ({}));
  const slug = String(body.slug ?? "").trim();
  const type = String(body.type ?? "blog").trim(); // "blog" | "devlog"

  if (!slug) return new Response("Missing slug", { status: 400 });
  if (type !== "blog" && type !== "devlog") {
    return new Response("Invalid type", { status: 400 });
  }

  const postsBucket = type === "devlog" ? DEVLOG_POSTS : BLOG_BUCKET;
  const assetsBucket = type === "devlog" ? DEVLOG_ASSETS : ASSETS_BUCKET;

  const draftPath = `${DRAFT_FOLDER}/${slug}.md`;
  const assetsPrefix = slug;

  const { data: signed, error: signErr } = await adminSupabase.storage
    .from(postsBucket)
    .createSignedUrl(draftPath, 60);

  if (signErr || !signed?.signedUrl) {
    return new Response("Not found in draft (delete blocked)", { status: 404 });
  }

  const { error: mdErr } = await adminSupabase.storage
    .from(postsBucket)
    .remove([draftPath]);

  if (mdErr) {
    return new Response(`Delete draft failed: ${mdErr.message}`, { status: 500 });
  }

  try {
    const deletedCount = await removeAllUnderPrefix(assetsBucket, assetsPrefix);

    return new Response(
      JSON.stringify({ ok: true, slug, type, deletedDraft: true, deletedAssets: deletedCount }),
      { headers: { "content-type": "application/json" } }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        ok: true,
        slug,
        type,
        deletedDraft: true,
        deletedAssets: 0,
        warning: `Draft deleted, but failed to delete assets: ${String(e?.message ?? e)}`,
      }),
      { headers: { "content-type": "application/json" } }
    );
  }
};
