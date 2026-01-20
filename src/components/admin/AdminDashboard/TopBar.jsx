import { FiLogOut } from "react-icons/fi";

export const TopBar = () => {
  const ordinal= (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  const today = () => {
    const d = new Date();

    const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(d);
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d);
    const day = d.getDate();
    const year = d.getFullYear();

    return (
      <span>
        {weekday}, {month} {ordinal(day)} {year}
      </span>
    );
  }

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">
            Welcome back, Gab!
          </span>
          <span className="text-xs block text-stone-500">
            {today()}
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

