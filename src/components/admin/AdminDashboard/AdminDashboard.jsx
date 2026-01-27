import { Grid } from "./Grid"
import { TopBar } from "./TopBar"

export const AdminDashboard = ({ articles, messages }) => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <Grid articles={articles} messages={messages} />
    </div>
  )
}

