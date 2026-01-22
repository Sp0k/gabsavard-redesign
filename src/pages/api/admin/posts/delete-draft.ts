export const prerender = false;

import type { APIRoute } from "astro";
import { adminSupabase } from "../../../../db/supabase.admin";
import { ASSETS_BUCKET, BLOG_BUCKET, DRAFT_FOLDER } from "../../../../db/storage.constants";

async function removeAllUnderPrefix(bucket: string, prefix: string) {
  // We list recursively by walking prefixes. Storage "folders" are just prefixes.
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

  if (!slug) return new Response("Missing slug", { status: 400 });

  const draftPath = `${DRAFT_FOLDER}/${slug}.md`;
  const assetsPrefix = slug;

  const { data: signed, error: signErr } = await adminSupabase.storage
    .from(BLOG_BUCKET)
    .createSignedUrl(draftPath, 60);

  if (signErr || !signed?.signedUrl) {
    return new Response("Not found in draft (delete blocked)", { status: 404 });
  }

  const { error: mdErr } = await adminSupabase.storage.from(BLOG_BUCKET).remove([draftPath]);
  if (mdErr) {
    return new Response(`Delete draft failed: ${mdErr.message}`, { status: 500 });
  }

  try {
    const deletedCount = await removeAllUnderPrefix(ASSETS_BUCKET, assetsPrefix);

    return new Response(
      JSON.stringify({ ok: true, slug, deletedDraft: true, deletedAssets: deletedCount }),
      { headers: { "content-type": "application/json" } }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        ok: true,
        slug,
        deletedDraft: true,
        deletedAssets: 0,
        warning: `Draft deleted, but failed to delete assets: ${String(e?.message ?? e)}`,
      }),
      { headers: { "content-type": "application/json" } }
    );
  }
};
