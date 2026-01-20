import { StatsCards } from "./StatsCards"
import { RecentArticles } from "./RecentArticles"
import { RecentMessages } from "./RecentMessages"

export const Grid = ({ articles }) => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatsCards />
      <RecentArticles articles={articles} />
      <RecentMessages />
    </div>
  )
}

