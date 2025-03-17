import React, { useRef, useEffect, useState } from "react";

interface CardsProps {
    activeCard: number;
    setActiveCard: (id: number) => void;
}

const Cards: React.FC<CardsProps> = ({ activeCard, setActiveCard }) => {
    const cards = [
        { id: 0, title: "GPT-5 Unveiled", description: "OpenAI has launched GPT-5 with major improvements in logical reasoning and problem-solving." },
        { id: 1, title: "AI Breakthrough", description: "Google's AI assistant can now understand and respond to text, voice, and images simultaneously." },
        { id: 2, title: "Quantum Computing Advances", description: "IBM achieves a major milestone in quantum computing, improving error correction and stability." },
        { id: 3, title: "Self-Driving Cars", description: "Tesla and Waymo introduce new fleets of fully autonomous vehicles for major cities." },
        { id: 4, title: "AI in Healthcare", description: "Researchers develop AI that predicts diseases with 95% accuracy from patient records." },
        { id: 5, title: "Robotics Revolution", description: "Boston Dynamics releases next-gen robots with human-like dexterity and adaptability." },
        { id: 6, title: "Cybersecurity AI", description: "AI-powered cybersecurity tools improve attack detection, reducing response time by 70%." },
    ];

    // Refs for drag & scroll functionality
    const cardsRef = useRef<HTMLDivElement>(null);
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragDistance, setDragDistance] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        setStartX(clientX);
        setDragDistance(0);
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const distance = clientX - startX;
        setDragDistance(distance);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        // Threshold for swipe (50px)
        const swipeThreshold = 50;

        if (Math.abs(dragDistance) > swipeThreshold) {
            const direction = dragDistance > 0 ? -1 : 1;
            const nextIndex = (activeCard + direction + cards.length) % cards.length;
            if (nextIndex >= 0 && nextIndex < cards.length) {
                setActiveCard(nextIndex);
            }
        }

        // Reset drag distance with animation
        setDragDistance(0);
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1280);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-full h-full flex flex-col relative">
            {isMobile ? (
                <div className="w-full h-full flex items-center relative mb-16 pb-12">
                    {/* Scrollable Cards (Horizontal Slider) */}
                    <div
                        ref={cardsRef}
                        className="flex overflow-x-auto space-x-6 w-full scroll-smooth no-scrollbar snap-x snap-mandatory px-8 py-4 touch-pan-x"
                        onMouseDown={handleDragStart}
                        onMouseMove={handleDragMove}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={handleDragStart}
                        onTouchMove={handleDragMove}
                        onTouchEnd={handleDragEnd}
                        style={{
                            transform: `translateX(${dragDistance}px)`,
                            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                            cursor: isDragging ? 'grabbing' : 'grab'
                        }}
                    >
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className={`bg-[#505050] bg-opacity-70 min-h-[180px] text-white p-4 sm:p-6 rounded-xl shadow-lg cursor-pointer w-[80vw] sm:w-[500px] snap-center flex flex-col justify-between shrink-0 transition-all duration-300 ${
                                    activeCard === card.id ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                                }`}
                                style={{ 
                                    fontFamily: '"Calibri", sans-serif',
                                    touchAction: 'pan-x'
                                }}
                                onClick={() => !isDragging && setActiveCard(card.id)}
                            >
                                {/* Card content */}
                                <div className="h-[2px] w-full bg-gray-400 group-hover:bg-[#ADFF00] transition-all duration-300 mb-3 sm:mb-4"></div>
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                                    {card.title}
                                </h3>
                                <p className="text-sm sm:text-base md:text-lg mt-2">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {/* Vertical Layout */}
                    <div className="w-full flex flex-col items-center relative">
                        {/* Scroll Up Button */}
                        <button
                            onClick={() => cardsRef.current?.scrollBy({ behavior: "smooth" })}
                            className="text-[#ADFF00] text-xl absolute z-10 top-[-15px] hover:text-[#8CC800] transition-colors"
                        >
                            ▲
                        </button>

                        {/* Scrollable Cards Container */}
                        <div
                            ref={cardsRef}
                            className="overflow-y-auto max-h-[70vh] flex flex-col space-y-4 scroll-smooth no-scrollbar md:mt-7 max-lg:mt-15 w-full md:w-2/3"
                            onMouseDown={handleDragStart}
                            onMouseMove={handleDragMove}
                            onMouseUp={handleDragEnd}
                            onMouseLeave={handleDragEnd}
                            onTouchStart={handleDragStart}
                            onTouchMove={handleDragMove}
                            onTouchEnd={handleDragEnd}
                        >
                            {cards
                                .sort((a, b) => (a.id === activeCard ? -1 : b.id === activeCard ? 1 : 0))
                                .map((card) => (
                                    <div
                                        key={card.id}
                                        onClick={() => setActiveCard(card.id)}
                                        className="relative bg-[#505050] min-h-[200px] bg-opacity-65 text-white p-6 rounded-xl shadow-lg group overflow-hidden cursor-pointer transition-all duration-500 w-[75%] mx-auto font-400"
                                        style={{ fontFamily: '"Calibri", sans-serif' }}
                                    >
                                        {/* Top Line */}
                                        <div className="h-[2px] w-full bg-gray-400 group-hover:bg-[#ADFF00] transition-all duration-300 mb-4"></div>
                                        {/* Card Title */}
                                        <h3 className="text-lg font-bold transition-transform duration-700 group-hover:translate-y-[-5px]">
                                            {card.title}
                                        </h3>
                                        {/* Card Description */}
                                        <p className="text-sm mt-2 transition-transform duration-400 group-hover:translate-y-[-3px]">
                                            {card.description}
                                        </p>
                                    </div>
                                ))}
                        </div>

                        {/* Scroll Down Button */}
                        <button
                            onClick={() => cardsRef.current?.scrollBy({ top: 200, behavior: "smooth" })}
                            className="text-[#ADFF00] text-xl mt-2 hover:text-[#8CC800] transition-colors"
                        >
                            ▼
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cards;
