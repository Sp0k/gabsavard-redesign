import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import TagList from "./TagList";
import Pagination from "./Pagination";

const BlogList = ({ posts, tags }) => {
  const [list, setList] = useState([...posts]);
  const [active, setActive] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    filterByTag();
  }, [active, posts]);

  const handleFilterChange = (filters) => {
    setActive(filters);
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
    <div className="mt-2 flex flex-col lg:mt-6 lg:flex-row mx-auto max-w-screen-xl w-full">
      <TagList onHandleTag={handleFilterChange} tags={tags} />
      <div className="flex flex-col items-center mx-auto">
        {list.length === 0 ? (
          <p className="text-Source-Sans-Pro text-neutral-400 text-2xl my-8 w-full md:w-2xl lg:max-w-[1000px]">
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
