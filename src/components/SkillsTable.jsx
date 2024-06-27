import { useState, useRef, useEffect } from "react";

const SkillsTable = () => {
  // Tab refs
  const languagesRef = useRef();
  const frameworksRef = useRef();
  const softSkillsRef = useRef();
  const certificationsRef = useRef();
  const tabs = [languagesRef, frameworksRef, softSkillsRef, certificationsRef];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Button refs
  const languagesBtn = useRef();
  const frameworksBtn = useRef();
  const softSkillsBtn = useRef();
  const certificationsBtn = useRef();
  const buttons = [
    languagesBtn,
    frameworksBtn,
    softSkillsBtn,
    certificationsBtn,
  ];

  const [activeBtn, setActiveBtn] = useState(buttons[0]);

  const onClickHandle = (btnRef, tabRef) => {
    setActiveTab(tabRef);
    setActiveBtn(btnRef);
  };

  useEffect(() => {
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].current.classList.remove("flex");
      tabs[i].current.classList.add("hidden");
    }

    for (let j = 0; j < buttons.length; j++) {
      buttons[j].current.classList.remove("text-[#459DDE]", "border-[#459DDE]");
      buttons[j].current.classList.add(
        "text-neutral-400",
        "border-neutral-400",
      );
    }

    const tabIndex = tabs.indexOf(activeTab);
    tabs[tabIndex].current.classList.remove("hidden");
    tabs[tabIndex].current.classList.add("flex");

    const btnIndex = buttons.indexOf(activeBtn);
    buttons[btnIndex].current.classList.remove(
      "text-neutral-400",
      "border-neutral-400",
    );
    buttons[btnIndex].current.classList.add(
      "text-[#459DDE]",
      "border-[#459DDE]",
    );
  }, [activeTab]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col px-4 gap-[6px]">
        <button
          className="text-3xl border py-4 px-4 text-neutral-400 border-neutral-400 hover:text-[#D9D9D9] hover:border-[#D9D9D9] transition-all font-Source-Sans-Pro"
          onClick={() => onClickHandle(buttons[0], tabs[0])}
          ref={languagesBtn}
        >
          Languages
        </button>
        <button
          className="text-3xl text-neutral-400 border border-neutral-400 py-4 px-4 hover:text-[#D9D9D9] hover:border-[#D9D9D9] transition-all font-Source-Sans-Pro"
          onClick={() => onClickHandle(buttons[1], tabs[1])}
          ref={frameworksBtn}
        >
          Frameworks
        </button>
        <button
          className="text-3xl text-neutral-400 border border-neutral-400 py-4 px-4 hover:text-[#D9D9D9] hover:border-[#D9D9D9] transition-all font-Source-Sans-Pro"
          onClick={() => onClickHandle(buttons[2], tabs[2])}
          ref={softSkillsBtn}
        >
          Soft Skills
        </button>
        <button
          className="text-3xl text-neutral-400 border border-neutral-400 py-4 px-4 hover:text-[#D9D9D9] hover:border-[#D9D9D9] transition-all font-Source-Sans-Pro"
          onClick={() => onClickHandle(buttons[3], tabs[3])}
          ref={certificationsBtn}
        >
          Certifications
        </button>
      </div>
      <div className="min-w-[800px] border-2 border-neutral-400 h-fit">
        <div
          className="flex flex-col justify-center transition-all"
          ref={languagesRef}
        >
          <p className="font-semibold font-Nunito text-4xl text-[#D9D9D9] text-left py-2 ml-2">
            Languages
          </p>
          <hr className="h-0.5 bg-neutral-400 border-transparent" />
          <ul className="grid grid-cols-2 gap-10 text-3xl font-Source-Sans-Pro text-[#D9D9D9] list-disc mx-auto py-6">
            <li className="mr-5">Java</li>
            <li className="ml-5">C</li>
            <li className="mr-5">JavaScript</li>
            <li className="ml-5">Ruby</li>
            <li className="mr-5">C#</li>
          </ul>
        </div>
        <div
          className="flex flex-col justify-center transition-all"
          ref={frameworksRef}
        >
          <p className="font-semibold font-Nunito text-4xl text-[#D9D9D9] text-left py-2 ml-2">
            Frameworks
          </p>
          <hr className="h-0.5 bg-neutral-400 border-transparent" />
          <ul className="grid grid-cols-2 gap-10 text-3xl font-Source-Sans-Pro text-[#D9D9D9] list-disc mx-auto py-6">
            <li className="mr-5">React</li>
            <li className="ml-5">React Native</li>
            <li className="mr-5">Ruby on Rails</li>
            <li className="ml-5">Astro</li>
            <li className="mr-5">Tailwind</li>
          </ul>
        </div>
        <div
          className="flex flex-col justify-center transition-all"
          ref={softSkillsRef}
        >
          <p className="font-semibold font-Nunito text-4xl text-[#D9D9D9] text-left py-2 ml-2">
            Soft Skills
          </p>
          <hr className="h-0.5 bg-neutral-400 border-transparent" />
          <ul className="grid grid-cols-2 gap-10 text-3xl font-Source-Sans-Pro text-[#D9D9D9] list-disc mx-auto py-6">
            <li className="mr-5">Passionate</li>
            <li className="ml-5">Critical Thinking</li>
            <li className="mr-5">Teamwork</li>
            <li className="ml-5">Leadership</li>
            <li className="mr-5">Communication</li>
            <li className="ml-5">Problem Solving</li>
          </ul>
        </div>
        <div
          className="flex flex-col justify-center transition-all"
          ref={certificationsRef}
        >
          <p className="font-semibold font-Nunito text-4xl text-[#D9D9D9] text-left py-2 ml-2">
            Certifications
          </p>
          <hr className="h-0.5 bg-neutral-400 border-transparent" />
          <ul className="grid grid-cols-2 gap-10 text-2xl font-Source-Sans-Pro text-[#D9D9D9] list-disc mx-auto py-8 px-8">
            <li className="mr-5">React Native (ShiftKey Labs)</li>
            <li className="ml-5">React Native (Udemy)</li>
            <li className="mr-5">Unity and C# (Udemy)</li>
            <li className="ml-5">React (Udemy)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillsTable;
