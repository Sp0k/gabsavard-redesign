import { useState } from "react";

const Picture = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full max-h-[300px] overflow-hidden">
      <img
        src={src}
        alt={alt}
        onClick={openModal}
        className="w-full h-full transition-all hover:scale-[1.05] mt-0 object-cover cursor-pointer"
      />
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 animate-fade animate-duration-100"
          onClick={closeModal}
        >
          <span
            className="absolute top-4 right-8 text-white text-4xl font-bold cursor-pointer"
            onClick={closeModal}
          >
            &times;
          </span>
          <img
            className="max-w-screen-lg max-h-screen w-[100%] lg:w-auto h-auto"
            src={src}
            alt={alt}
          />
        </div>
      )}
    </div>
  );
};

export default Picture;
