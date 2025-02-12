import React, { useEffect, useState, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import data from "../../assets/data/questions.json";
import "./style.css";

interface Question {
  question: string;
  answers: string[];
}

interface SurveyProps {
  onSkipToMain: () => void;
}

const Survey: React.FC<SurveyProps> = ({ onSkipToMain }) => {
  const [tfQuestion, setTFQuestion] = useState<Question | null>(null);
  const [mcqQuestion, setMCQQuestion] = useState<Question | null>(null);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [selectedTF, setSelectedTF] = useState<string | null>(null);
  const [selectedMCQ, setSelectedMCQ] = useState<number | null>(null);
  const [selectedSave, setSelectedSave] = useState<string | null>(null);

  const navigate = useNavigate();

  // Generate stars for the background
  const stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  // Hover radius for stars
  const hoverRadius = 2;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const surveyArea = document.getElementById("survey-area");
    if (surveyArea) {
      const rect = surveyArea.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

      stars.forEach((star, i) => {
        const distance = Math.sqrt(
          Math.pow(star.x - mouseX, 2) + Math.pow(star.y - mouseY, 2)
        );
        const starElement = document.getElementById(`survey-star-${i}`);
        if (starElement) {
          if (distance <= hoverRadius) {
            starElement.style.backgroundColor = "white";
          } else {
            starElement.style.backgroundColor = "#00000000";
          }
        }
      });
    }
  };

  const handleMouseLeave = () => {
    stars.forEach((_, i) => {
      const starElement = document.getElementById(`survey-star-${i}`);
      if (starElement) {
        starElement.style.backgroundColor = "#00000000";
      }
    });
  };

  useEffect(() => {
    const randomTF = data.tf[Math.floor(Math.random() * data.tf.length)];
    const randomMCQ = data.mcq[Math.floor(Math.random() * data.mcq.length)];

    setTFQuestion(randomTF);
    setMCQQuestion(randomMCQ);
  }, []);

  const handleButtonClick = () => {
    navigate("/home"); // Navigate to the home page
  };

  return (
    <div id="survey-area" className="survey-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Stars Layer */}
      <div className="stars-layer">
        {stars.map((star, index) => (
          <div key={index} id={`survey-star-${index}`} className="star" style={{ top: `${star.y}%`, left: `${star.x}%` }}></div>
        ))}
      </div>

      {/* Survey Content */}
      <div className="survey-content space-y-12">
        {/* True/False Question */}
        {tfQuestion && (
          <div className="question-block space-y-6">
            <h1 className="text-white text-2xl sm:text-2xl lg:text-2xl font-bold text-left">{tfQuestion.question}</h1>
            <div className="button-group">
              {tfQuestion.answers.map((answer, idx) => (
                <button key={idx} onClick={() => setSelectedTF(answer)} className={`survey-button ${selectedTF === answer ? "selected" : ""}`}>
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MCQ Question */}
        {mcqQuestion && (
          <div className="flex flex-col space-y-6">
            <h1 className="text-white text-2xl sm:text-3xl lg:text-2xl font-bold text-left">
              {mcqQuestion.question}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mcqQuestion.answers.map((answer, idx) => {
                const optionLetter = String.fromCharCode(65 + idx);
                const isSelected = selectedMCQ === idx;
                const isHovered = hoveredOption === idx;
                const isActive = isSelected || isHovered; // If either hovered or selected, apply the active style

                return (
                  <div
                    key={idx}
                    className="flex items-center space-x-4 cursor-pointer group"
                    onClick={() => setSelectedMCQ(idx)} // Update selection on click
                    onMouseEnter={() => setHoveredOption(idx)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all
                ${isActive
                          ? "bg-[#ADFF00] text-black border-black"
                          : "bg-transparent text-[#ADFF00] border-[#BCFF9D]"
                        }`}
                    >
                      {optionLetter}
                    </div>
                    <p className="text-lg font-medium text-white">{answer}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Static Question */}
        <div className="question-block">
        <h1 className="text-white text-2xl sm:text-3xl lg:text-2xl font-bold text-left">Who would you rather save?</h1>
          <div className="button-group">
            {["Self", "Partner", "Friend", "Parent"].map((answer, idx) => (
              <button key={idx} onClick={() => setSelectedSave(answer)} className={`survey-button ${selectedSave === answer ? "selected" : ""}`}>
                {answer}
              </button>
            ))}
          </div>
        </div>

        {/* Final Button */}
        <div className="button-group">
          <button
            onClick={handleButtonClick} // Call the function on click
            className="px-4 sm:px-6 py-2 text-sm sm:text-lg font-bold text-black bg-[#ADFF00] rounded-lg hover:bg-black hover:text-white border-2 border-[#BCFF9D] transition-all"
            style={{
              boxShadow: "0px 0px 15px #3FA604",
            }}
          >            I HAVE OBLIGED
          </button>
          <Link
            onClick={onSkipToMain}
            className="text-white text-sm sm:text-lg font-medium cursor-pointer"
            to={""}
          >            SKIP TO MAIN PAGE →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Survey;
