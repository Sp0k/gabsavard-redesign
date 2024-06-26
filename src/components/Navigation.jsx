const Navigation = () => {
  return (
    <div>
      <div class="flex flex-row justify-between items-center mx-10 mt-[14px] bg-[#252525]">
        <a
          href="/"
          class="fill-neutral-400 w-16 h-16 hover:fill-[#459DDE] transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            class="w-16 h-16"
          >
            <title>Logo</title>
            <path d="M40-120v-80h880v80H40Zm120-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z" />
          </svg>
        </a>
        <ul class="list-none flex flex-row items-center">
          <li class="ml-7">
            <a
              href="/projects/"
              class="w-12 h-12 fill-neutral-400 hover:fill-[#459DDE] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="w-12 h-12"
              >
                <title>Projects</title>
                <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
              </svg>
            </a>
          </li>
          <li class="ml-7">
            <a
              href="/blog/"
              class="w-12 h-12 fill-neutral-400 hover:fill-[#459DDE] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="w-12 h-12"
              >
                <title>Blog</title>
                <path d="M160-120q-33 0-56.5-23.5T80-200v-640l67 67 66-67 67 67 67-67 66 67 67-67 67 67 66-67 67 67 67-67 66 67 67-67v640q0 33-23.5 56.5T800-120H160Zm0-80h280v-240H160v240Zm360 0h280v-80H520v80Zm0-160h280v-80H520v80ZM160-520h640v-120H160v120Z" />
              </svg>
            </a>
          </li>
          <li class="ml-7">
            <a
              href="/about/"
              class="w-12 h-12 fill-neutral-400 hover:fill-[#459DDE] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="w-12 h-12"
              >
                <title>About</title>
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
              </svg>
            </a>
          </li>
          <li class="ml-7">
            <a
              href="/contact/"
              class="w-12 h-12 fill-neutral-400 hover:fill-[#459DDE] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="w-12 h-12"
              >
                <title>Contact</title>
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
            </a>
          </li>
          <li class="ml-7">
            <a
              href="/"
              class="w-12 h-12 fill-neutral-400 hover:fill-[#459DDE] transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="w-12 h-12"
              >
                <title>Home</title>
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
