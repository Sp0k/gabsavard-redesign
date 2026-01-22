import { TopBar } from "./TopBar"
import { FileDrop } from "./FileDrop"
import { FiArrowLeft } from "react-icons/fi"

export const UploadDropbox = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />     
      <div className="px-4 grid gap-3 grid-cols-12">
        <a 
          className="flex cursor-pointer transition-colors p-2 text-sm text-stone-50 hover:bg-stone-700 bg-stone-950 rounded items-center gap-2"
          href="/admin/articles"
        >
          <FiArrowLeft />
          Back
        </a>
        <FileDrop />
      </div>
    </div>
  )
}

