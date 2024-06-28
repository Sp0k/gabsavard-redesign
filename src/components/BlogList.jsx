import { useState } from "react";
import BlogCard from "./BlogCard";
import TagButton from "./TagButton";

const BlogList = ({ posts, tags }) => {
  const [list, setList] = useState([...posts]);
  const [active, setActive] = useState([]);

  function addActive(tag) {
    const tmp = active;
    tmp.push(tag);
    setActive(tmp);
  }

  function removeActive(tag) {
    const tmp = active;
    const index = tmp.indexOf(tag);
    if (index > -1) {
      tmp.splice(index, 1);
    }
    setActive(tmp);
  }

  const pressHandler = (tag) => {
    active.includes(tag) ? removeActive(tag) : addActive(tag);
    filterByTag();
  };

  const filterByTag = () => {
    if (active.length === 0) setList([...posts]);
    else {
      const tmp = [...posts];
      for (let i = 0; i < active.length; i++) {
        for (let j = 0; j < tmp.length; j++) {
          if (!tmp[j].data.tags.includes(active[i])) {
            tmp.splice(j, 1);
            j--;
          }
        }
      }

      setList([...tmp]);
    }
  };

  return (
    <div className="mt-6">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-Source-Sans-Pro text-[#D9D9D9] text-3xl">Filters:</p>
        {tags.map((tag) => (
          <TagButton tag={tag} pressHandler={pressHandler} key={tag} />
        ))}
      </div>
      <div className="flex flex-col items-center">
        {list.length === 0 ? (
          <p className="text-Source-Sans-Pro text-neutral-400 text-2xl my-8">
            Seems like there is no posts that match those tags
          </p>
        ) : (
          list.map((post) => (
            <BlogCard
              title={post.data.title}
              description={post.data.description}
              url={post.slug}
              image={post.data.image}
              key={post.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
