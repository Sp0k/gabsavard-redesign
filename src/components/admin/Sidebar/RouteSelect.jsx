import { FiFileText, FiHome, FiMail, FiPieChart } from "react-icons/fi"

export const RouteSelect = () => {
  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={true} title={"Dashboard"} href="/admin/dashboard" />
      <Route Icon={FiFileText} selected={false} title={"Articles"} href="/" />
      <Route Icon={FiPieChart} selected={false} title={"Statistics"} href="/" />
      <Route Icon={FiMail} selected={false} title={"Messages"} href="/" />
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

