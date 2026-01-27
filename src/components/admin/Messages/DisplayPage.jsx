import { FiArrowLeft } from "react-icons/fi"
import { TopBar } from "./TopBar"
import { MessageDisplay } from "./MessageDisplay"
import { FaReply } from "react-icons/fa"

export const DisplayPage = ({ name, email, message, createdAt }) => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="px-4 grid gap-3 grid-cols-12">
        <div className="col-span-4">
        </div>
        <div className="col-span-8 flex justify-end gap-4">
          <a 
            className="flex cursor-pointer transition-colors p-2 text-sm text-stone-50 hover:bg-stone-700 bg-stone-950 rounded items-center gap-2"
            href="/admin/messages"
          >
            <FiArrowLeft />
            Back
          </a>
          <a 
            className="flex cursor-pointer transition-colors p-2 text-sm text-stone-50 hover:bg-stone-700 bg-stone-950 rounded items-center gap-2"
            href={`mailto:${email}`}
          >
            <FaReply />
            Reply
          </a>
        </div>
        <MessageDisplay
          name={name}
          email={email}
          message={message}
          createdAt={createdAt}
        />
      </div>
    </div>
  )
}

