import { useState } from "react";
import { FiArrowUpRight, FiFileText, FiEye, FiEyeOff, FiBook, FiCode } from "react-icons/fi"
import { FaCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export const RecentArticles = ({ articles }) => {
  const recent = articles.slice(0, 5);

  const [rows, setRows] = useState(recent ?? []);
  const [busySlug, setBusySlug] = useState(null);

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

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center font-medium gap-1.5">
          <FiFileText /> Recent Posts
        </h3>
        <a href="/admin/articles" className="text-sm text-[#459DDE] hover:underline cursor-pointer">
          See all
        </a>
      </div>
      <table className="w-full table-auto">
        <TableHead />

        <tbody>
          {rows.map((a, i) => {
            const name = a?.data?.title ?? a?.slug ?? "Untitled";
            const date = a?.data?.date ? formatDate(a.data.date) : formatDate(a.sortDate);

            const status = (a?.status ?? "draft").toLowerCase() === "published"
              ? "published"
              : "draft";

            return (
              <TableRow
                key={a.slug ?? i}
                slug={a.slug}
                name={name}
                date={date}
                status={status}
                order={i}
                type={a.type}
                busy={busySlug === a.slug}
                onToggle={() => togglePublish(a.slug, status, a.type)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Article Name</th>
        <th className="text-start p-1.5">Date</th>
        <th className="text-start p-1.5">Status</th>
        <th className="text-start p-1.5">Type</th>
        <th className="text-start p-1.5"></th>
      </tr>
    </thead>
  );
}

const TableRow = ({ slug, name, date, status, order, type, onToggle, busy }) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a
          href={`/posts/${slug}`}
          className="text-[#459DDE] underline flex items-center gap-1"
        >
          {name} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">
        <span 
          className={
            `text-xs flex items-center gap-1 font-medium px-2 py-1 w-fit rounded 
${status === "published" ? "bg-green-100 text-green-700" : "bg-orange-200 text-orange-700"}`
          }
        >
          <FaCircle className={`text-xs ${status === "published" ? "text-green-700" : "text-orange-700"}`}/>
          {status === "published" ? "published" : "draft"}
        </span>
      </td>
      <td>
        <span
          className={
          `text-xs flex items-center gap-1 font-medium px-2 py-1 w-fit rounded ${type === "blog" ? "bg-violet-200 text-violet-700" : "bg-teal-200 text-teal-700"}`
          }
        >
          {type === "blog" ? <FiBook className="text-violet-700 text-xs" /> : <FiCode className="text-xs text-teal-700" />}
          {type === "blog" ? "blog" : "devlog"}
        </span>
      </td>
      <td className="p-1.5">
        <button
          type="button"
          onClick={onToggle}
          disabled={busy}
          className="cursor-pointer flex items-center disabled:opacity-50"
          title={status === "published" ? "Unpublish (move to draft)" : "Publish (move to published)"}
        >
          {status === "published" ? <FiEye className="text-xl hover:text-stone-500 transition-colors"/> : <FiEyeOff className="text-xl transition-colors hover:text-stone-500" />}
        </button>
      </td>
    </tr>
  );
}

const formatDate = (dateStr) => {
  const d = typeof dateStr === "number"
    ? new Date(dateStr)
    : new Date(dateStr);

  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
