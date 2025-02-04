import React, { useState } from "react";
import Modal from "./blogDetailModal";
import Image1 from "../../assets/images/backgrounds/pexels-cookiecutter-1148820.png";
import { FaThumbsUp, FaBell, FaComment, FaShare, FaBookmark } from "react-icons/fa";

interface ContentProps {
  activeCard: number;
  contents: {
    id: number;
    heading: string;
    content: string;
    imageSrc: string;
  }[];
}

const Content: React.FC<ContentProps> = ({ activeCard, contents }) => {
  // State for each counter
  const [likes, setLikes] = useState(1200);
  const [liked, setLiked] = useState(false);

  const [notifications, setNotifications] = useState(250);
  const [hasNotified, setHasNotified] = useState(false);

  const [comments, setComments] = useState(80);
  const [hasCommented, setHasCommented] = useState(false);

  const [shares, setShares] = useState(45);
  const [hasShared, setHasShared] = useState(false);

  const [bookmarks, setBookmarks] = useState(500);
  const [bookmarked, setBookmarked] = useState(false);

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

  // Function to toggle state and count
  const toggleState = (stateSetter: React.Dispatch<React.SetStateAction<boolean>>, countSetter: React.Dispatch<React.SetStateAction<number>>, currentState: boolean, count: number) => {
    stateSetter(!currentState);
    countSetter(currentState ? count - 1 : count + 1);
  };
  return (
    <div
      className="relative w-full h-full px-6 py-4 min-h-[500px]"
      style={{ fontFamily: '"Calibri", sans-serif' }}
    >
      {contents.map((content) => (
        <div
          key={content.id}
          className={`absolute top-0 transition-all duration-700 ease-in-out ${activeCard === content.id
            ? "right-0 opacity-100 visible z-10"
            : "right-[-100%] opacity-0 invisible z-0"
            }`}
          style={{ position: "absolute", width: "100%" }}
        >
          <div className="p-10 rounded-lg flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {content.heading}
            </h1>
            <p className="text-lg mb-8 leading-relaxed">{content.content}</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  openModal({
                    imageSrc: content.imageSrc || Image1, // Use Image1 as a fallback
                    title: content.heading,
                    content: content.content,
                  })
                }
                className="px-6 py-3 text-lg font-bold text-black bg-[#ADFF00] rounded-md hover:bg-black hover:text-white border-2 border-[#BCFF9D] transition-all"
                style={{
                  fontFamily: 'Mowaq, sans-serif',
                  boxShadow: "0px 0px 15px #3FA604",
                  width: "220px",
                }}
              >
                Read the story
              </button>
              {/* Interactive Social Icons */}
              <div className="flex items-center space-x-8 mt-6 text-white">
                {/* Like Icon */}
                <div className="flex flex-col items-center cursor-pointer" onClick={() => toggleState(setLiked, setLikes, liked, likes)}>
                  <FaThumbsUp size={30} className={`transition ${liked ? "text-white" : "text-[#ADFF00] hover:text-white"}`} />
                  <span className="text-lg mt-1">{likes}</span>
                </div>

                {/* Notification Icon (Stays Green) */}
                <div className="flex flex-col items-center cursor-pointer" onClick={() => !hasNotified && (setNotifications(notifications + 1), setHasNotified(true))}>
                  <FaBell size={30} className="text-[#ADFF00]" />
                  <span className="text-lg mt-1">{notifications}</span>
                </div>

                {/* Comment Icon (Stays Green) */}
                <div className="flex flex-col items-center cursor-pointer" onClick={() => !hasCommented && (setComments(comments + 1), setHasCommented(true))}>
                  <FaComment size={30} className="text-[#ADFF00]" />
                  <span className="text-lg mt-1">{comments}</span>
                </div>

                {/* Share Icon (Stays Green) */}
                <div className="flex flex-col items-center cursor-pointer" onClick={() => !hasShared && (setShares(shares + 1), setHasShared(true))}>
                  <FaShare size={30} className="text-[#ADFF00]" />
                  <span className="text-lg mt-1">{shares}</span>
                </div>

                {/* Bookmark Icon */}
                <div className="flex flex-col items-center cursor-pointer" onClick={() => toggleState(setBookmarked, setBookmarks, bookmarked, bookmarks)}>
                  <FaBookmark size={30} className={`transition ${bookmarked ? "text-white" : "text-[#ADFF00] hover:text-white"}`} />
                  <span className="text-lg mt-1">{bookmarks}</span>
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
