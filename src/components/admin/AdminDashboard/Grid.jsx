import { StatsCards } from "./StatsCards"
import { RecentArticles } from "./RecentArticles"
import { RecentMessages } from "./RecentMessages"
import { ActivityGraph } from "./ActivityGraph"
import { UsageRadar } from "./UsageRadar"

export const Grid = ({ articles }) => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatsCards postCount={articles.length} />
      <ActivityGraph />
      <UsageRadar />
      <RecentArticles articles={articles} />
      <RecentMessages />
    </div>
  )
}

