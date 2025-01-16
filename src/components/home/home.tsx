import { useState } from "react";
import styles from "./home.module.css";
import AiImage from "../../assets/images/headimages/AI_head.png";
import metaVerse from "../../assets/images/headimages/Metaverse_head.png";
import robotics from "../../assets/images/headimages/Flip Image .png";
import AiAnimation from "../../assets/animation/human_head_animation.mp4";
import midjourney from "../../assets/images/headimages/midjourney.png";
import gpticon from "../../assets/images/headimages/chatgpt.jpg";
import elevenlabs from "../../assets/images/headimages/elevenlabs.png";
import assembly2 from "../../assets/images/headimages/assembly2.png";
import { useNavigate } from "react-router-dom";
import Particle from "./childs/particlesAnimation/particlesAnimation";
import FogAnimation from "./childs/fogAnimation/fogAnimation";
import SmokeAnimation from "../footer/childs/component/smokeComponent/smoke";

const Home = () => {
  const [animateHeadImage, setanimateHeadImage] = useState(false);
  const [reAnimateHeadImage, setreAnimateHeadImage] = useState(false);

  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log("animate", animateHeadImage);
  // }, [animateHeadImage]);
  // useEffect(() => {
  //   console.log("reanimate", reAnimateHeadImage);
  // }, [reAnimateHeadImage]);

  const navigateToCommingSoonPage = () => {
    navigate("/ai-robotics");
  };
  const handleImages = () => {
    setanimateHeadImage(!animateHeadImage);
  };
  const handleImagesAnimation = () => {
    setreAnimateHeadImage(!reAnimateHeadImage);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.fogLayer}>
          <FogAnimation />
        </div>

        <Particle />

        <SmokeAnimation />

        <div onMouseEnter={handleImages} className={styles.textSection}>
          <div className={styles.heading}>
            <h1>Smart Solutions, Meaningful Connections</h1>
          </div>
          <div className={styles.sometext}>
            <p>
              Feeling lonely? Connect with ANAMCARA AI Team and never feel alone
              again. Join our waiting list and be the first to experience your
              personal companion when we go live!
            </p>
          </div>
          <div className={styles.inputContent}>
            <input
              type="email"
              placeholder="Enter your email.."
              className={styles.styledinput}
            />

            <button className={styles.btnSubscribe}>Subscribe</button>
          </div>
          <div className={styles.iconsContent}>
            <img src={midjourney} style={{ height: "30px" }} />
            <img src={gpticon} style={{ height: "30px" }} />
            <img src={elevenlabs} style={{ height: "30px" }} />
            <img src={assembly2} style={{ height: "30px" }} />
          </div>
        </div>
        <div
          className={styles.modelSection}
          onMouseEnter={handleImages}
          onMouseLeave={handleImagesAnimation}
        >
          <video
            className={styles.aiAnimation}
            src={AiAnimation}
            autoPlay
            loop
            tabIndex={-1} // Removes an element from the natural tab order like on iphone default behaviour
            style={{ outline: "none" }}
            muted
            controls={false}
            playsInline
          />
          <img
            onClick={() => navigateToCommingSoonPage()}
            src={AiImage}
            alt="random1"
            className={`${styles.randomImage1} ${
              reAnimateHeadImage ? styles.endAnimation : ""
            }`}
            style={{
              translate: animateHeadImage ? "-20px " : "20px",

              transition: animateHeadImage ? "10s " : "",
            }}
          />
          <img
            onClick={() => navigateToCommingSoonPage()}
            src={metaVerse}
            alt="random2"
            className={`${styles.randomImage2} ${
              reAnimateHeadImage ? styles.endAnimation : ""
            }`}
            style={{
              translate: animateHeadImage ? "-20px -15px" : "none",
              transition: animateHeadImage ? "10s " : "",
            }}
          />
          <img
            onClick={() => navigateToCommingSoonPage()}
            src={robotics}
            alt="random3"
            className={`${styles.randomImage3} ${
              reAnimateHeadImage ? styles.endAnimation : ""
            }`}
            style={{
              translate: animateHeadImage ? "30px 20px" : "none",
              transition: animateHeadImage ? "10s " : "",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
