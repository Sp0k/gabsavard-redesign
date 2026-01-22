import { FiArrowUpRight, FiMail } from "react-icons/fi"

export const RecentMessages = () => {
  // TODO: Limit the messages to a small list here
  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center font-medium gap-1.5">
          <FiMail /> Recent Messages
        </h3>
        <button className="text-sm text-[#459DDE] hover:underline cursor-pointer">
          See all
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead />

        <tbody>
          <TableRow
            name="Alice"
            email="alice@example.com"
            date="Jan 20, 2026"
            message="Hello, I would like to hire you to make me a cool website"
            order={1}
          />

          <TableRow
            name="Bob"
            email="bob@example.com"
            date="Jan 22, 2026"
            message="Hello, I would like to hire you to make me a cool website"
            order={2}
          />

          <TableRow
            name="Carol"
            email="carol@example.com"
            date="Jan 20, 2026"
            message="Hello, I would like to hire you to make me a cool website"
            order={3}
          />

          <TableRow
            name="Dave"
            email="dave@example.com"
            date="Jan 20, 2026"
            message="Hello, I would like to hire you to make me a cool website"
            order={4}
          />

          <TableRow
            name="Alice"
            email="alice@example.com"
            date="Jan 20, 2026"
            message="Hello, I would like to hire you to make me a cool website"
            order={5}
          />
        </tbody>
      </table>
    </div>
  )
}

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
}

const TableRow = ({ name, email, date, message, order }) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">{name}</td>
      <td className="p-1.5">
        <a
          href={`mailto:${email}`}
          className="text-[#459DDE] underline flex items-center gap-1"
        >
          {email} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">
        <a href="#" className="text-[#459DDE] underline flex items-center gap-1">
          {message}
          <FiArrowUpRight />
        </a>
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
