import { FiArrowUpRight, FiMail } from "react-icons/fi";

export const MessageList = ({ messages = [] }) => {
  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center font-medium gap-1.5">
          <FiMail /> Messages
        </h3>
      </div>

      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td className="p-2 text-sm text-stone-500" colSpan={5}>
                No messages yet.
              </td>
            </tr>
          ) : (
              messages.map((m, i) => (
                <TableRow
                  key={m.id ?? i}
                  order={i}
                  name={m.name || "—"}
                  id={m.id}
                  email={m.email || "—"}
                  date={formatDate(m.created_at)}
                  message={truncate(m.message, 80)}
                  seen={m.seen}
                />
              ))
            )}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Name</th>
        <th className="text-start p-1.5">Email</th>
        <th className="text-start p-1.5">Date</th>
        <th className="text-start p-1.5">Message</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ name, id, email, date, message, order, seen }) => {
  return (
    <tr className={`${order % 2 ? "bg-stone-100" : ""} text-sm ${!seen ? "font-semibold" : ""}`}>
      <td className="p-1.5">{name}</td>

      <td className="p-1.5">
        {email === "—" ? (
          "—"
        ) : (
            email
          )}
      </td>

      <td className="p-1.5">{date}</td>

      <td className="p-1.5">
        <span className="inline-flex items-center gap-1">
          {message}
        </span>
      </td>

      <td className="p-1.5">
        <a href={id ? `/admin/messages/${encodeURIComponent(id)}` : "#"}>
          <FiArrowUpRight className="cursor-pointer hover:text-[#459DDE] text-xl transition-colors" />
        </a>
      </td>
    </tr>
  );
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const truncate = (s, max = 80) => {
  if (!s) return "";
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
};
