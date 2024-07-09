import { useRef, useState } from "react";

const TagButton = ({ tag, pressHandler }) => {
  const buttonRef = useRef(null);
  const [active, setActive] = useState(false);
  const onClickHandler = () => {
    toggleActive();
    pressHandler(tag);
  };

  function toggleActive() {
    if (buttonRef.current) {
      if (!active) {
        buttonRef.current.classList.remove(
          "border-neutral-400",
          "text-neutral-400",
        );
        buttonRef.current.classList.add("border-[#459DDE]", "text-[#459DDE]");
        setActive(true);
      } else {
        buttonRef.current.classList.remove(
          "border-[#459DDE]",
          "text-[#459DDE]",
        );
        buttonRef.current.classList.add(
          "border-neutral-400",
          "text-neutral-400",
        );
        setActive(false);
      }
    }
  }

  return (
    <button
      ref={buttonRef}
      className="border border-neutral-400 py-1 px-2 lg:py-2 lg:px-4 text-base lg:text-xl text-neutral-400 hover:border-[#D9D9D9] hover:text-[#D9D9D9] transition-all mr-2 my-2"
      onClick={onClickHandler}
    >
      {tag}
    </button>
  );
};

export default TagButton;
