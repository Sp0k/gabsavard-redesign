import { StatsCards } from "./StatsCards"
import { RecentArticles } from "./RecentArticles"
import { RecentMessages } from "./RecentMessages"
import { ActivityGraph } from "./ActivityGraph"
import { UsagePie } from "./UsagePie"

export const Grid = ({ articles, messages }) => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatsCards postCount={articles.length} />
      <ActivityGraph />
      <UsagePie />
      <RecentArticles articles={articles} />
      <RecentMessages messages={messages} />
    </div>
  )
}

