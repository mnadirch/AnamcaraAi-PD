import React, { useRef, useState, useEffect } from "react";
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
  const [prevImage, setPrevImage] = useState<string>(backgroundImage1);
  const [currentImage, setCurrentImage] = useState<string>(backgroundImage1);
  const [nextImage, setNextImage] = useState<string | null>(null);
  const [transitionActive, setTransitionActive] = useState<boolean>(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);
  const [fadeIn, setFadeIn] = useState<boolean>(false);


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

// When activeCard changes, set up the next background image for transition
useEffect(() => {
  if (contents[activeCard]) {
    const newImage = contents[activeCard].imageSrc;
    if (newImage !== currentImage) {
      setNextImage(newImage);
    }
  }
}, [activeCard, contents, currentImage]);

// When a nextImage is set, trigger the fade-in and then update the current background
useEffect(() => {
  if (nextImage) {
    // Use requestAnimationFrame to ensure the overlay div is rendered with initial opacity
    requestAnimationFrame(() => {
      setFadeIn(true);
    });
    const timer = setTimeout(() => {
      setCurrentImage(nextImage);
      setNextImage(null);
      setFadeIn(false);
    }, 1000); // This duration should match the CSS transition duration (1000ms here)
    return () => clearTimeout(timer);
  }
}, [nextImage]);

  return (
    <div className="relative w-screen h-screen flex flex-col">
      {/* Background Image(s) */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Base background */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${currentImage})`,
            filter: "brightness(0.6)",
            opacity: 1
          }}
        ></div>
          {/* Overlay for new background image (if available) */}
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

      {/* Main Blog Layout */}
      <div className="relative z-10 flex flex-row items-center justify-center min-h-screen px-6 text-white gap-8">

        {/* Cards Section (Scrollable behind Navbar) */}
        <div className="w-full md:w-1/4 flex flex-col items-center relative">
          {/* Scroll Up Button */}
          <button
            onClick={() => cardsRef.current?.scrollBy({ top: -200, behavior: "smooth" })}
            className="text-[#ADFF00] text-3xl absolute -top-10 z-10"
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

          {/* Scroll Down Button */}
          <button
            onClick={() => cardsRef.current?.scrollBy({ top: 200, behavior: "smooth" })}
            className="text-[#ADFF00] text-3xl mt-4"
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
