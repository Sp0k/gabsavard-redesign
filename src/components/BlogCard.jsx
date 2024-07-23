const BlogCard = ({ title, description, url, image }) => {
  const path = "/posts/" + url;

  return (
    <div className="w-full md:w-fit md:max-w-2xl lg:max-w-[1000px] border border-[#D9D9D9] flex flex-row py-4 px-4 my-4 mx-auto hover:shadow-[#459DDE] hover:shadow-lg transition-all hover:border-[#459DDE]">
      <a href={path} className="flex flex-col lg:flex-row">
        <div className="w-full md:w-full lg:max-w-[331.5px] h-auto md:max-h-[160px] mb-4 lg:mb-auto overflow-hidden border border-neutral-400 lg:my-auto mx-auto">
          <img src={image.url} alt={image.src} />
        </div>
        <div className="px-4 max-w-[550px]">
          <div className="text-2xl lg:text-3xl text-[#D9D9D9] font-Nunito mb-2 font-semibold">
            {title}
          </div>
          <div className="text-lg lg:text-xl text-[#D9D9D9] font-Source-Sans-Pro mb-6">
            {description}
          </div>
          <div className="border border-[#459DDE] w-fit py-1 lg:py-2 px-2 lg:px-4 text-[#459DDE] font-Source-Sans-Pro text-base hover:bg-[#459DDE] hover:text-[#252525] transition-all">
            Read more {`>`}
          </div>
        </div>
      </a>
    </div>
  );
};

export default BlogCard;
