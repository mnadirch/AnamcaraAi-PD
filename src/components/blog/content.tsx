import React, { useState } from "react";
import Modal from "./blogDetailModal";
import Image1 from "../../assets/images/backgrounds/pexels-cookiecutter-1148820.png";
import backgroundImage2 from "../../assets/images/backgrounds/pexels-pixabay-40185 1.png";
import backgroundImage3 from "../../assets/images/backgrounds/markus-spiske-AaEQmoufHLk-unsplash.png";
import backgroundImage4 from "../../assets/images/backgrounds/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.png";
import backgroundImage5 from "../../assets/images/backgrounds/ales-nesetril-Im7lZjxeLhg-unsplash.png";
import backgroundImage6 from "../../assets/images/backgrounds/markus-spiske-iar-afB0QQw-unsplash.png";
import backgroundImage7 from "../../assets/images/backgrounds/donald-giannatti-Wj1D-qiOseE-unsplash.png";
import SocialLoginModal from "./socialLoginModel";


import { FaThumbsUp, FaBell, FaComment, FaShare, FaBookmark } from "react-icons/fa";

interface ContentProps {
  activeCard: number;
}

const Content: React.FC<ContentProps> = ({ activeCard }) => {
  // Internal content array (same order and data as before)
  const contentArray = [
    {
      id: 0,
      heading: "GPT-5 with Advanced Reasoning",
      content:
        "OpenAI launches GPT-5 with major enhancements in logical reasoning. This new model showcases significant improvements in problem-solving, contextual understanding, and adaptability in various industries, including law, healthcare, and finance.",
      imageSrc: Image1,
    },
    {
      id: 1,
      heading: "Google's AI Assistant Breakthrough",
      content:
        "Google's AI can now process text, voice, and visuals together. This multimodal capability enables seamless user interactions, enhancing applications in customer service, education, and virtual assistants.",
      imageSrc: backgroundImage2,
    },
    {
      id: 2,
      heading: "IBM's Quantum Computing Leap",
      content:
        "IBM makes strides in error correction for quantum computing. The latest developments push quantum technology closer to commercial applications, reducing error rates and expanding the potential for complex computational tasks.",
      imageSrc: backgroundImage3,
    },
    {
      id: 3,
      heading: "Tesla's Full Self-Driving Cars by 2025",
      content:
        "Tesla pushes FSD vehicles to hit roads soon. The advancements in autonomous technology bring improved safety features, real-time traffic analysis, and better route optimization, revolutionizing the future of transportation.",
      imageSrc: backgroundImage4,
    },
    {
      id: 4,
      heading: "AI in Healthcare Revolution",
      content:
        "AI achieves 95% accuracy in disease prediction. This breakthrough allows doctors to diagnose diseases earlier, improving treatment outcomes and reducing healthcare costs. AI models analyze vast patient datasets for precise medical insights.",
      imageSrc: backgroundImage5,
    },
    {
      id: 5,
      heading: "Boston Dynamics Next-Gen Robots",
      content:
        "New robots with advanced dexterity hit the market. Boston Dynamics' latest robotics lineup introduces machines with enhanced mobility, flexibility, and AI-driven decision-making, improving automation in warehouses and factories.",
      imageSrc: backgroundImage6,
    },
    {
      id: 6,
      heading: "AI-Powered Cybersecurity Advances",
      content:
        "AI reduces cyberattack response times significantly. Advanced machine learning models detect and neutralize cyber threats in real-time, helping businesses and governments secure their data against evolving digital threats.",
      imageSrc: backgroundImage7, // reusing backgroundImage2
    },
  ];

  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [likes, setLikes] = useState(1200);
  const [liked, setLiked] = useState(false);

  const [notifications, setNotifications] = useState(250);
  const [hasNotified, setHasNotified] = useState(false);

  const [comments, setComments] = useState(80);
  const [hasCommented, setHasCommented] = useState(false);

  const [shares, setShares] = useState(45);
  const [hasShared, setHasShared] = useState(false);

  const [bookmarks, _setBookmarks] = useState(500);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    imageSrc: "",
    title: "",
    content: "",
  });

  const openModal = (data: typeof modalData) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  // Function to toggle state and update counts
  const toggleState = (
    stateSetter: React.Dispatch<React.SetStateAction<boolean>>,
    countSetter: React.Dispatch<React.SetStateAction<number>>,
    currentState: boolean,
    count: number
  ) => {
    stateSetter(!currentState);
    countSetter(currentState ? count - 1 : count + 1);
  };

  return (
    <div
      className="relative w-full py-4 h-full flex max-xl:items-center justify-center xl:items-start"
      style={{ fontFamily: '"Calibri", sans-serif' }}
    >
      {contentArray.map((content) => (
        <div
          key={content.id}
          className={`absolute transition-all duration-700 ease-in-out ${
            activeCard === content.id
              ? "right-0 opacity-100 visible z-10"
              : "right-[-100%] opacity-0 invisible z-0"
          }`}
          style={{ width: "100%" }}
        >
          <div className="flex max-xl:items-center xl:items-start w-full">
            <div className="p-4 max-lg:p-4 lg:p-6 rounded-lg flex flex-col justify-center max-w-3xl max-sm:mt-4">
              <h1 className="text-xl max-sm:text-xl md:text-3xl lg:text-4xl font-bold mb-2 max-sm:mb-1.5 md:mb-3 lg:mb-4 leading-tight">
                {content.heading}
              </h1>
              <p className="text-sm max-sm:text-xs lg:text-2xl mb-3 sm:mb-4 md:mb-4 lg:mb-5 leading-relaxed">
                {content.content}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  onClick={() =>
                    openModal({
                      imageSrc: content.imageSrc || Image1,
                      title: content.heading,
                      content: content.content,
                    })
                  }
                  className="relative px-6 py-2.5 max-sm:px-1 max-sm:py-2 text-base max-sm:text-xs font-bold text-black bg-[#ADFF00] rounded-md hover:bg-black hover:text-white transition-all duration-300 overflow-hidden"
                  style={{
                    fontFamily: "Mowaq, sans-serif",
                    boxShadow: "0px 0px 15px #3FA604",
                    width: "220px",
                  }}
                >
                  Read the Story
                  <div className="absolute inset-0 border-2 border-[#ADFF00] animate-border pointer-events-none"></div>
                </button>

                {/* Interactive Social Icons */}
                <div className="flex items-center space-x-4 sm:space-x-8 mt-3 sm:mt-0 text-white">
                  {/* Like Icon */}
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => toggleState(setLiked, setLikes, liked, likes)}
                  >
                    <FaThumbsUp
                      size={24}
                      className={`transition cursor-pointer ${liked ? "text-[#ADFF00]" : "text-white"
                        } hover:text-[#ADFF00]`} />
                    <span className="text-sm sm:text-base mt-1">{likes}</span>
                  </div>
                  {/* Notification Icon */}
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() =>
                      !hasNotified &&
                      (setNotifications(notifications + 1), setHasNotified(true))
                    }
                  >
                    <FaBell size={24} className={`transition cursor-pointer ${hasNotified ? "text-[#ADFF00]" : "text-white"
                      } hover:text-[#ADFF00]`} />
                    <span className="text-sm sm:text-base mt-1">{notifications}</span>
                  </div>
                  {/* Comment Icon */}
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() =>
                      !hasCommented &&
                      (setComments(comments + 1), setHasCommented(true))
                    }
                  >
                    <FaComment size={24} className={`transition cursor-pointer ${hasCommented ? "text-[#ADFF00]" : "text-white"
                      } hover:text-[#ADFF00]`} />
                    <span className="text-sm sm:text-base mt-1">{comments}</span>
                  </div>
                  {/* Share Icon */}
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() =>
                      !hasShared && (setShares(shares + 1), setHasShared(true))
                    }
                  >
                    <FaShare size={24} className={`transition cursor-pointer ${hasShared ? "text-[#ADFF00]" : "text-white"
                      } hover:text-[#ADFF00]`} />
                    <span className="text-sm sm:text-base mt-1">{shares}</span>
                  </div>

                  {/* Bookmark Icon */}
                  <div
                    className="flex flex-col items-center cursor-pointer"

                  >
                    <FaBookmark
                      size={24}
                      // className={`transition ${bookmarked ? "text-white" : "text-[#ADFF00] hover:text-white"}`}
                      onClick={() => setIsSocialModalOpen(true)}
                    />

                    <SocialLoginModal isOpen={isSocialModalOpen} onClose={() => setIsSocialModalOpen(false)} />

                    <span className="text-sm sm:text-base mt-1">{bookmarks}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        Image1={modalData.imageSrc}
        title={modalData.title}
        content={modalData.content}
      />
    </div>
  );
};

export default Content;
