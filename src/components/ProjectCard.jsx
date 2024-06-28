const ProjectCard = () => {
  return (
    <div class="border border-[#D9D9D9] w-[500px] h-60 py-2 px-3 hover:border-[#459DDE] hover:shadow-[#459DDE] hover:shadow-lg transition-all">
      <a href="nowhere">
        <div class="w-full h-full">
          <div class="flex flex-row justify-between">
            <p class="text-3xl text-[#D9D9D9] text-Nunito">Title</p>
            <p class="text-lg text-pink-500 text-Source-Sans-Pro">type</p>
          </div>
          <hr class="h-[2px] bg-[#D9D9D9] border-none" />
          <p class="text-xl text-[#D9D9D9]">Description</p>
        </div>
      </a>
    </div>
  );
};

export default ProjectCard;
