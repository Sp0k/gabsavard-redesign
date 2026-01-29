import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiFile, FiImage, FiShare } from "react-icons/fi";
import { toast } from "react-toastify";

export const FileDrop = () => {
  const [mdFile, setMdFile] = useState(null);
  const [assetFiles, setAssetFiles] = useState([]);
  const [slug, setSlug] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [kind, setKind] = useState("blog");

  const onDropMd = useCallback((acceptedFiles) => {
    setMsg("");
    setMdFile(acceptedFiles?.[0] ?? null);

    const f = acceptedFiles?.[0];
    if (f && !slug.trim()) {
      const base = f.name.replace(/\.(md|mdx)$/i, "");
      const auto = base
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
      if (auto) setSlug(auto);
    }
  }, [slug]);

  const mdDrop = useDropzone({
    onDrop: onDropMd,
    multiple: false,
    maxFiles: 1,
    accept: {
      "text/markdown": [".md"],
      "text/plain": [".md"],
    },
  });

  const onDropAssets = useCallback((acceptedFiles) => {
    setMsg("");
    setAssetFiles((prev) => {
      const seen = new Set(prev.map((f) => `${f.name}:${f.size}`));
      const next = [...prev];
      for (const f of acceptedFiles) {
        const key = `${f.name}:${f.size}`;
        if (!seen.has(key)) next.push(f);
      }
      return next;
    });
  }, []);

  const assetsDrop = useDropzone({
    onDrop: onDropAssets,
    multiple: true,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"],
    },
  });

  const mdName = mdFile?.name ?? "No markdown selected";
  const assetsCount = assetFiles.length;

  const canUpload = useMemo(() => {
    if (!mdFile && !slug) return false;
    if (assetsCount > 0 && !slug.trim()) return false;
    return true;
  }, [mdFile, assetsCount, slug]);

  async function uploadAll() {
    if (!mdFile) {
      setMsg("Please drop a .md file first.");
      return;
    }

    setBusy(true);
    setMsg("");

    try {
      const fdPost = new FormData();
      fdPost.set("target", "post");
      fdPost.set("kind", kind);
      if (slug.trim()) fdPost.set("slug", slug.trim());
      fdPost.append("files", mdFile);

      const postRes = await fetch("/api/admin/upload", { method: "POST", body: fdPost });
      const postText = await postRes.text();
      if (!postRes.ok) {
        toast.error(`Post upload failed: ${postText}`);
        throw new Error(`Post upload failed: ${postText}`);
      }

      let postJson = null;
      try { postJson = JSON.parse(postText); } catch {}
      const effectiveSlug =
        postJson?.results?.[0]?.slug || slug.trim();

      if (assetFiles.length > 0) {
        if (!effectiveSlug) {
          toast.warn("Slug is required to upload assets.");
          throw new Error("Slug is required to upload assets.");
        }

        const fdAssets = new FormData();
        fdAssets.set("target", "asset");
        fdAssets.set("kind", kind);
        fdAssets.set("slug", effectiveSlug);

        for (const f of assetFiles) fdAssets.append("files", f);

        const assetsRes = await fetch("/api/admin/upload", { method: "POST", body: fdAssets });
        const assetsText = await assetsRes.text();
        if (!assetsRes.ok) throw new Error(`Assets upload failed: ${assetsText}`);
      }

      setMsg(`Uploaded ✓\nPost: ${mdFile.name}\nAssets: ${assetFiles.length}`);
    } catch (e) {
      setMsg(String(e?.message ?? e));
    } finally {
      setBusy(false);
      toast.success("Uploaded the article!");
    }
  }

  function clearAssets() {
    setAssetFiles([]);
    setMsg("");
  }

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 bg-white shadow">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center text-md font-semibold gap-1.5">
          <FiShare /> Upload Article
        </h3>
        <div className="flex items-center gap-2">
          <label className="text-xs text-stone-500">Type</label>
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className="text-sm rounded border border-stone-300 px-2 py-1 bg-white"
          >
            <option value="blog">Blog</option>
            <option value="devlog">Devlog</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Markdown dropzone */}
        <div className="col-span-12 md:col-span-6 rounded border border-stone-300 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="flex items-center font-medium gap-1.5">
              <FiFile /> Markdown File
            </h4>
            <span className="text-xs text-stone-500">{mdName}</span>
          </div>

          <div
            {...mdDrop.getRootProps()}
            className={`p-4 flex justify-center items-center text-center
overflow-hidden border-2 border-dashed cursor-pointer min-h-[22vh]
${
mdDrop.isDragActive
? "bg-stone-100 border-stone-200"
: "border-stone-300 hover:border-stone-200 bg-stone-200/50 hover:bg-stone-100"
}`}
          >
            <input {...mdDrop.getInputProps()} />
            <p className="text-sm text-stone-700">
              {mdDrop.isDragActive
                ? "Drop your .md here"
                : "Drop a single .md/.mdx file here, or click to browse"}
            </p>
          </div>

          <div className="mt-3">
            <label className="block text-xs text-stone-500 mb-1">Slug (optional)</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-post-slug"
              className="w-full rounded border border-stone-300 px-3 py-2 text-sm focus:outline-none"
            />
            <p className="text-xs text-stone-400 mt-1">
              If empty, we’ll use the markdown filename on upload.
            </p>
          </div>
        </div>

        {/* Assets dropzone */}
        <div className="col-span-12 md:col-span-6 rounded border border-stone-300 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="flex items-center font-medium gap-1.5">
              <FiImage /> Images / Assets
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">{assetsCount} selected</span>
              {assetsCount > 0 && (
                <button
                  type="button"
                  onClick={clearAssets}
                  className="text-xs underline text-stone-600 hover:text-stone-900"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div
            {...assetsDrop.getRootProps()}
            className={`p-4 flex justify-center items-center text-center
overflow-hidden border-2 border-dashed cursor-pointer min-h-[22vh]
${
assetsDrop.isDragActive
? "bg-stone-100 border-stone-200"
: "border-stone-300 hover:border-stone-200 bg-stone-200/50 hover:bg-stone-100"
}`}
          >
            <input {...assetsDrop.getInputProps()} />
            <p className="text-sm text-stone-700">
              {assetsDrop.isDragActive
                ? "Drop your images here"
                : "Drop images here, or click to browse (unlimited)"}
            </p>
          </div>

          {assetsCount > 0 && (
            <ul className="mt-3 max-h-32 overflow-auto text-xs text-stone-700 space-y-1">
              {assetFiles.slice(0, 20).map((f) => (
                <li key={`${f.name}:${f.size}`}>{f.name}</li>
              ))}
              {assetsCount > 20 && (
                <li className="text-stone-400">…and {assetsCount - 20} more</li>
              )}
            </ul>
          )}

          <p className="text-xs text-stone-400 mt-3">
            If you upload assets, we’ll store them under <code>{`<slug>/filename`}</code> in the assets bucket.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={uploadAll}
          disabled={!canUpload || busy}
          className="rounded bg-stone-950 text-white px-4 py-2 text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Uploading…" : "Upload to Supabase"}
        </button>

        {msg && (
          <pre className="text-xs text-stone-700 bg-stone-100 p-3 rounded max-w-[60%] whitespace-pre-wrap overflow-auto">
            {msg}
          </pre>
        )}
      </div>
    </div>
  );
};
