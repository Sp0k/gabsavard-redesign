const LatestPost = ({ post }) => {
  const title = post.data.title;
  const image = post.data.image;
  const description = post.data.description;
  const path = "/posts/" + post.slug;

  return (
    <div className="w-fit h-fit border border-neutral-400 mt-6 transition-all hover:border-[#459DDE] hover:shadow-[#459DDE] hover:shadow-lg">
      <a href="path">
        <img className="w-[340px] h-[201px]" src={image.url} alt={image.alt} />
        <div className="px-4 py-4">
          <h1 className="font-Nunito text-[#D9D9D9] text-2xl mb-0">{title}</h1>
          <p className="w-[298px] font-Source-Sans-Pro text-base text-neutral-400 my-4">
            {description}
          </p>
          <a
            href={path}
            class="border border-[#459DDE] py-2 px-4 text-[#459DDE] font-Source-Sans-Pro text-base hover:bg-[#459DDE] hover:text-[#252525] transition-all"
          >
            Read more {`>`}
          </a>
        </div>
      </a>
    </div>
  );
};

export default LatestPost;
