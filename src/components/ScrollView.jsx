import Navigation from "../components/Navigation";
import SideBar from "../components/SideBar";

const ScrollView = ({ children }) => {
  return (
    <div className="max-w-screen-2xl max-h-[1000px] h-[95vh] rounded-[40px] border-2 border-neutral-400 mx-auto mt-[3vh] overflow-hidden">
      <Navigation />
      <div class="flex flex-row h-[100%] justify-center gap-8 ml-8 items-start">
        <SideBar />
        <div className="max-w-[1400px] w-full h-[100%] min-h-[500px] max-h-[850px] rounded-[20px] overflow-y-scroll border-0 border-neutral-400">
          {children}
          <p className="mx-auto text-[#999999] w-fit font-Source-Sans-Pro text-base py-6">
            © Copyright 2024. Made by Gab Savard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollView;
