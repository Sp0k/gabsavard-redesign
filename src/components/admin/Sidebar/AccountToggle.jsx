import { FiChevronDown, FiChevronUp } from "react-icons/fi"

export const AccountToggle = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <a href="/" title="Go back to site" className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://api.dicebear.com/9.x/lorelei/svg?seed=Christopher"
          alt="Avatar"
          className="size-8 rounded shrink-0 bg-[#459DDE] shadow"
        />
        <div className="text-start">
          <span className="text-sm font-semibold block">
            Gab Savard
          </span>
          <span className="text-xs block text-stone-500">
            admin
          </span>
        </div>
        
        <FiChevronDown className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)] text-xs" />
        <FiChevronUp className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)] text-xs" />
      </a>
    </div>
  )
}

