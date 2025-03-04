import styles from "./reachout.module.css";
import { useEffect, useRef } from "react";
import Fluid from "webgl-fluid";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RedditIcon from "@mui/icons-material/Reddit";
import PinterestIcon from "@mui/icons-material/Pinterest";
import ReachOutForm from "./childs/form/form";
import Game from "./childs/game/game";
import SmokeAnimation from "../footer/childs/component/smokeComponent/smoke";
import arrow from "../../assets/icons/Vector (13).png";


const ReachOut = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(function () {
    let c = canvasRef.current;
    Fluid(c, {
      SPLAT_RADIUS: 0.1, //fluid radius
      DENSITY_DISSIPATION: 1, //how fast fluid disappear
      PRESSURE_ITERATIONS: 300, //speed of fluid
    });
  }, []);

  useEffect(() => {
    const container = document.querySelector(`.${styles.container}`);

    const handleMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        const simulatedEvent = new MouseEvent("mousemove", {
          clientX: event.clientX,
          clientY: event.clientY,
        });
        canvasRef.current.dispatchEvent(simulatedEvent);
      }
    };

    container?.addEventListener("mousemove", handleMouseMove as EventListener);

    return () =>
      container?.removeEventListener(
        "mousemove",
        handleMouseMove as EventListener
      );
  }, []);

  return (
    <>
      <div className={styles.container}>
        <SmokeAnimation />
        <canvas
          className={styles.canvasLayer}
          ref={canvasRef}
          style={{ width: "100%", height: "100%", background: "" }}
        ></canvas>

        <div className="flex flex-col justify-center items-center text-center" style={{ fontFamily: "Calibri, Arial, sans-serif", fontWeight: 400, width: "50vw" }}>

          <div>
            <h1 className="relative w-full group inline-block px-6 py-2 font-bold uppercase text-black tracking-wide rounded-lg shadow-lg mt-20 md:mt-20 lg:mt-5 overflow-hidden text-center cursor-pointer text-base">
              {/* Base gradient layer */}
              <span
                className="absolute inset-0 transition-opacity duration-500
      bg-gradient-to-l from-lime-400 to-green-400 group-hover:opacity-0"
              ></span>

              {/* Hover gradient layer */}
              <span
                className="absolute inset-0 opacity-0 transition-opacity duration-500
      bg-gradient-to-l from-green-400 to-lime-400 group-hover:opacity-100"
              ></span>

              {/* Button text with custom wipe effect and color transition */}
              <span
                className="relative block text-center transition-colors duration-500 
    text-sm sm:text-lg md:text-base 
              group-hover:animate-fadeLeftRight group-hover:text-black-500"
              >
                REACH OUT TO US!
              </span>
            </h1>
          </div>

          {/* MESSAGE TEXT */}
          <p className="text-white text-xs sm:text-sm md:text-sm max-lg:text-lg font-medium leading-tight sm:leading-snug md:leading-normal mt-3 sm:mt-1 md:mt-1 min-lg:mt-3 mb-3 sm:mb-4 md:mb-5">
            Have an idea, question, or want to partner with us? <br />  Send us a message and hit
            <span className="font-bold text-white tracking-wide" style={{ fontSize: "1.5rem" }}> REACH OUT!</span>
          </p>

          {/* GAME SECTION */}
          <div className="relative flex flex-row items-center gap-2 ml-8">
            <Game />
            <div className="flex flex-col items-center mt-2">
              <img src={arrow} alt="Arrow pointing to game" width="30" height="30" />
              <p className="text-white text-sm pl-2">Try me</p>
            </div>
          </div>

          {/* GO SOCIALS BUTTON */}
          <button className="relative px-6 mt-2 py-2 font-bold uppercase text-black tracking-wide rounded-lg shadow-lg overflow-hidden cursor-pointer group">
            {/* Base gradient layer */}
            <span className="absolute inset-0 transition-opacity duration-500 bg-gradient-to-l from-lime-400 to-green-400 group-hover:opacity-0"></span>

            {/* Hover gradient layer */}
            <span className="absolute inset-0 opacity-0 transition-opacity duration-500 bg-gradient-to-l from-green-400 to-lime-400 group-hover:opacity-100"></span>

            {/* Button text with custom wipe effect and color transition */}
            <span className="relative block text-center transition-colors duration-500 group-hover:animate-fadeLeftRight group-hover:text-black-500">
              GO SOCIALS
            </span>
          </button>

          {/* SOCIAL ICONS */}
          <div className="flex justify-center gap-3 my-4">
            <LinkedInIcon className="w-10 h-10 bg-black text-white rounded-full p-2" />
            <FacebookIcon className="w-10 h-10 bg-black text-white rounded-full p-2" />
            <TwitterIcon className="w-10 h-10 bg-black text-white rounded-full p-2" />
            <InstagramIcon className="w-10 h-10 bg-black text-white rounded-full p-2" />
            <YouTubeIcon className="w-10 h-10 bg-black text-white rounded-full p-2" />
            <RedditIcon className="w-10 h-10 bg-black text-white rounded-full p-2" />
            <PinterestIcon className="w-10 h-10 bg-black text-white rounded-full p-2" />
          </div>
        </div>

        <div className="flex flex-col w-full sm:w-3/4 md:3/4 lg:w-1/2 justify-center gap-2 sm:gap-4">
          <ReachOutForm />
        </div>
      </div>
    </>
  );
};

export default ReachOut;