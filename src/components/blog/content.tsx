import React, { useState } from "react";
import Modal from "./blogDetailModal";
import Image1 from "../../assets/images/backgrounds/pexels-cookiecutter-1148820.png";

interface ContentProps {
  activeCard: number;
  contents: {
    id: number;
    heading: string;
    content: string;
    imageSrc: string; 
    details: string; 
  }[];
}

const Content: React.FC<ContentProps> = ({ activeCard, contents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    imageSrc: "",
    title: "",
    details: "",
    content: "",
  });

  const openModal = (data: typeof modalData) => {
    setModalData(data);
    setIsModalOpen(true);
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
            <button
              onClick={() =>
                openModal({
                  imageSrc: content.imageSrc || Image1, // Use Image1 as a fallback
                  title: content.heading,
                  details: content.details,
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
          </div>
        </div>
      ))}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        Image1={modalData.imageSrc}
        title={modalData.title}
        details={modalData.details}
        content={modalData.content} 
      />

    </div>
  );
};

export default Content;
