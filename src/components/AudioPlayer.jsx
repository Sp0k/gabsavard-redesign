import { useRef, useState, useEffect } from "react";

const AudioPlayer = ({ audioSrc, songTitle, artist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (isPlaying) handlePause();
    else handlePlay();
  };

  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (currentTime === duration) {
      setIsPlaying(false);
    }
  }, [currentTime]);

  return (
    <div className="w-[41rem] border border-neutral-400 py-4 px-4 flex flex-row justify-evenly items-center mx-auto">
      <div className="flex items-center flex-col">
        <div className="w-36 h-36 bg-white"></div>
      </div>
      <div className="w-[350px]">
        <div className="flex flex-col items-center">
          <h1 className="mb-0 mt-3 font-Nunito text-2xl font-semibold text-[#D9D9D9]">
            {songTitle}
          </h1>
          <div className="my-0 text-base text-[#D9D9D9] font-Source-Sans-Pro">
            {artist}
          </div>
        </div>
        <input
          className="w-full h-1 accent-[#459DDE] outline-none"
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <audio ref={audioRef} src={audioSrc} />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs font-medium text-[#D9D9D9] my-0 mx-0">
            {formatDuration(currentTime)}
          </p>
          <p className="text-xs font-medium text-[#D9D9D9] my-0 mx-0">
            {formatDuration(duration)}
          </p>
        </div>

        <button
          onClick={handlePlayPause}
          className="w-12 h-12 text-4xl font-semibold flex items-center justify-center bg-[#459DDE] border-none rounded-[50%] cursor-pointer mx-auto mt-[5px] mb-10px"
        >
          <span>
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#252525"
              >
                <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#252525"
              >
                <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
