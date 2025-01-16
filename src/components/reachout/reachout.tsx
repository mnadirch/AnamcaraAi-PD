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

        <div className={styles.content1}>
          <h1>REACH OUT TO US!</h1>
          <p>
            Have an idea, question, or want to partner with us? Send us a
            message and hit REACH OUT!
          </p>

          <Game />
          <h1>GO SOCIALS</h1>
          <div className={styles.iconsContainer}>
            <LinkedInIcon style={{ color: " #9ef01a" }} />
            <FacebookIcon style={{ color: " #9ef01a" }} />
            <TwitterIcon style={{ color: " #9ef01a" }} />
            <InstagramIcon style={{ color: " #9ef01a" }} />
            <YouTubeIcon style={{ color: " #9ef01a" }} />
            <RedditIcon style={{ color: " #9ef01a" }} />
            <PinterestIcon style={{ color: " #9ef01a" }} />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50vw",
            justifyContent: "center",
            alignItems: "center",
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
