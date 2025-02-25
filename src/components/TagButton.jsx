import { useRef, useState, useEffect } from "react";

const TagButton = ({ tag, pressHandler, isActive }) => {
  const buttonRef = useRef(null);
  const squareRef = useRef(null);
  const [active, setActive] = useState(false);

  const onClickHandler = () => {
    toggleActive();
    pressHandler(tag);
  };

  const toggleActive = () => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    setActive(isActive);
    updateStyles(isActive);
  }, [isActive]);

  const updateStyles = (state) => {
    if (buttonRef.current && squareRef.current) {
      if (state) {
        buttonRef.current.classList.remove("text-neutral-400");
        squareRef.current.classList.remove(
          "border-neutral-400",
          "bg-transparent",
        );
        buttonRef.current.classList.add("text-[#459DDE]");
        squareRef.current.classList.add("border-[#459DDE]", "bg-[#459DDE]");
        setActive(true);
      } else {
        buttonRef.current.classList.remove("text-[#459DDE]");
        squareRef.current.classList.remove("border-[#459DDE]", "bg-[#459DDE]");
        buttonRef.current.classList.add("text-neutral-400");
        squareRef.current.classList.add("border-neutral-400", "bg-transparent");
        setActive(false);
      }
    }
  };

  return (
    <button
      ref={buttonRef}
      className="text-left text-lg lg:text-xl text-neutral-400 hover:text-[#D9D9D9] transition-all my-0.5 pb-0.5 flex flex-row border-b border-neutral-500"
      onClick={onClickHandler}
    >
      <div
        ref={squareRef}
        className="border border-neutral-400 mx-1 w-3 h-3 my-auto"
      ></div>
      {tag}
    </button>
  );
};

export default TagButton;
