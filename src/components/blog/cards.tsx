import React, { useRef } from "react";

interface CardsProps {
    activeCard: number;
    setActiveCard: (id: number) => void;
}

const Cards: React.FC<CardsProps> = ({ activeCard, setActiveCard }) => {
    const cards = [
        { id: 0, title: "GPT-5 Unveiled", description: "OpenAI has launched GPT-5 with major improvements in logical reasoning and problem-solving. OpenAI has launched GPT-5 with major improvements in logical reasoning and problem-solving." },
        { id: 1, title: "AI Breakthrough", description: "Google's AI assistant can now understand and respond to text, voice, and images simultaneously." },
        { id: 2, title: "Quantum Computing Advances", description: "IBM achieves a major milestone in quantum computing, improving error correction and stability." },
        { id: 3, title: "Self-Driving Cars", description: "Tesla and Waymo introduce new fleets of fully autonomous vehicles for major cities." },
        { id: 4, title: "AI in Healthcare", description: "Researchers develop AI that predicts diseases with 95% accuracy from patient records." },
        { id: 5, title: "Robotics Revolution", description: "Boston Dynamics releases next-gen robots with human-like dexterity and adaptability." },
        { id: 6, title: "Cybersecurity AI", description: "AI-powered cybersecurity tools improve attack detection, reducing response time by 70%." },
    ];

    // Refs for drag & scroll functionality
    const cardsRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const scrollTop = useRef(0);

    const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
        isDragging.current = true;
        startY.current = "touches" in e ? e.touches[0].clientY : e.clientY;
        scrollTop.current = cardsRef.current?.scrollTop || 0;
        document.body.style.userSelect = "none"; // Prevent text selection during drag
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

    return (
        <div className="w-full md:w-2/4 flex flex-col items-center relative">
            {/* Scroll Up Button */}
            <button
                onClick={() => cardsRef.current?.scrollBy({ top: -200, behavior: "smooth" })}
                className="text-[#ADFF00] text-3xl absolute -top-10 z-10"
            >
                ▲
            </button>

            {/* Scrollable Cards Container */}
            <div
                ref={cardsRef}
                className="overflow-y-auto max-h-[50vh] flex flex-col space-y-4 scroll-smooth no-scrollbar mt-6 w-full md:w-3/4"
                onMouseDown={startDrag}
                onMouseMove={onDrag}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                onTouchStart={startDrag}
                onTouchMove={onDrag}
                onTouchEnd={stopDrag}
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
                className="text-[#ADFF00] text-3xl mt-4"
            >
                ▼
            </button>
        </div>
    );
};

export default Cards;
