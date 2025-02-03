import React, { useRef, useState } from "react";
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
  const cardsRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startY.current = "touches" in e ? e.touches[0].clientY : e.clientY;
    scrollTop.current = cardsRef.current?.scrollTop || 0;
    document.body.style.userSelect = "none"; // Prevent text selection
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !cardsRef.current) return;
    const currentY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const distance = startY.current - currentY;
    cardsRef.current.scrollTop = scrollTop.current + distance;
  };

  const stopDrag = () => {
    isDragging.current = false;
    document.body.style.userSelect = ""; // Re-enable text selection
  };

  const cards = [
    { id: 0, title: "GPT-5 Unveiled", description: "OpenAI has launched GPT-5 with major improvements in logical reasoning and problem-solving.OpenAI has launched GPT-5 with major improvements in logical reasoning and problem-solving." },
    { id: 1, title: "AI Breakthrough", description: "Google's AI assistant can now understand and respond to text, voice, and images simultaneously." },
    { id: 2, title: "Quantum Computing Advances", description: "IBM achieves a major milestone in quantum computing, improving error correction and stability." },
    { id: 3, title: "Self-Driving Cars", description: "Tesla and Waymo introduce new fleets of fully autonomous vehicles for major cities." },
    { id: 4, title: "AI in Healthcare", description: "Researchers develop AI that predicts diseases with 95% accuracy from patient records." },
    { id: 5, title: "Robotics Revolution", description: "Boston Dynamics releases next-gen robots with human-like dexterity and adaptability." },
    { id: 6, title: "Cybersecurity AI", description: "AI-powered cybersecurity tools improve attack detection, reducing response time by 70%." },
  ];

  const contents = [
    { 
        id: 0, 
        heading: "GPT-5 with Advanced Reasoning", 
        content: "OpenAI launches GPT-5 with major enhancements in logical reasoning. This new model showcases significant improvements in problem-solving, contextual understanding, and adaptability in various industries, including law, healthcare, and finance.", 
        imageSrc: backgroundImage1, 
        details: "Author: OpenAI | Date: 12 April, 2024" 
    },
    { 
        id: 1, 
        heading: "Google’s AI Assistant Breakthrough", 
        content: "Google's AI can now process text, voice, and visuals together. This multimodal capability enables seamless user interactions, enhancing applications in customer service, education, and virtual assistants.", 
        imageSrc: backgroundImage2, 
        details: "Author: Google AI | Date: 15 April, 2024" 
    },
    { 
        id: 2, 
        heading: "IBM's Quantum Computing Leap", 
        content: "IBM makes strides in error correction for quantum computing. The latest developments push quantum technology closer to commercial applications, reducing error rates and expanding the potential for complex computational tasks.", 
        imageSrc: backgroundImage3, 
        details: "Author: IBM Research | Date: 18 April, 2024" 
    },
    { 
        id: 3, 
        heading: "Tesla’s Full Self-Driving Cars by 2025", 
        content: "Tesla pushes FSD vehicles to hit roads soon. The advancements in autonomous technology bring improved safety features, real-time traffic analysis, and better route optimization, revolutionizing the future of transportation.", 
        imageSrc: backgroundImage4, 
        details: "Author: Tesla | Date: 20 April, 2024" 
    },
    { 
        id: 4, 
        heading: "AI in Healthcare Revolution", 
        content: "AI achieves 95% accuracy in disease prediction. This breakthrough allows doctors to diagnose diseases earlier, improving treatment outcomes and reducing healthcare costs. AI models analyze vast patient datasets for precise medical insights.", 
        imageSrc: backgroundImage5, 
        details: "Author: MedTech AI | Date: 22 April, 2024" 
    },
    { 
        id: 5, 
        heading: "Boston Dynamics Next-Gen Robots", 
        content: "New robots with advanced dexterity hit the market. Boston Dynamics' latest robotics lineup introduces machines with enhanced mobility, flexibility, and AI-driven decision-making, improving automation in warehouses and factories.", 
        imageSrc: backgroundImage6, 
        details: "Author: Boston Dynamics | Date: 25 April, 2024" 
    },
    { 
        id: 6, 
        heading: "AI-Powered Cybersecurity Advances", 
        content: "AI reduces cyberattack response times significantly. Advanced machine learning models detect and neutralize cyber threats in real-time, helping businesses and governments secure their data against evolving digital threats.", 
        imageSrc: backgroundImage1, 
        details: "Author: CyberSec AI | Date: 28 April, 2024" 
    },
];


  return (
    <div className="relative w-screen h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${contents[activeCard].imageSrc})`, filter: "brightness(0.6)" }}></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Blog Layout */}
      <div className="relative z-10 flex flex-row items-center justify-center min-h-screen px-6 text-white gap-8">

        {/* Cards Section (Scrollable behind Navbar) */}
        <div className="w-full md:w-1/4 flex flex-col items-center relative">
          {/* Scroll Up Button - Positioned Correctly */}
          <button
            onClick={() => cardsRef.current?.scrollBy({ top: -200, behavior: "smooth" })}
            className="text-white bg-black rounded-full p-2 absolute -top-6 z-10"
          >
            ▲
          </button>

          {/* Cards Section (Fixed Scrollable Area) */}
          <div
            ref={cardsRef}
            className="overflow-y-auto max-h-[60vh] flex flex-col space-y-4 scroll-smooth no-scrollbar mt-6"
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={startDrag}
            onTouchMove={onDrag}
            onTouchEnd={stopDrag}
          >
            <Cards cards={cards} activeCard={activeCard} setActiveCard={setActiveCard} />
          </div>

          {/* Scroll Down Button - Positioned Below Cards */}
          <button
            onClick={() => cardsRef.current?.scrollBy({ top: 200, behavior: "smooth" })}
            className="text-white bg-black rounded-full p-2 mt-2"
          >
            ▼
          </button>
        </div>


        {/* Content Section (Centered) */}
        <div className="w-full md:w-2/3 h-auto p-6 flex items-center justify-center">
          <Content activeCard={activeCard} contents={contents} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
