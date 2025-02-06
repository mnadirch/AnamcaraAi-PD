import React, { useState } from "react";

const reactionGifs = [
  "https://himalayasingh.github.io/mac-reactions/img/1.gif",
  "https://himalayasingh.github.io/mac-reactions/img/2.gif",
  "https://himalayasingh.github.io/mac-reactions/img/3.gif",
  "https://himalayasingh.github.io/mac-reactions/img/4.gif",
  "https://himalayasingh.github.io/mac-reactions/img/5.gif",
  "https://himalayasingh.github.io/mac-reactions/img/6.gif",
];

const Reactions: React.FC = () => {
  // Whether the reaction panel is expanded
  const [isActive, setIsActive] = useState(false);

  // Which GIF index is currently selected (0 to 5)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Toggle the reaction panel
  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };

  // When a user clicks one of the GIFs
  const handleReactionClick = (index: number) => {
    setSelectedIndex(index);
    setIsActive(false);
  };

  // The main button's background image (or a default if none selected)
  const mainBg = selectedIndex !== null ? reactionGifs[selectedIndex] : reactionGifs[0];

  return (
      <div className="relative inline-block">
      <div
        className={`
          relative 
          overflow-hidden 
          rounded-md 
          shadow-lg 
          transition-all 
          duration-300 
          ${isActive ? "w-[310px] h-[264px] mt-[-132px]" : "w-[100px] h-[100px] mt-[-50px]"} 
        `}
        style={{ marginTop: "calc(50vh - 50px)" }} // Centers it vertically
      >
        {/* The “main button” that shows the selected GIF */}
        <button
          onClick={toggleActive}
          className={`
            absolute inset-0 m-auto 
            rounded-full cursor-pointer 
            transition-all duration-300 
            ${isActive ? "opacity-0 scale-0" : "opacity-100 scale-100"}
          `}
          style={{
            backgroundImage: `url(${mainBg})`,
            backgroundSize: "cover",
          }}
        />

        {/* Reactions panel — only visible if `isActive` */}
        {isActive && (
          <div className="relative w-full h-full bg-white/50 backdrop-blur-sm">
            {/* Heading bar */}
            <div className="flex items-center bg-white/70 h-10 px-4 border-b border-gray-300">
              {/* “Traffic light” buttons */}
              <div className="flex items-center gap-2 mr-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-semibold">Select your reaction</span>
            </div>

            {/* Reaction GIFs */}
            <div className="grid grid-cols-3 gap-2 p-3">
              {reactionGifs.map((gif, index) => (
                <button
                  key={gif}
                  onClick={() => handleReactionClick(index)}
                  className="rounded-md overflow-hidden shadow cursor-pointer relative group"
                >
                  <img
                    src={gif}
                    alt={`Reaction ${index}`}
                    className="w-full h-full object-cover"
                  />
                  {/* On hover, show a subtle white overlay */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition"></div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reactions;
