import { useState, useRef, useEffect } from "react";
import BlogList from "./BlogList";

const BlogPage = ({ blogPosts, blogTags }) => {
  const [content, setContent] = useState("blog");
  const blogBtnRef = useRef(null);
  const devlogBtnRef = useRef(null);
  const btns = useRef(null);

  const showBlog = () => {
    setContent("blog");
  };

  const showDevlog = () => {
    setContent("devlog");
  };

  useEffect(() => {
    if (content === "blog") {
      blogBtnRef.current.classList.remove(
        "text-neutral-500",
        "border-neutral-500",
      );
      devlogBtnRef.current.classList.remove(
        "text-[#459DDE]",
        "border-[#459DDE]",
      );

      blogBtnRef.current.classList.add("text-[#459DDE]", "border-[#459DDE]");
      devlogBtnRef.current.classList.add(
        "text-neutral-500",
        "border-neutral-500",
      );
    } else {
      devlogBtnRef.current.classList.remove(
        "text-neutral-500",
        "border-neutral-500",
      );
      blogBtnRef.current.classList.remove("text-[#459DDE]", "border-[#459DDE]");

      devlogBtnRef.current.classList.add("text-[#459DDE]", "border-[#459DDE]");
      blogBtnRef.current.classList.add(
        "text-neutral-500",
        "border-neutral-500",
      );
    }
  }, [content]);

  return (
    <div className="mt-4 flex flex-col mx-auto max-w-screen-xl w-full">
      <div className="flex flex-row transition-all" ref={btns}>
        <button
          className="font-Source-Sans-Pro text-3xl lg:text-4xl text-[#459DDE] border-b-2 border-[#459DDE] pb-1 pl-1 max-w-xs w-full text-left hover:text-[#D9D9D9] hover:border-[#D9D9D9]"
          onClick={showBlog}
          ref={blogBtnRef}
        >
          Blog
        </button>
        <button
          className="font-Source-Sans-Pro text-3xl lg:text-4xl text-neutral-500 border-b-2 border-neutral-500 pb-2 pl-1 max-w-xs w-full text-left hover:text-[#D9D9D9] hover:border-[#D9D9D9]"
          onClick={showDevlog}
          ref={devlogBtnRef}
        >
          Devlogs
        </button>
      </div>
      {content === "blog" ? (
        <BlogList posts={blogPosts} tags={blogTags} />
      ) : (
        <p className="font-Source-Sans-Pro text-neutral-400 text-4xl my-8 w-full md:w-2xl lg:max-w-[1000px] text-center">
          Coming Soon!
        </p>
      )}
    </div>
  );
};

export default BlogPage;
