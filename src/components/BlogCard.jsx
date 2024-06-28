const BlogCard = ({ title, description, url, image }) => {
  const path = "/posts/" + url;

  return (
    <div className="w-[1000px] border-2 border-neutral-400 flex flex-row py-4 px-4 my-4 mx-auto">
      <div className="w-[331.5px] h-[160px] overflow-hidden border border-neutral-400 my-auto">
        <img src={image.url} alt={image.src} />
      </div>
      <div className="px-4 max-w-[550px]">
        <div className="text-3xl text-[#D9D9D9] font-Nunito mb-2">{title}</div>
        <div className="text-xl text-[#D9D9D9] font-Source-Sans-Pro mb-6">
          {description}
        </div>
        <a
          href={path}
          className="border border-[#459DDE] py-2 px-4 text-[#459DDE] font-Source-Sans-Pro text-base hover:bg-[#459DDE] hover:text-[#252525] transition-all"
        >
          Read more {`>`}
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
