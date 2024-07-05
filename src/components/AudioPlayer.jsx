import { useRef, useState } from "react";

const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const handleSeek = (e) => {};

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) handlePause;
    else handlePlay;
  };

  return (
    <div className="w-80 bg-[#f1f4f9] rounded-lg py-4 px-4">
      <div className="w-80 h-auto rounded-lg"></div>
      <input
        className="w-full h-1 accent-[#436ee6] outline-none"
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
      />
      <audio ref={audioRef} src={audioSrc} />
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs font-medium text-[#18181f] my-0 mx-0">
          {currentTime}
        </p>
        <p className="text-xs font-medium text-[#18181f] my-0 mx-0">
          {duration}
        </p>
      </div>

      <button
        onClick={handlePlayPause}
        className="w-12 h-12 text-4xl font-semibold flex items-center justify-center bg-[#436ee6] border-none rounded-[50%] cursor-pointer mx-auto mt-[5px] mb-10px"
      >
        <span>
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
            </svg>
          )}
        </span>
      </button>
    </div>
  );
};

export default AudioPlayer;
