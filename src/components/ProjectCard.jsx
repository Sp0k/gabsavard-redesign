const ProjectCard = ({ color, title, type, description, url }) => {
  const colors = {
    videoGame: "text-purple-400",
    code: "text-rose-700",
    web: "text-emerald-400",
    music: "text-cyan-300",
  };

  const path = "/projects/" + url;

  return (
    <div className="border border-[#D9D9D9] w-[450px] h-48 py-2 px-3 hover:border-[#459DDE] hover:shadow-[#459DDE] hover:shadow-lg transition-all mt-2">
      <a href={path}>
        <div className="w-full h-full">
          <div className="flex flex-row justify-between items-center">
            <p className="text-3xl text-[#D9D9D9] text-Nunito">{title}</p>
            <p
              className={`text-lg ${colors[color]} text-Source-Sans-Pro min-w-fit`}
            >
              {type}
            </p>
          </div>
          <hr className="h-[2px] bg-[#D9D9D9] border-none" />
          <p className="text-xl text-[#D9D9D9] mt-4">{description}</p>
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;
