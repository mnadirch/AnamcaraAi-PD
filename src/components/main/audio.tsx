import { useState, useRef, useEffect } from "react";
import playIcon from "../../assets/images/audio/Type=Play.png";
import pauseIcon from "../../assets/images/audio/Type=Pause.png";
import replayIcon from "../../assets/images/audio/Type=Replay.png";
import audioFile from "../../assets/audio/Beth-2024_12_31-6.wav";

const Audio: React.FC = () => {
  const [audioState, setAudioState] = useState<"playing" | "paused" | "replay">("paused");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup previous audio instance if exists
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Create new audio instance and set preload
    audioRef.current = new window.Audio(audioFile);
    audioRef.current.preload = "auto";


    // Attempt to play audio automatically
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        setAudioState("playing");
      } catch (error) {
        console.error("Autoplay blocked, waiting for user interaction:", error);
        setAudioState("paused");
      }
    };

    playAudio();

    // Event listener to change state when audio ends
    const handleAudioEnd = () => setAudioState("replay");
    audioRef.current.addEventListener("ended", handleAudioEnd);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnd);
        audioRef.current.pause();
        audioRef.current.src = ""; // Cleanup to prevent memory leaks
      }
    };
  }, []); // Runs when component mounts

  const handleAudioControl = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent click propagation to parent div

    if (!audioRef.current) return;

    switch (audioState) {
      case "playing":
        audioRef.current.pause();
        setAudioState("paused");
        break;
      case "paused":
        audioRef.current
          .play()
          .then(() => setAudioState("playing"))
          .catch((error) => console.error("Audio play error:", error));
        break;
      case "replay":
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .then(() => setAudioState("playing"))
          .catch((error) => console.error("Audio replay error:", error));
        break;
    }
  };

  return (
    <div className="absolute top-4 right-4 z-30" onClick={(e) => e.stopPropagation()}>
      <img
        src={audioState === "playing" ? pauseIcon : audioState === "paused" ? playIcon : replayIcon}
        alt={audioState}
        className="w-10 h-10 cursor-pointer"
        onClick={handleAudioControl}
      />
    </div>
  );
};

export default Audio;
