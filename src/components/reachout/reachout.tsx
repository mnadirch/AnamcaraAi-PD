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

        <div className={styles.content1} style={{ fontFamily: "Calibri, Arial, sans-serif", fontWeight: 400, width: "50vw" }}>

          <h1 className="relative group inline-block overflow-hidden cursor-pointer rounded-lg shadow-lg">
            {/* Base gradient layer (preserving your original gradient) */}
            <span
              className="absolute inset-0 transition-opacity duration-500
               bg-gradient-to-r from-green-400 to-lime-400 group-hover:opacity-0"
            ></span>

            {/* Hover gradient layer (reverse effect) */}
            <span
              className="absolute inset-0 opacity-0 transition-opacity duration-500
               bg-gradient-to-r from-green-400 to-lime-400 group-hover:opacity-100"
            ></span>

            {/* Heading text with original styling and wipe animation on hover */}
            <span
              className="relative block text-3xl font-bold uppercase tracking-wide text-black
               px-6 py-3 shadow-lg rounded-lg transition-all duration-1000
               group-hover:animate-fadeLeftRight"
            >
              REACH OUT TO US!
            </span>
          </h1>


          <p className="text-white text-lg font-medium leading-snug mt-5 mb-5" >
            Have an idea, question, or want to partner with us? <br />  Send us a message and hit
            <span className="font-bold text-white text-xl md:text-2xl lg:text-3xl tracking-wide"> REACH OUT!</span>
          </p>
          <div className="flex flex-row gap-x-4">
            <Game />
            <div >
              <img
                src={arrow}
                alt="A short, descriptive text for accessibility"
                width="30"
                height="30"
              />
              <p>Try me</p>
            </div>
          </div>

          <div>
            <h1 className="relative w-full group inline-block px-6 py-3 font-bold uppercase text-black tracking-wide rounded-lg shadow-lg mt-10 overflow-hidden  text-center  cursor-pointer">
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
               group-hover:animate-fadeLeftRight group-hover:text-black-500"
              >
                Go Socials
              </span>
            </h1>

            {/* Icons container: row layout, spacing */}
            <div className="flex flex-row gap-4 my-3">
              <LinkedInIcon className="w-30 h-30 bg-black text-white rounded-full p-1" />
              <FacebookIcon className="w-30 h-30 bg-black text-white rounded-full p-1" />
              <TwitterIcon className="w-10 h-10 bg-black text-white rounded-full p-1" />
              <InstagramIcon className="w-10 h-10 bg-black text-white rounded-full p-1" />
              <YouTubeIcon className="w-10 h-10 bg-black text-white rounded-full p-1" />
              <RedditIcon className="w-10 h-10 bg-black text-white rounded-full p-1" />
              <PinterestIcon className="w-10 h-10 bg-black text-white rounded-full p-1" />
            </div>
          </div>

        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            justifyContent: "center",
            //alignItems: "center",
            gap: 10,
          }}
        >
          <ReachOutForm />
        </div>
      </div>
    </>
  );
};

export default ReachOut;
