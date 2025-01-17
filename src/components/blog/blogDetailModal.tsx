import React from "react";
import author from "../../assets/icons/fa6-solid_user-pen.png";
import calender from "../../assets/icons/Vector (1).png";
import heart from "../../assets/icons/like.png";
import up from "../../assets/icons/Vector (2).png";
import down from "../../assets/icons/Vector (3).png";
import share from "../../assets/icons/Vector (4).png";
import bookmark from "../../assets/icons/Vector (5).png";
import comment from "../../assets/icons/Vector (6).png";
import view from "../../assets/icons/fa6-solid_user-pen.png";
import starryBg from "../../assets/images/main/stars.png";
import pic from "../../assets/images/headimages/Ellipse 90.png";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  Image1: string;
  title: string;
  details: string;
  content: string; // Add this missing property

}
const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
}));

const hoverRadius = 10;

const blogDetailModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  Image1,
  title,
  details,
  content, // Include this prop

}) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const modal = e.currentTarget;
    const rect = modal.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
  
    stars.forEach((star, i) => {
      const distance = Math.sqrt(
        Math.pow(star.x - mouseX, 2) + Math.pow(star.y - mouseY, 2)
      );
      const starElement = document.getElementById(`modal-star-${i}`);
      if (starElement) {
        starElement.style.backgroundColor =
          distance <= hoverRadius ? "white" : "#00000000";
      }
    });
  };
  
  const handleMouseLeave = () => {
    stars.forEach((_, i) => {
      const starElement = document.getElementById(`modal-star-${i}`);
      if (starElement) {
        starElement.style.backgroundColor = "#00000000";
      }
    });
  };

  if (!isOpen) return null;

  const contentText = `
    Tech giants are running out of data used to train AI systems.
    To overcome the problem, some companies are exploring new methods powered by 'synthetic data',
    write Cade Metz & Tripp Mickle.
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className=" rounded-lg shadow-lg max-w-4xl w-full p-6 relative text-white overflow-hidden" 
      style={{
        backgroundImage: `url(${starryBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}  onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
        {/* Star Background */}
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star, index) => (
            <div
              key={index}
              id={`modal-star-${index}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                top: `${star.y}%`,
                left: `${star.x}%`,
                backgroundColor: "#00000000",
                transition: "background-color 0.2s ease",
              }}
            ></div>
          ))}
        </div>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-white hover:text-[#ADFF00] transition"
        >
          ✕
        </button>

        {/* Scrollable Container */}
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar px-4">
          {/* Image */}
          <img
            src={Image1}
            alt={title}
            className="rounded-md w-full max-h-96 object-cover mb-6"
          />

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>

          {/* Metadata and Icons */}
          <div className="flex items-center justify-between text-[#ADFF00] text-sm mb-6">
            {/* Left Metadata */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <img src={author} alt="Author Icon" className="w-4 h-4 mr-2" />
                <span>Author Name</span>
              </div>
              <div className="flex items-center">
                <img src={calender} alt="Calendar Icon" className="w-4 h-4 mr-2" />
                <span>12 April, 2024</span>
              </div>
              <div className="flex items-center">
                <img src={heart} alt="Like Icon" className="w-4 h-4 mr-2" />
                <span>200</span>
              </div>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-4">
              <button className="hover:text-white transition flex items-center">
                <img src={up} alt="Upvote Icon" className="w-4 h-4" />
              </button>
              <button className="hover:text-white transition flex items-center">
                <img src={down} alt="Downvote Icon" className="w-4 h-4" />
              </button>
              <button className="hover:text-white transition flex items-center">
                <img src={share} alt="Share Icon" className="w-4 h-4" />
              </button>
              <button className="hover:text-white transition flex items-center">
                <img src={bookmark} alt="Bookmark Icon" className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-lg leading-relaxed mb-6 space-y-4">
            <p>
              Tech giants are running out of data used to train AI systems. To
              overcome the problem, some companies are exploring new methods
              powered by <span className="italic">'synthetic data'</span>, write
              Cade Metz & Tripp Mickle.
            </p>
            <p>
              Tech giants are running out of data used to train AI systems. To
              overcome the problem, some companies are exploring new methods
              powered by <span className="italic">'synthetic data'</span>, write
              Cade Metz & Tripp Mickle.
            </p>
            <p>
              Tech giants are running out of data used to train AI systems. To
              overcome the problem, some companies are exploring new methods
              powered by <span className="italic">'synthetic data'</span>, write
              Cade Metz & Tripp Mickle.
            </p>
          </div>

          {/* Comments, Views, and Action Icons Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-[#ADFF00]">
              {/* Left Section: Comments and Views */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <img src={comment} alt="Comments Icon" className="w-4 h-4 mr-2" />
                  <span>0 comments</span>
                </div>
                <div className="flex items-center">
                  <img src={view} alt="Views Icon" className="w-4 h-4 mr-2" />
                  <span>1827 views</span>
                </div>
              </div>

              {/* Right Section: Action Icons */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <img src={heart} alt="Like Icon" className="w-4 h-4 mr-2" />
                  <span>200</span>
                </div>
                <button className="hover:text-white transition flex items-center">
                  <img src={up} alt="Upvote Icon" className="w-4 h-4" />
                </button>
                <button className="hover:text-white transition flex items-center">
                  <img src={down} alt="Downvote Icon" className="w-4 h-4" />
                </button>
                <button className="hover:text-white transition flex items-center">
                  <img src={share} alt="Share Icon" className="w-4 h-4" />
                </button>
                <button className="hover:text-white transition flex items-center">
                  <img src={bookmark} alt="Bookmark Icon" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Green Line */}
            <div className="border-t-2 border-[#ADFF00] mt-2"></div>
          </div>

          {/* Comment Input */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={pic}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <input
              type="text"
              placeholder="Comment your thoughts"
              className="flex-1 bg-transparent border border-[#ADFF00] rounded-md px-4 py-2 text-[#ADFF00] focus:outline-none"
            />
          </div>

          {/* Subscription Section */}
          <div className="text-center pt-6">
          <h3 className="text-lg font-bold text-[#ADFF00] mb-4 font-mowaq">
          Want more tech insights? Subscribe and stay updated!
            </h3>
            <div className="flex justify-center space-x-4">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border border-[#ADFF00] rounded-md px-4 py-2 text-[#ADFF00] focus:outline-none"
              />
              <button className="bg-[#ADFF00] text-black px-6 py-2 rounded-md font-bold hover:bg-white hover:text-black transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default blogDetailModal;
