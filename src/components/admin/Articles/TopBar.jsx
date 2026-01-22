import { FiLogOut } from "react-icons/fi";

export const TopBar = () => {
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">
            Thought of something new?
          </span>
          <span className="text-xs block text-stone-500">
            Let's share it!
          </span>
        </div>

        <form action="/api/auth/signout">
          <button 
            type="submit"
            className="flex text-sm items-center gap-2 bg-stone-100 transition-colors
                      hover:bg-[#ECF5FC] hover:text-[#459DDE] px-3 py-1.5 rounded cursor-pointer"
          >
            <FiLogOut />
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}

