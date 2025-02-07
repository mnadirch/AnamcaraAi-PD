import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Content from "../../components/blog/content";
import Cards from "../../components/blog/cards";
import backgroundImage1 from "../../assets/images/backgrounds/pexels-cookiecutter-1148820.png";
import backgroundImage2 from "../../assets/images/backgrounds/pexels-pixabay-40185 1.png";
import backgroundImage3 from "../../assets/images/backgrounds/markus-spiske-AaEQmoufHLk-unsplash.jpg";
import backgroundImage4 from "../../assets/images/backgrounds/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg";
import backgroundImage5 from "../../assets/images/backgrounds/ales-nesetril-Im7lZjxeLhg-unsplash.jpg";
import backgroundImage6 from "../../assets/images/backgrounds/adi-goldstein-EUsVwEOsblE-unsplash.jpg";

const Blog: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(backgroundImage1);
  const [nextImage, setNextImage] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  // Array of content objects for the blog (used in Content component and for background images)
  const contents = [
    {
      id: 0,
      heading: "GPT-5 with Advanced Reasoning",
      content: "OpenAI launches GPT-5 with major enhancements in logical reasoning. This new model showcases significant improvements in problem-solving, contextual understanding, and adaptability in various industries, including law, healthcare, and finance.",
      imageSrc: backgroundImage1,
    },
    {
      id: 1,
      heading: "Google’s AI Assistant Breakthrough",
      content: "Google's AI can now process text, voice, and visuals together. This multimodal capability enables seamless user interactions, enhancing applications in customer service, education, and virtual assistants.",
      imageSrc: backgroundImage2,
    },
    {
      id: 2,
      heading: "IBM's Quantum Computing Leap",
      content: "IBM makes strides in error correction for quantum computing. The latest developments push quantum technology closer to commercial applications, reducing error rates and expanding the potential for complex computational tasks.",
      imageSrc: backgroundImage3,
    },
    {
      id: 3,
      heading: "Tesla’s Full Self-Driving Cars by 2025",
      content: "Tesla pushes FSD vehicles to hit roads soon. The advancements in autonomous technology bring improved safety features, real-time traffic analysis, and better route optimization, revolutionizing the future of transportation.",
      imageSrc: backgroundImage4,
    },
    {
      id: 4,
      heading: "AI in Healthcare Revolution",
      content: "AI achieves 95% accuracy in disease prediction. This breakthrough allows doctors to diagnose diseases earlier, improving treatment outcomes and reducing healthcare costs. AI models analyze vast patient datasets for precise medical insights.",
      imageSrc: backgroundImage5,
    },
    {
      id: 5,
      heading: "Boston Dynamics Next-Gen Robots",
      content: "New robots with advanced dexterity hit the market. Boston Dynamics' latest robotics lineup introduces machines with enhanced mobility, flexibility, and AI-driven decision-making, improving automation in warehouses and factories.",
      imageSrc: backgroundImage6,
    },
    {
      id: 6,
      heading: "AI-Powered Cybersecurity Advances",
      content: "AI reduces cyberattack response times significantly. Advanced machine learning models detect and neutralize cyber threats in real-time, helping businesses and governments secure their data against evolving digital threats.",
      imageSrc: backgroundImage2,
    },
  ];

  // Set up the next background image when the active card changes
  useEffect(() => {
    if (contents[activeCard]) {
      const newImage = contents[activeCard].imageSrc;
      if (newImage !== currentImage) {
        setNextImage(newImage);
      }
    }
  }, [activeCard, contents, currentImage]);

  // Trigger a fade-in transition for the background image change
  useEffect(() => {
    if (nextImage) {
      requestAnimationFrame(() => {
        setFadeIn(true);
      });
      const timer = setTimeout(() => {
        setCurrentImage(nextImage);
        setNextImage(null);
        setFadeIn(false);
      }, 1000); // Duration should match your CSS transition (1000ms)
      return () => clearTimeout(timer);
    }
  }, [nextImage]);

  return (
    <div className="relative w-screen h-screen flex flex-col">
      {/* Background Image(s) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${currentImage})`,
            filter: "brightness(0.6)",
            opacity: 1
          }}
        ></div>
        {nextImage && (
          <div
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundImage: `url(${nextImage})`,
              filter: "brightness(0.6)"
            }}
          ></div>
        )}
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="relative z-10 flex flex-row items-center justify-center min-h-screen px-6 text-white gap-8">
        {/* Cards component now handles all its internal logic */}
        <Cards activeCard={activeCard} setActiveCard={setActiveCard} />

        {/* Content Section */}
        <div className="w-full md:w-2/3 h-auto p-6 flex items-center justify-center">
          <Content activeCard={activeCard} contents={contents} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
