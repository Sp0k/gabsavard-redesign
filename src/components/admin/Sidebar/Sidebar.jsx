import { AccountToggle } from "./AccountToggle"
import { Search } from "./Search"
import { RouteSelect } from "./RouteSelect"

export const Sidebar = ({ page }) => {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountToggle />
        <Search />
        <RouteSelect page={page} />
      </div>
    </div>
  )
}

