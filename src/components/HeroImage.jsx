const HeroImage = ({ currentJob }) => {
  const project = " " + currentJob;

  return (
    <div className="hidden lg:block w-[469px] h-[422px] animate-fade-left animate-once animate-ease-in-out animate-delay-[2400ms]">
      <img src="/hero.png" alt="Gab Savard" className="w-[469px] h-386px" />
      <div className="w-[402px] h-9 p-2 border border-neutral-400 justify-start items-center gap-2.5 inline-flex ml-8">
        <div className="w-4 h-4 bg-[#459DDE] border border-[#459DDE]" />
        <p className="text-gray-400 text-base font-normal font-Source-Sans-Pro">
          Currently working on
          <b className="text-[#459DDE] text-base font-semibold">{project}</b>
        </p>
      </div>
    </div>
  );
};

export default HeroImage;
