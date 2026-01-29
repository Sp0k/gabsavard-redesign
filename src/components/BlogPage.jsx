import { useState, useMemo } from "react";
import BlogList from "./BlogList";

const BlogPage = ({ blogPosts, blogTags, devlogPosts, devlogTags }) => {
  const [mode, setMode] = useState("blog");

  const showBlog = () => {
    setMode("blog");
  };

  const showDevlog = () => {
    setMode("devlog");
  };

  const basePosts = useMemo(() => {
    return mode === "blog" ? blogPosts : devlogPosts;
  }, [mode, blogPosts, devlogPosts]);

  const baseTags = useMemo(() => {
    return mode === "blog" ? blogTags : devlogTags;
  }, [mode, blogTags, devlogTags]);

  return (
    <div className="mt-4 flex flex-col mx-auto max-w-screen-xl w-full">
      <div className="flex flex-row transition-all">
        <button
          className={`cursor-pointer font-Source-Sans-Pro text-3xl lg:text-4xl 
text-[#459DDE] border-b-2 border-[#459DDE] pb-1 pl-1 max-w-xs
w-full text-left hover:text-[#D9D9D9] hover:border-[#D9D9D9] 
${mode === "blog" ? "text-[#459DDE] border-[#459DDE]" :
"text-neutral-500 border-neutral-500"}`}
          onClick={showBlog}
        >
          Blog
        </button>
        <button
          className={`cursor-pointer font-Source-Sans-Pro text-3xl lg:text-4xl 
text-[#459DDE] border-b-2 border-[#459DDE] pb-1 pl-1 max-w-xs
w-full text-left hover:text-[#D9D9D9] hover:border-[#D9D9D9] 
${mode === "devlog" ? "text-[#459DDE] border-[#459DDE]" :
"text-neutral-500 border-neutral-500"}`}
          onClick={showDevlog}
        >
          Devlogs
        </button>
      </div>
        <BlogList posts={basePosts} tags={baseTags} />
    </div>
  );
};

export default BlogPage;
