import { useState } from "react";
import { FiMail, FiCheck, FiUser, FiSend, FiAlignLeft, FiCalendar, FiCopy } from "react-icons/fi"

export const MessageDisplay = ({ name, email, message, createdAt }) => {
  const formattedDate = formatDateTime(createdAt);

  const [copied, setCopied] = useState(false);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 bg-white shadow">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center text-md font-semibold gap-1.5">
          <FiMail /> Message
        </h3>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="col-span-12 md:col-span-6 p-4">
          <div className="mb-3 flex flex-col">
            <h4 className="flex items-center font-semibold text-md gap-1.5">
              <FiUser /> Name
            </h4>
            <div className="flex items-center ml-6">
              <span className="text-sm">{name}</span>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 p-4">
          <div className="mb-3 flex flex-col">
            <h4 className="flex items-center font-semibold text-md gap-1.5">
              <FiSend /> Email
            </h4>
            <div className="flex items-center gap-2 ml-6">
              <span className="text-sm">
                {email}
              </span>
              <button
                className="cursor-pointer"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(email);
                    setCopied(true);
                  } catch (err) {
                    console.error("Failed to copy:", err);
                  }
                }}
                aria-label="Copy email"
                title="Copy email"
              >
                {!copied ? <FiCopy className="hover:text-[#459DDE] transition-colors" /> : <FiCheck />}
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 p-4">
          <div className="mb-3 flex flex-col">
            <h4 className="flex items-center font-semibold text-md gap-1.5">
              <FiCalendar /> Date
            </h4>
            <div className="flex items-center gap-2 ml-6">
              <span className="text-sm">{formattedDate}</span>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full gap-4">
        <div className="p-4">
          <div className="mb-3 flex flex-col">
            <h4 className="flex items-center font-semibold text-md gap-1.5">
              <FiAlignLeft /> Message
            </h4>
            <div className="ml-6">
              <span className="text-sm">{message}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const formatDateTime = (value) => {
  if (!value) return "—";

  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";

  return d.toLocaleString("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
