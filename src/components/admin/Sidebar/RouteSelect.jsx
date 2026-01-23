import { FiFileText, FiHome, FiMail, FiPieChart } from "react-icons/fi"

export const RouteSelect = ({ page }) => {
  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={"dashboard" === page} title={"Dashboard"} href="/admin/dashboard" />
      <Route Icon={FiFileText} selected={"articles" === page} title={"Articles"} href="/admin/articles" />
      {/* <Route Icon={FiPieChart} selected={"statistics" === page} title={"Statistics"} href="/admin/statistics" /> */}
      <Route Icon={FiMail} selected={"messages" === page} title={"Messages"} href="/admin/messages" />
    </div>
  )
}

const Route = ({ selected, Icon, title, href }) => {
  return (
    <a
      className={
        `flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm
        transition-[box-shadow_background-color_color] ${selected 
          ? "bg-white text-stone-950 shadow" 
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"}`
      }
      href={href}
    >
      <Icon className={selected ? "text-[#459DDE]" : ""} />
      <span>{title}</span>
    </a>
  )
}

