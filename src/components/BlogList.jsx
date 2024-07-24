import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import TagButton from "./TagButton";
import Pagination from "./Pagination";

const BlogList = ({ posts, tags }) => {
  const [list, setList] = useState([...posts]);
  const [active, setActive] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    filterByTag();
  }, [active]);

  const addActive = (tag) => {
    setActive((prev) => [...prev, tag]);
  };

  const removeActive = (tag) => {
    setActive((prev) => prev.filter((t) => t !== tag));
  };

  const pressHandler = (tag) => {
    active.includes(tag) ? removeActive(tag) : addActive(tag);
  };

  const filterByTag = () => {
    if (active.length === 0) {
      setList([...posts]);
    } else {
      const filteredPosts = posts.filter((post) =>
        active.every((tag) => post.data.tags.includes(tag)),
      );
      setList(filteredPosts);
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(list.length / itemsPerPage);

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
          currentItems.map((post) => (
            <BlogCard
              title={post.data.title}
              description={post.data.description}
              url={post.slug}
              image={post.data.image}
              key={post.id}
            />
          ))
        )}
        {list.length >= itemsPerPage ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BlogList;
