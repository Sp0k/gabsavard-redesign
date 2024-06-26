const LatestPost = () => {
  const onClickHandler = () => console.log("Read more!");

  return (
    <div className="w-fit h-fit border-2 border-neutral-400 mt-6">
      <div className="w-[340px] h-[201px] bg-white"></div>
      <div className="px-4 py-4">
        <h1 className="font-Nunito text-[#D9D9D9] text-2xl">
          Automatic Scroll View
        </h1>
        <p className="w-[298px] font-Source-Sans-Pro text-base text-neutral-400 my-4">
          My quick and easy trick to follow the cursor's position in a TextInput
          in React Native
        </p>
        <button class="border border-[#459DDE] py-2 px-4 text-[#459DDE] font-Source-Sans-Pro text-base hover:bg-[#459DDE] hover:text-[#252525] transition-all">
          Read more {`>`}
        </button>
      </div>
    </div>
  );
};

export default LatestPost;
