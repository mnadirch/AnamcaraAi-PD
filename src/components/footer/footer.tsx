import { useState, FC } from "react";
import styles from "./footer.module.css";
import Ai_bottom from "../../assets/images/footerimages/AI_bottom.png";
import metaverse from "../../assets/images/footerimages/Metaverse_bottom.png";
import robotics from "../../assets/images/footerimages/Robot_bottom.jpeg";
import logo from "../../assets/images/navabarlogo/ANAMCARA AI LOGO ICON TRANSPARENT 2.png";
import {useNavigate } from "react-router-dom";
import aiTabAnimation from "../../assets/animation/footerlockanimations/aiTab.json";
import metaverseTabAnimation from "../../assets/animation/footerlockanimations/metaverseTab.json";
import roboticsTabAnimation from "../../assets/animation/footerlockanimations/roboticsTab.json";
import Lottie from "react-lottie";

const Footer: FC = () => {
  const [activeIndex, _setActiveIndex] = useState<number>(0);
  const navigate = useNavigate();
  const updateStatus = (index: number) => {
    if (index === 1) navigate("/main");
  };

  const images = [logo, Ai_bottom, metaverse, robotics];
  const defaultOptions = [
    {
      loop: true,
      autoplay: true,
      animationData: "",
    },
    {
      loop: true,
      autoplay: true,
      animationData: roboticsTabAnimation,
    },
    {
      loop: true,
      autoplay: true,
      animationData: aiTabAnimation,
    },
    {
      loop: true,
      autoplay: true,
      animationData: metaverseTabAnimation,
    },
  ];

  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        {["AI", "Metaverse", "Robotics", "Quantum"].map((title, index) => (
          <div
            key={index}
            onClick={() => updateStatus(index)}
            className={
              activeIndex === index ? styles.content2 : styles.content
            }
          >
            <div className={styles.textContainer}>
              <h1
                className={activeIndex === index ? styles.text : styles.text}
              >
                {title}
              </h1>
              <p
                className={`${styles.secondaryText} ${activeIndex === index
                    ? styles.secondaryText
                    : styles.secondaryText
                  }`}
              >
                {index === 0 && "Cognitive Evolution"}
                {index === 1 && "Immersive Realities"}
                {index === 2 && "Revolutionary Automation"}
                {index === 3 && "Infinite Possibilities"}
              </p>
            </div>

            <div className={styles.imageContainer}>
              <img
                src={images[index]}
                alt={`img${index}`}
                className={styles.img1}
              />

              <div className={styles.lottieanimation}>
                <Lottie
                  options={defaultOptions[index]}
                  height={40}
                  width={40}
                  isClickToPauseDisabled={true}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
