import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Content from "../../components/blog/content";
import Cards from "../../components/blog/cards";
import backgroundImage1 from "../../assets/images/backgrounds/pexels-cookiecutter-1148820.png";
import backgroundImage2 from "../../assets/images/backgrounds/pexels-pixabay-40185 1.png";

const Blog: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const cards = [
    {
      id: 0,
      title: "GPT-5 Unveiled",
      description:
        "OpenAI has launched its much-anticipated GPT-5 model, which features significant upgrades in logical reasoning and problem-solving.",
    },
    {
      id: 1,
      title: "AI Breakthrough",
      description:
        "Google has unveiled a new version of its AI assistant that can understand and respond to text, voice, and visual inputs simultaneously.",
    },
  ];

  const contents = [
    {
      id: 0,
      heading: "OpenAI Launches GPT-5 with Advanced Reasoning Capabilities",
      content:
        "OpenAI has launched its much-anticipated GPT-5 model, which features significant upgrades in logical reasoning and problem-solving. The new version is designed to handle complex tasks like legal document analysis.",
      imageSrc: backgroundImage1, // Added `imageSrc`
      details: "Author: OpenAI | Date: 12 April, 2024", // Added `details`
    },
    {
      id: 1,
      heading:
        "Google’s AI-Driven Assistant Achieves Milestone in Multimodal Understanding",
      content:
        "Google has unveiled a new version of its AI assistant that can understand and respond to text, voice, and visual inputs simultaneously. The breakthrough in multimodal AI technology is set to enhance user experiences.",
      imageSrc: backgroundImage2, // Added `imageSrc`
      details: "Author: Google AI | Date: 15 April, 2024", // Added `details`
    },
  ];

  const backgroundImages = [backgroundImage1, backgroundImage2];

  return (
    <div className="relative w-screen h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              activeCard === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              filter: "brightness(0.6)",
            }}
          ></div>
        ))}
      </div>
      {/* Navbar */}
      <Navbar />

      {/* Main Blog Layout */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen px-6 text-white gap-8 md:gap-30">
        {/* Cards Section */}
        <div className="w-full md:w-1/4 flex flex-col gap-4">
          <Cards
            cards={cards}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 h-auto p-6">
          <Content activeCard={activeCard} contents={contents} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
