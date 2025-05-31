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
            className="mr-7 opacity-0 fill-neutral-500 hover:fill-[#D9D9D9] m-auto w-8 h-8 lg:w-7 lg:h-7 lg:mr-2"
            ref={resetBtnRef}
          >
            <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
          </svg>
        </button>
      </div>
      <div
        className="flex-col overflow-y-scroll overscroll-none scroll-smooth scrollbar overflow-hidden md:h-96 lg:max-h-122 pr-6 mr-1 ml-10 hidden lg:flex lg:ml-0 duration-200 ease-in-out"
        ref={tagsRef}
      >
        {tags.map((tag) => (
          <TagButton
            tag={tag}
            key={tag}
            pressHandler={pressHandler}
            isActive={active.includes(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagList;
