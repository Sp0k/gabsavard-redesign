import { FiArrowUpRight, FiFileText } from "react-icons/fi"
import { FaCircle } from "react-icons/fa";

export const RecentArticles = ({ articles }) => {
  const recent = articles.slice(0, 5);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center font-medium gap-1.5">
          <FiFileText /> Recent Articles
        </h3>
        <button className="text-sm text-[#459DDE] hover:underline cursor-pointer">
          See all
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead />

        <tbody>
          {recent.map((a, i) => {
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
        {/* <th className="text-start p-1.5"></th> */}
        <th className="w-8"></th>
      </tr>
    </thead>
  );
}

const TableRow = ({ slug, name, date, status, order }) => {
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
      <td className="p-1.5"></td>
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
