import { useState } from "react";
import { FiArrowUpRight, FiEye, FiEyeOff, FiFileText, FiTrash, FiCode } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { ConfirmModal } from "../ConfirmModal";
import { toast } from "react-toastify";

export const List = ({ sectionName, articles }) => {
  const [rows, setRows] = useState(articles ?? []);
  const [busySlug, setBusySlug] = useState(null);
  const [confirm, setConfirm] = useState({
    open: false,
    slug: "",
    name: "",
    status: "",
    type: "blog", // "blog" | "devlog"
  });
  const [busyDelete, setBusyDelete] = useState(false);

  async function togglePublish(slug, currentStatus, type) {
    if (!slug) return;

    const nextStatus = currentStatus === "published" ? "draft" : "published";

    setBusySlug(slug);

    try {
      const res = await fetch("/api/admin/posts/toggle-publish", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, type, toStatus: nextStatus }),
      });

      const text = await res.text();
      if (!res.ok) {
        toast.error(`Failed: ${text}`)
        throw new Error(text);
      }

      setRows((prev) =>
        prev.map((a) => (a.slug === slug ? { ...a, status: nextStatus } : a))
      );

      toast.success(
        nextStatus === "published"
          ? `Published post!`
          : `Moved back post to drafts!`
      )
    } catch (e) {
      console.error(e);
      toast.error(`Failed to toggle publish`);
    } finally {
      setBusySlug(null);
    }
  }

  function requestDeleteDraft(a) {
    setConfirm({
      open: true,
      slug: a.slug,
      name: a?.data?.title ?? a.slug,
      status: a.status,
      type: a.type ?? "blog",
    });
  }

  async function doDelete() {
    if (confirm.status !== "draft") {
      setConfirm((c) => ({ ...c, open: false }));
      toast.warn("Delete is only allowed for drafts.");
      return;
    }

    setBusyDelete(true);
    try {
      const res = await fetch("/api/admin/posts/delete-draft", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug: confirm.slug, type: confirm.type }),
      });

      const text = await res.text();
      if (!res.ok) {
        toast.error(`Failed: ${text}`);
        throw new Error(text);
      }

      setRows((prev) => prev.filter((p) => p.slug !== confirm.slug));
      setConfirm({ open: false, slug: "", name: "", status: "" });
      toast.success("Deleted article");
    } catch (e) {
      console.error(e);
      toast.error(`Failed to delete`);
    } finally {
      setBusyDelete(false);
    }
  }

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center font-medium gap-1.5">
          {sectionName === "Articles" ? <FiFileText /> : <FiCode />}
          {sectionName}
        </h3>
      </div>

      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {rows.map((a, i) => {
            const name = a?.data?.title ?? a?.slug ?? "Untitled";
            const date = a?.data?.date ? formatDate(a.data.date) : formatDate(a.sortDate);

            const status =
              (a?.status ?? "draft").toLowerCase() === "published" ? "published" : "draft";

            return (
              <TableRow
                key={a.slug ?? i}
                slug={a.slug}
                name={name}
                date={date}
                status={status}
                order={i}
                busy={busySlug === a.slug}
                onToggle={() => togglePublish(a.slug, status, a.type)}
                onDelete={() => requestDeleteDraft(a)}
              />
            );
          })}
        </tbody>
      </table>

      <ConfirmModal
        open={confirm.open}
        title="Delete draft?"
        confirmText="Delete"
        cancelText="Cancel"
        danger
        busy={busyDelete}
        onCancel={() => setConfirm({ open: false, slug: "", name: "", status: "" })}
        onConfirm={doDelete}
      >
        <p className="text-sm text-stone-700">
          You're about to permanently delete{" "}
          "<span className="italic text-[#459DDE]">{confirm.name}</span>". This cannot be undone.
        </p>
      </ConfirmModal>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Article Name</th>
        <th className="text-start p-1.5">Date</th>
        <th className="text-start p-1.5">Status</th>
        <th className="text-start p-1.5"></th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ slug, name, date, status, order, onDelete, onToggle, busy }) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a href={`/posts/${slug}`} className="text-[#459DDE] underline flex items-center gap-1">
          {name} <FiArrowUpRight />
        </a>
      </td>

      <td className="p-1.5">{date}</td>

      <td className="p-1.5">
        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 w-fit rounded 
${status === "published" ? "bg-green-100 text-green-700" : "bg-orange-200 text-orange-700"}`}
        >
          <FaCircle
            className={`text-xs ${status === "published" ? "text-green-700" : "text-orange-700"}`}
          />
          {status}
        </span>
      </td>

      <td className="p-1.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onToggle}
          disabled={busy}
          className="cursor-pointer flex items-center disabled:opacity-50"
          title={status === "published" ? "Unpublish" : "Publish"}
        >
          {status === "published" ? <FiEye className="text-xl" /> : <FiEyeOff className="text-xl" />}
        </button>
        {status === "draft" && 
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="cursor-pointer flex items-center disabled:opacity-50"
            title="Delete draft"
          >
            <FiTrash className="text-xl" />
          </button>
        }
      </td>

      <td className="p-1.5 text-xs text-stone-500">{busy ? "…" : ""}</td>
    </tr>
  );
};

const formatDate = (dateStr) => {
  const d = typeof dateStr === "number" ? new Date(dateStr) : new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};
