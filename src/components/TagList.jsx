import { useState, useEffect, useRef } from "react";
import TagButton from "./TagButton";

const TagList = ({ onHandleTag, tags }) => {
  const [active, setActive] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const resetBtnRef = useRef(null);
  const dropdownRef = useRef(null);
  const tagsRef = useRef(null);

  const pressHandler = (tag) => {
    setActive((prev) => {
      const updatedTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];

      onHandleTag(updatedTags);
      return updatedTags;
    });
  };

  useEffect(() => {
    toggleResetButton();
  }, [active]);

  const toggleResetButton = () => {
    if (active.length >= 1) {
      resetBtnRef.current.classList.remove("opacity-0");
      resetBtnRef.current.classList.add(
        "opacity-100",
        "fill-neutral-500",
        "hover:fill-[#D9D9D9]",
      );
    } else {
      resetBtnRef.current.classList.remove(
        "opacity-100",
        "fill-neutral-500",
        "hover:fill-[#D9D9D9]",
      );
      resetBtnRef.current.classList.add("opacity-0");
    }
  };

  const handleReset = () => {
    setActive(() => {
      const updatedTags = [];
      onHandleTag(updatedTags);
      return updatedTags;
    });
  };

  const toggleDropdown = (state) => {
    if (dropdownRef) {
      if (state) {
        dropdownRef.current.classList.add("rotate-180");
        tagsRef.current.classList.add("flex");
        tagsRef.current.classList.remove("hidden");
      } else {
        dropdownRef.current.classList.remove("rotate-180");
        tagsRef.current.classList.add("hidden");
        tagsRef.current.classList.remove("flex");
      }
    }
  };

  const handleDropdown = () => {
    setDropdown((prev) => {
      const updatedValue = !prev;
      toggleDropdown(updatedValue);
      return updatedValue;
    });
  };

  return (
    <div className="max-w-screen h-fit lg:border-r-2 border-neutral-400 lg:sticky lg:top-10 mb-4 lg:mb-0 lg:mr-8">
      {/* TODO: Add a drop down menu button */}
      <div className="flex flex-row justify-between h-fit">
        <div className="flex flex-row">
          <button onClick={handleDropdown}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-12 h-12 fill-[#D9D9D9] duration-200 ease-in-out lg:hidden"
              ref={dropdownRef}
            >
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          </button>
          <p className="text-Source-Sans-Pro text-[#D9D9D9] text-2xl my-auto">
            Filters:
          </p>
        </div>
        <button onClick={handleReset}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="mr-7 opacity-0 fill-neutral-500 hover:fill-[#D9D9D9] my-auto w-8 h-8 lg:w-7 lg:h-7 lg:mr-2"
            ref={resetBtnRef}
          >
            <path d="m456-320 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 160q-19 0-36-8.5T296-192L80-480l216-288q11-15 28-23.5t36-8.5h440q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H360ZM180-480l180 240h440v-480H360L180-480Zm400 0Z" />
          </svg>
        </button>
      </div>
      <div
        className="flex-col overflow-y-scroll scroll-smooth scrollbar overflow-hidden max-h-106 pr-6 mr-1 ml-10 hidden lg:flex lg:ml-0 duration-200 ease-in-out"
        ref={tagsRef}
      >
        {tags.map((tag) => (
          <TagButton
            tag={tag}
            pressHandler={pressHandler}
            isActive={active.includes(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagList;
