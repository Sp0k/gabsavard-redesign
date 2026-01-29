import { FiShare, FiBookOpen } from "react-icons/fi"
import { TopBar } from "./TopBar"
import { List } from "./List"

export const ArticlesPage = ({ articles, devlogs }) => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="px-4 grid gap-3 grid-cols-12">
        <div className="col-span-4">
        </div>
        <div className="col-span-8 flex justify-end gap-4">
          <a 
            className="flex cursor-pointer transition-colors p-2 text-sm text-stone-50 hover:bg-stone-700 bg-stone-950 rounded items-center gap-2"
            href="/blog"
            target="_blank"
          >
            <FiBookOpen />
            Open Blog Page
          </a>
          <a 
            className="flex cursor-pointer transition-colors p-2 text-sm text-stone-50 hover:bg-stone-700 bg-stone-950 rounded items-center gap-2"
            href="/admin/uploads"
          >
            <FiShare />
            Upload New Article
          </a>
        </div>
        <List articles={articles} sectionName="Articles" />
        <List articles={devlogs} sectionName="Devlogs" />
      </div>
    </div>
  )
}

