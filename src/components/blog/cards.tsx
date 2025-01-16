import React from "react";

interface CardsProps {
    cards: { id: number; title: string; description: string }[];
    activeCard: number;
    setActiveCard: (id: number) => void;
}

const Cards: React.FC<CardsProps> = ({ cards, activeCard, setActiveCard }) => {
    return (
        <div
            className="flex flex-col gap-4 relative"
            style={{ fontFamily: '"Calibri", sans-serif' }}
        >
            {cards
                .sort((a, b) => (a.id === activeCard ? -1 : b.id === activeCard ? 1 : 0)) // Move selected card to the top
                .map((card) => (
                    <div
                        key={card.id}
                        onClick={() => setActiveCard(card.id)}
                        className={`relative bg-[#505050] bg-opacity-65 text-white p-6 rounded-xl shadow-lg group overflow-hidden cursor-pointer transition-all duration-500 w-[75%] mx-auto`}
                    >
                        {/* Top Line */}
                        <div
                            className={`h-[2px] w-full bg-gray-400 group-hover:bg-[#ADFF00] transition-all duration-300 mb-4`}
                        ></div>

                        {/* Content */}
                        <h3 className="text-lg font-bold transition-transform duration-700 group-hover:translate-y-[-5px]">
                            {card.title}
                        </h3>
                        <p className="text-sm mt-2 transition-transform duration-400 group-hover:translate-y-[-3px]">
                            {card.description}
                        </p>
                    </div>
                ))}
        </div>
    );
};

export default Cards;
