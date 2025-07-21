import Navigation from "../components/Navigation";
import SideBar from "../components/SideBar";
import "../styles/global.css";

const ScrollView = ({ children }) => {
  const year = new Date().getFullYear();

  return (
    <div className="max-w-screen-2xl h-[100dvh] md:h-[95dvh] rounded-[40px] border-2 border-neutral-400 mx-auto md:mt-[2dvh] overflow-hidden overflow-y-auto">
      <div className="overscroll-contain">
        <Navigation />
        <div className="flex flex-row h-[100%] justify-center gap-8 ml-8 items-start md:pr-1">
          <SideBar />
          <div className="max-w-[1400px] w-full min-h-[500px] h-[87dvh] md:max-h-[83dvh] overflow-y-scroll scrollbar scroll-smooth overscroll-none">
            <div className="mr-6 md:mr-0">{children}</div>
            <p className="mx-auto text-[#999999] w-fit font-Source-Sans-Pro text-sm md:text-base py-6">
              © Copyright {year}. Made by Gab Savard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollView;
