import React, { useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import Hero from "../../components/main/hero";
import Landing from "../../components/main/landing";
import Survey from "../../components/main/survey";
import robotFace from "../../assets/images/main/robot.png";
import dullLogo from "../../assets/images/main/dull.png";
import shineLogo from "../../assets/images/main/ANAMCARA AI LOGO ICON TRANSPARENT 1.png";
import starryBg from "../../assets/images/main/stars.png";
import useWindowSize from "./useWindowSIze";
import Audio from "../../components/main/audio";


type Phase = "hero" | "landing" | "survey";

const Main: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("hero");
  // 1) Use custom hook to detect screen width
  const { width } = useWindowSize();

  // Generate stars for the background
  const stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  // Hover radius for stars
  const hoverRadius = 10;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, areaId: string) => {
    const area = document.getElementById(areaId);
    if (area) {
      const rect = area.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

      stars.forEach((star, i) => {
        const distance = Math.sqrt(
          Math.pow(star.x - mouseX, 2) + Math.pow(star.y - mouseY, 2)
        );
        const starElement = document.getElementById(`${areaId}-star-${i}`);
        if (starElement) {
          starElement.style.backgroundColor =
            distance <= hoverRadius ? "white" : "#00000000";
        }
      });
    }
  };

  const handleMouseLeave = (areaId: string) => {
    stars.forEach((_, i) => {
      const starElement = document.getElementById(`${areaId}-star-${i}`);
      if (starElement) {
        starElement.style.backgroundColor = "#00000000";
      }
    });
  };

  const handlePhaseChange = (newPhase: Phase) => {
    setPhase(newPhase);
  };

  // Helper to render stars in a given area
  const renderStarsLayer = (areaId: string) => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star, index) => (
        <div
          key={index}
          id={`${areaId}-star-${index}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            backgroundColor: "#00000000",
            transition: "background-color 0.3s ease",
          }}
        ></div>
      ))}
    </div>
  );

  return (
    <div
      className="
        min-h-screen w-full
        relative
        bg-cover bg-center
        flex
        flex-col
        md:flex-row
      "
      style={{
        backgroundImage: `url(${starryBg})`,
      }}
    >
      {/* Robot Section */}
      {width < 768 ? (
        // MOBILE RENDERING (no motion)
        <div
          id="robot-area"
          className="relative w-full h-screen flex justify-center items-center z-10"
          onMouseMove={(e) => handleMouseMove(e, "robot-area")}
          onMouseLeave={() => handleMouseLeave("robot-area")}
        >
          {renderStarsLayer("robot-area")}
          {/* Position Audio absolutely so it’s not in the normal flex order */}
            <Audio />

          {/* Robot + Logos */}
          <div className="relative w-full max-w-[600px] aspect-square top-1/2 left-1/2 transform -translate-x-[45%] -translate-y-1/2">
            {/* Robot Image */}
            <img
              src={robotFace}
              alt="Robot"
              className="h-full object-contain w-auto"
              style={{ width: "530px" }}
            />

            {/* Shine Logo */}
            <img
              src={shineLogo}
              alt="Shine Logo"
              className="absolute animate-blink-shine"
              style={{
                top: "25%",
                left: "45%",
                transform: "translate(-50%, -50%)",
                width: "450px",
                pointerEvents: "none",
              }}
            />

            {/* Dull Logo – Anchored at the same position */}
            <img
              src={dullLogo}
              alt="Dull Logo"
              className="absolute animate-blink-dull"
              style={{
                top: "25%",
                left: "45%",
                transform: "translate(-50%, -50%)",
                width: "65px",
                height: "65px",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      ) : (
        // DESKTOP RENDERING (with motion)
        <motion.div
          id="robot-area"
          className={`
          relative w-full h-[50vh]
          md:absolute md:top-0 md:left-0 md:w-1/2 md:h-full
          flex justify-center items-center
          overflow-hidden z-10
        `}
          initial={{ x: "50%" }}
          animate={{
            x:
              phase === "hero"
                ? "50%"
                : phase === "landing"
                  ? "-10%"
                  : "100%",
          }}
          transition={{ duration: 1 }}
          onMouseMove={(e) => handleMouseMove(e, "robot-area")}
          onMouseLeave={() => handleMouseLeave("robot-area")}
        >
          {renderStarsLayer("robot-area")}

          {/* Responsive Container with Aspect Ratio */}
          <div className="relative z-10 w-full max-w-[950px] aspect-square">
            {/* Robot Image */}
            <img
              src={robotFace}
              alt="Robot"
              className="absolute inset-0 w-full h-full object-contain"
            />

            {/* Shine Logo – Fixed Size */}
            <img
              src={shineLogo}
              alt="Shine Logo"
              className="absolute animate-blink-shine"
              style={{
                top: "25%",         // 25% from the top of the container
                left: "50%",        // centered horizontally
                transform: "translate(-50%, -50%)",
                width: "450px",     // Fixed width remains 450px
                pointerEvents: "none",
              }}
            />

            {/* Dull Logo – Fixed Size */}
            <img
              src={dullLogo}
              alt="Dull Logo"
              className="absolute animate-blink-dull"
              style={{
                top: "25%",         // 25% from the top of the container
                left: "50%",        // centered horizontally
                transform: "translate(-50%, -50%)",
                width: "90px",      // Fixed width remains 90px
                pointerEvents: "none",
              }}
            />
          </div>
        </motion.div>
      )}

      {/* RIGHT SECTION (Hero, Landing, Survey) */}
      <div
        className="
          relative
          flex-1
          flex
          flex-col
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* Hero Section */}
        {phase === "hero" && (
          width < 768 ? (
            // Mobile rendering: no motion
            <div
              id="hero-area"
              className="relative w-full h-[75vh] flex items-center justify-center"
              onMouseMove={(e) => handleMouseMove(e, "hero-area")}
              onMouseLeave={() => handleMouseLeave("hero-area")}
              onClick={() => handlePhaseChange("landing")}
            >
              {renderStarsLayer("hero-area")}
              <Hero />
            </div>
          ) : (
            // Desktop rendering: with motion
            <motion.div
              id="hero-area"
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              onMouseMove={(e) => handleMouseMove(e, "hero-area")}
              onMouseLeave={() => handleMouseLeave("hero-area")}
              onClick={() => handlePhaseChange("landing")}
            >
              {renderStarsLayer("hero-area")}
              <Hero audio={<Audio />} />
            </motion.div>
          )
        )}

        {/* Landing Section */}
        {phase === "landing" && (
          <>
            {width < 768 ? (
              /* MOBILE / TABLET (under 768px): Absolute positioning */
              <motion.div
                id="landing-area"
                className="
          relative
          w-full
          h-[75vh]
          flex
          flex-col
          justify-center
          items-center
          text-white
          space-y-6
        "
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                onMouseMove={(e) => handleMouseMove(e, "landing-area")}
                onMouseLeave={() => handleMouseLeave("landing-area")}
              >
                {renderStarsLayer("landing-area")}
                <Landing
                  onProceed={() => handlePhaseChange("survey")}
                  onSkipToMain={() => handlePhaseChange("hero")}
                />
              </motion.div>

            ) : (
              /* DESKTOP (≥768px): Relative positioning, or whatever layout you need */
              <motion.div
                id="landing-area"
                className="
        absolute
        h-full
        w-1/2
        right-0
        flex
        flex-col
        justify-center
        items-center
        text-white
        space-y-6
      "
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                onMouseMove={(e) => handleMouseMove(e, "landing-area")}
                onMouseLeave={() => handleMouseLeave("landing-area")}
                style={{ right: "7%" }}
              >
                {renderStarsLayer("landing-area")}
                <Landing
                  onProceed={() => handlePhaseChange("survey")}
                  onSkipToMain={() => handlePhaseChange("hero")}
                />
              </motion.div>
            )}
          </>
        )}
        {/* Survey Section */}
        {phase === "survey" && (
          <>
            {width < 768 ? (
              <motion.div
                id="survey-area"
                className="
             relative
             w-full
            h-[75vh]
             flex
             flex-col
             items-center
             justify-center
             text-white
             space-y-6
           "
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                onMouseMove={(e) => handleMouseMove(e, "survey-area")}
                onMouseLeave={() => handleMouseLeave("survey-area")}
              >
                {renderStarsLayer("survey-area")}
                <Survey onSkipToMain={() => handlePhaseChange("hero")} />
              </motion.div>
            ) : (

              <motion.div
                id="survey-area"
                className="
                absolute
                w-1/2
                left-0
                h-full
                flex
                flex-col
                items-center
                justify-center
                text-white
                space-y-6
              "
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                onMouseMove={(e) => handleMouseMove(e, "survey-area")}
                onMouseLeave={() => handleMouseLeave("survey-area")}
              >
                {renderStarsLayer("survey-area")}
                <Survey onSkipToMain={() => handlePhaseChange("hero")} />
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
