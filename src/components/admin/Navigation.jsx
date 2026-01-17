const Navigation = ({ accessToken, refreshToken }) => {
  const showSignOut = accessToken && refreshToken;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mx-5 md:mx-6 lg:mx-8 xl:mx-10 mt-[14px] bg-[#252525]">
        <div className="flex flex-row justify-between items-center w-full md:w-fit">
          <a
            href="/"
            className="fill-neutral-400 w-12 h-12 md:w-16 md:h-16 hover:fill-[#459DDE] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="w-full h-full"
            >
              <title>Logo</title>
              <path d="M40-120v-80h880v80H40Zm120-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z" />
            </svg>
          </a>
        </div>
        { showSignOut && 
          <form action="/api/auth/signout">
            <button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 fill-neutral-400 hover:fill-[#459DDE] cursor-pointer" viewBox="0 -960 960 960">
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
              </svg>
            </button>
          </form>
        }
      </div>
    </div>
  );
};

export default Navigation;
