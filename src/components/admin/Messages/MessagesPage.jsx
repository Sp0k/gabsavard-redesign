import { TopBar } from "./TopBar"
import { MessageList } from "./MessageList"

export const MessagesPage = ({ messages }) => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="px-4 grid gap-3 grid-cols-12">
        <MessageList messages={messages} />
      </div>
    </div>
  )
}

