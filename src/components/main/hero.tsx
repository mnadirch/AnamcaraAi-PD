import React, { useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import starryBg from "../../assets/images/main/stars.png";

interface HeroProps {
  audio: React.ReactNode;  // Define the expected prop type
} 

const Hero: React.FC<HeroProps> = ({ audio }) => {
  const [welcomeText] = useState<string>("WELCOME");
  const [humanText] = useState<string>("HUMAN  ...");

  // Generate more stars for each container
  const stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * 100, // Random x position within container
    y: Math.random() * 100, // Random y position within container
  }));

  // Increased hover radius (in percentage of the container's dimensions)
  const hoverRadius = 10; // Larger hover effect

  // Handle hover logic
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
        const nearbyStar = document.getElementById(`${areaId}-star-${i}`);
        if (nearbyStar) {
          if (distance <= hoverRadius) {
            nearbyStar.style.backgroundColor = "white"; // Highlight star
          } else {
            nearbyStar.style.backgroundColor = "#00000000"; // Reset star
          }
        }
      });
    }
  };

  // Reset stars on mouse leave
  const handleMouseLeave = (areaId: string) => {
    stars.forEach((_, i) => {
      const starElement = document.getElementById(`${areaId}-star-${i}`);
      if (starElement) {
        starElement.style.backgroundColor = "#00000000"; // Reset to transparent
      }
    });
  };


  

  return (
    <div
      className="
        relative
        w-full
        h-screen
        overflow-hidden
        flex
        flex-col
        items-center
        justify-center
        /* We switch to the original absolute positioning only on md+ */
        md:block
      "
      style={{
        backgroundImage: `url(${starryBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Starry Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${starryBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* 
        WELCOME Text Block 
        - On small screens: Stacked (relative)
        - On md+ screens: Use the original absolute positioning
      */}
      <motion.div
        className="
          /* Mobile layout: fill half the screen height, relative positioning */
          relative w-full h-1/2 
          flex justify-center items-center 
          z-20

          /* Desktop layout: revert to your original absolute positioning */
          md:absolute 
          md:h-full
        "
        style={{
          left: "5%", // Only takes effect at md+ because of 'md:absolute'
          width: "30%", // Only takes effect at md+ 
        }}
        id="welcome-area"
        onMouseMove={(e) => handleMouseMove(e, "welcome-area")}
        onMouseLeave={() => handleMouseLeave("welcome-area")}
      >
        {/* Stars */}
        <div className="absolute inset-0 z-10 pointer-events-auto overflow-hidden">
          {stars.map((star, index) => (
            <motion.div
              key={`welcome-star-${index}`}
              className="absolute rounded-full"
              style={{
                top: `${star.y}%`,
                left: `${star.x}%`,
                width: "0.4rem",
                height: "0.4rem",
                backgroundColor: "#00000000",
                transition: "background-color 0.3s ease",
              }}
              id={`welcome-area-star-${index}`}
            />
          ))}
        </div>

        {/* WELCOME Text (same transitions as before) */}
        <motion.h1
          className="absolute font-bold tracking-wide text-[#ADFF00]"
          style={{
            fontSize: "clamp(3rem, 6vw, 5rem)",
            whiteSpace: "nowrap",
          }}
        >
          {welcomeText.split("").map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: (index) => ({
                  opacity: 1,
                  transition: { delay: index * 0.2 }, // same letter delay
                }),
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>

      {/* 
        HUMAN Text Block 
        - On small screens: Stacked (relative, below WELCOME)
        - On md+ screens: Use original absolute positioning on the right
      */}
    
      <motion.div
      className="
        relative w-full h-1/2 
        flex justify-center items-center 
        z-20
        md:absolute 
        md:h-full
      "
      style={{
        right: "5%", // Only applies at md+ due to 'md:absolute'
        width: "30%",
      }}
      id="human-area"
      onMouseMove={(e) => handleMouseMove(e, "human-area")}
      onMouseLeave={() => handleMouseLeave("human-area")}
    >
      

      {/* Stars */}
      <div className="absolute inset-0 z-10 pointer-events-auto overflow-hidden">
        {stars.map((star, index) => (
          <motion.div
            key={`human-star-${index}`}
            className="absolute rounded-full"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: "0.4rem",
              height: "0.4rem",
              backgroundColor: "#00000000",
              transition: "background-color 0.3s ease",
            }}
            id={`human-area-star-${index}`}
          />
        ))}
      </div>
      {audio}
      {/* HUMAN Text */}
      <motion.h1
        className="absolute font-bold tracking-wide text-[#ADFF00]"
        style={{
          fontSize: "clamp(3rem, 5vw, 7rem)",
          whiteSpace: "nowrap",
        }}
      >
        {humanText.split("").map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: (index) => ({
                opacity: 1,
                transition: { delay: 1.5 + index * 0.2 },
              }),
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>

    </div>
  );
};

export default Hero;
