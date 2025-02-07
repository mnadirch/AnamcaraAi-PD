import React, { useState, useRef } from "react";
import author from "../../assets/icons/fa6-solid_user-pen.png";
import calender from "../../assets/icons/Vector (1).png";
import heart from "../../assets/icons/like.png";
import up from "../../assets/icons/Vector (2).png";
import down from "../../assets/icons/Vector (3).png";
import share from "../../assets/icons/Vector (4).png";
import bookmark from "../../assets/icons/Vector (5).png";
import commentsIcon from "../../assets/icons/Vector (6).png";
import view from "../../assets/icons/circum_read.png";
import pic from "../../assets/images/headimages/Ellipse 90.png";
import insta from "../../assets/icons/Group (1).png";
import fb from "../../assets/icons/Group.png";
import linkedin from "../../assets/icons/hugeicons_linkedin-01.png";
import filledheart from "../../assets/icons/Vector (11).png";
import filleddown from "../../assets/icons/Vector (9).png";
import filledup from "../../assets/icons/Vector (8).png";
import filledshare from "../../assets/icons/Vector (12).png";
import filledbookmark from "../../assets/icons/Vector (10).png";
import data from "../../assets/data/blog.json";
import SideBar from "./sideBar";
import Reactions from "./reactions";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  Image1: string;
  title: string;
  content: string;
}

const BlogDetailModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  Image1,
  title,
}) => {
  if (!isOpen) return null;

  // Voting / Social states
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(200);

  // Commenting states
  const [showButton, setShowButton] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [notification, setNotification] = useState("");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<string[]>([]);

  // Icon Click Handler
  const handleIconClick = (type: string) => {
    if (type === "upvote") {
      setIsUpvoted(!isUpvoted);
      setIsDownvoted(false);
    }
    if (type === "downvote") {
      setIsDownvoted(!isDownvoted);
      setIsUpvoted(false);
    }
    if (type === "share") {
      setIsShared(!isShared);
    }
    if (type === "bookmark") {
      setIsBookmarked(!isBookmarked);
    }
  };

  // Like Button Handler
  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  // Show/hide "Post Comment" button
  const handleInputFocus = () => {
    setShowButton(true);
  };
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value.trim()) {
      setShowButton(false);
    }
  };

  // **Post Comment** — now using the actual user input
  const handlePostComment = () => {
    if (comment.trim()) {
      // Show notification
      setNotification("Comment Uploaded");
      setIsHighlighted(true);

      // Push the user's typed comment into the list
      setCommentList((prev) => [...prev, comment]);

      // Clear input & hide button
      setComment("");
      setShowButton(false);

      // Remove highlight & notification after 3s
      setTimeout(() => {
        setNotification("");
        setIsHighlighted(false);
      }, 3000);
    }
  };

  // Optional: ref to the scrollable container, so we can scroll it to top
  const scrollableRef = useRef<HTMLDivElement>(null);

  // Example function to scroll the modal content to top
  const scrollToTop = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div
        className="rounded-lg shadow-lg max-w-4xl w-full p-6 relative text-white overflow-hidden"
        style={{
          // backgroundImage: `url(${starryBg})`,
          backgroundColor: "black",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-white hover:text-[#ADFF00] transition"
        >
          ✕
        </button>

        {/* Scrollable Container */}
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar px-4 pl-16" ref={scrollableRef}>
          {/* Image */}
          <img
            src={Image1}
            alt={title}
            className="rounded-md w-full max-h-96 object-cover mb-6"
          />

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>

          {/* Metadata and Icons */}
          <div className="flex items-center justify-between text-white text-sm mb-6">
            {/* Left Metadata */}
            <div
              className="flex items-center space-x-6"
              style={{ fontFamily: "Mowaq, sans-serif" }}
            >
              <div className="flex items-center">
                <img src={author} alt="Author Icon" className="w-4 h-4 mr-2" />
                <span>Author Name</span>
              </div>
              <div className="flex items-center">
                <img
                  src={calender}
                  alt="Calendar Icon"
                  className="w-4 h-4 mr-2"
                />
                <span>12 April 2024</span>
              </div>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-4 ml-6">
              <button
                className="hover:text-white transition flex items-center"
                onClick={() => handleIconClick("upvote")}
              >
                <img
                  src={isUpvoted ? filledup : up}
                  alt="Upvote Icon"
                  className="w-4 h-4"
                />
              </button>
              <button
                className="hover:text-white transition flex items-center"
                onClick={() => handleIconClick("downvote")}
              >
                <img
                  src={isDownvoted ? filleddown : down}
                  alt="Downvote Icon"
                  className="w-4 h-4"
                />
              </button>
              <button
                className="hover:text-white transition flex items-center"
                onClick={() => handleIconClick("share")}
              >
                <img
                  src={isShared ? filledshare : share}
                  alt="Share Icon"
                  className="w-4 h-4"
                />
              </button>

              {/* Social Media Icons Sliding In */}
              {isShared && (
                <div className="flex items-center space-x-4 transition-transform duration-300">
                  <img src={fb} alt="Facebook Icon" className="w-5 h-5" />
                  <img src={insta} alt="Instagram Icon" className="w-5 h-5" />
                  <img src={linkedin} alt="LinkedIn Icon" className="w-5 h-5" />
                </div>
              )}

              {/* Bookmark Icon */}
              <button
                className="hover:text-white transition flex items-center"
                onClick={() => handleIconClick("bookmark")}
              >
                <img
                  src={isBookmarked ? filledbookmark : bookmark}
                  alt="Bookmark Icon"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div
            className="text-lg leading-relaxed mb-6 space-y-4"
            style={{ fontFamily: "Calibri, Arial, sans-serif", fontWeight: 400 }}
          >
            {data.content.map((paragraph: string, index: number) => (
              <p key={index}>
                {paragraph.split("'synthetic data'").map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="italic">'synthetic data'</span>
                    )}
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>

          {/* Comments, Views, and Action Icons Section */}
          <div className="mb-4" style={{ fontFamily: "Mowaq, sans-serif" }}>
            <div className="flex items-center justify-between text-sm text-white">
              {/* Left Section: Comments and Views */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <img
                    src={commentsIcon}
                    alt="Comments Icon"
                    className="w-4 h-4 mr-2"
                  />
                  <span>{commentList.length} comments</span>
                </div>
                <div className="flex items-center">
                  <img src={view} alt="Views Icon" className="w-4 h-4 mr-2" />
                  <span>1827 views</span>
                </div>
              </div>

              {/* Right Section: Action Icons */}
              <div className="flex items-center space-x-4">
                {/* Like Button */}
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleLikeClick}
                >
                  <img
                    src={isLiked ? filledheart : heart}
                    alt="Like Icon"
                    className="w-4 h-4 mr-2"
                  />
                  <span>{likeCount}</span>
                </div>

                {/* Upvote Button */}
                <button
                  className="hover:text-white transition flex items-center"
                  onClick={() => handleIconClick("upvote")}
                >
                  <img
                    src={isUpvoted ? filledup : up}
                    alt="Upvote Icon"
                    className="w-4 h-4"
                  />
                </button>

                {/* Downvote Button */}
                <button
                  className="hover:text-white transition flex items-center"
                  onClick={() => handleIconClick("downvote")}
                >
                  <img
                    src={isDownvoted ? filleddown : down}
                    alt="Downvote Icon"
                    className="w-4 h-4"
                  />
                </button>

                {/* Share Button */}
                <button
                  className="hover:text-white transition flex items-center"
                  onClick={() => handleIconClick("share")}
                >
                  <img
                    src={isShared ? filledshare : share}
                    alt="Share Icon"
                    className="w-4 h-4"
                  />
                </button>

                {/* Social Media Icons (Slide In) */}
                {isShared && (
                  <div className="flex items-center space-x-4 transition-transform duration-300">
                    <img src={fb} alt="Facebook Icon" className="w-5 h-5" />
                    <img src={insta} alt="Instagram Icon" className="w-5 h-5" />
                    <img
                      src={linkedin}
                      alt="LinkedIn Icon"
                      className="w-5 h-5"
                    />
                  </div>
                )}

                {/* Bookmark Button */}
                <button
                  className="hover:text-white transition flex items-center"
                  onClick={() => handleIconClick("bookmark")}
                >
                  <img
                    src={isBookmarked ? filledbookmark : bookmark}
                    alt="Bookmark Icon"
                    className="w-4 h-4"
                  />
                </button>
              </div>
            </div>

            {/* Green Line */}
            <div className="border-t-2 border-[#ADFF00] mt-2"></div>
          </div>
          <div className="relative flex justify-center my-4">
            <Reactions />
          </div>
          {/* Comment Input */}
          <div
            className="flex flex-col space-y-4 mb-6"
            style={{ fontFamily: "Mowaq, sans-serif" }}
          >

            <div className="flex items-center space-x-4 w-full">
              <img
                src={pic}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <input
                type="text"
                placeholder="Comment your thoughts"
                className={`flex-1 bg-transparent border rounded-md px-4 py-2 text-[#ADFF00] placeholder-[#ADFF00] focus:outline-none ${isHighlighted
                  ? "border-[#BCFF9D] bg-[#ADFF00] text-black"
                  : "border-[#ADFF00]"
                  }`}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Post Comment Button */}
            {showButton && (
              <div className="w-full flex justify-end">
                <button
                  onClick={handlePostComment}
                  className="px-6 py-3 text-lg font-bold text-black bg-[#ADFF00] rounded-md hover:bg-black hover:text-white border-2 border-[#BCFF9D] transition-all"
                  style={{
                    fontFamily: "Mowaq, sans-serif",
                    boxShadow: "0px 0px 15px #3FA604",
                    width: "220px",
                  }}
                >
                  Post Comment
                </button>
              </div>
            )}

            {/* Notification */}
            {notification && (
              <div className="text-right text-white text-sm font-bold">
                {notification}
              </div>
            )}
          </div>

          {/* Display Posted Comments in Green Bubbles */}
          {commentList.length > 0 && (
            <div className="space-y-2 mb-6" style={{ fontFamily: "Mowaq, sans-serif" }}>
              {commentList.map((singleComment, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  {/* Avatar on the left */}
                  <img
                    src={pic}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />

                  {/* Bright-green bubble */}
                  <div
                    className="px-4 py-2 rounded-full text-black"
                    style={{
                      backgroundColor: "#ADFF00",
                    }}
                  >
                    {singleComment}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Subscription Section */}
          <div className="text-center pt-6" style={{ fontFamily: "Mowaq, sans-serif" }}>
            <h3 className="text-lg font-bold text-white mb-4 font-mowaq">
              Want more tech insights? Subscribe and stay updated!
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border border-[#ADFF00] rounded-md px-6 py-3 text-[#ADFF00] placeholder-[#ADFF00] w-full sm:w-2/3 focus:outline-none"
              />
              <button
                className="px-4 py-2 text-md font-bold text-black bg-[#ADFF00] rounded-md hover:bg-black hover:text-white border-2 border-[#BCFF9D] transition-all"
                style={{
                  fontFamily: "Mowaq, sans-serif",
                  boxShadow: "0px 0px 10px #3FA604",
                  width: "120px",
                }}
              >
                Subscribe
              </button>
            </div>
            <div className="pt-6"></div>
          </div>
        </div>
        {/* <RightSideIconsBar> with scrollToTop callback */}
        <SideBar onScrollToTop={scrollToTop} /></div>
    </div>


  );
};

export default BlogDetailModal;
