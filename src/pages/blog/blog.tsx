import React, { useState, useEffect } from "react";
import Content from "../../components/blog/content";
import Cards from "../../components/blog/cards";
import backgroundImage1 from "../../assets/images/backgrounds/pexels-cookiecutter-1148820.png";
import backgroundImage2 from "../../assets/images/backgrounds/pexels-pixabay-40185 1.png";
import backgroundImage3 from "../../assets/images/backgrounds/markus-spiske-AaEQmoufHLk-unsplash.png";
import backgroundImage4 from "../../assets/images/backgrounds/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.png";
import backgroundImage5 from "../../assets/images/backgrounds/ales-nesetril-Im7lZjxeLhg-unsplash.png";
import backgroundImage6 from "../../assets/images/backgrounds/markus-spiske-iar-afB0QQw-unsplash.png";
import backgroundImage7 from "../../assets/images/backgrounds/donald-giannatti-Wj1D-qiOseE-unsplash.png";


const Blog: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(backgroundImage1);
  const [nextImage, setNextImage] = useState<string | null>(null);
  const [fadeIn, setFadeIn] = useState<boolean>(false);

  // Update the background image based on the active card.
  useEffect(() => {
    let newImage = "";
    switch (activeCard) {
      case 0:
        newImage = backgroundImage1;
        break;
      case 1:
        newImage = backgroundImage2;
        break;
      case 2:
        newImage = backgroundImage3;
        break;
      case 3:
        newImage = backgroundImage4;
        break;
      case 4:
        newImage = backgroundImage5;
        break;
      case 5:
        newImage = backgroundImage6;
        break;
      case 6:
        newImage = backgroundImage7;
        break;
      default:
        newImage = backgroundImage1;
    }
    if (newImage !== currentImage) {
      setNextImage(newImage);
    }
  }, [activeCard, currentImage]);

  useEffect(() => {
    if (nextImage) {
      requestAnimationFrame(() => {
        setFadeIn(true);
      });
      const timer = setTimeout(() => {
        setCurrentImage(nextImage);
        setNextImage(null);
        setFadeIn(false);
      }, 1000); // Duration should match your CSS transition (1000ms)
      return () => clearTimeout(timer);
    }
  }, [nextImage]);

  return (
    <div className="relative w-screen min-h-screen flex flex-col">
      {/* Background Image(s) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentImage})`,
            filter: "brightness(0.6)",
            opacity: 1,
          }}
        ></div>
        {nextImage && (
          <div
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${fadeIn ? "opacity-100" : "opacity-0"
              }`}
            style={{
              backgroundImage: `url(${nextImage})`,
              filter: "brightness(0.6)",
            }}
          ></div>
        )}
      </div>

      {/* Main Layout */}
      <div className="flex flex-col-reverse max-xl:flex-col xl:flex-row min-h-screen pt-20">
        <div className="xl:w-1/2 w-full order-2 max-xl:order-2 xl:order-1 h-[40vh] max-xl:h-[35vh] xl:h-screen xl:pt-20 mb-8 max-xl:mb-10 xl:mb-0">
          <div className="h-full px-4 max-xl:px-8 xl:px-12">
            <Cards
              activeCard={activeCard}
              setActiveCard={setActiveCard}
            />
          </div>
        </div>
        <div className="xl:w-3/4 order-1 max-xl:order-1 xl:order-2 h-[60vh] max-xl:h-[65vh] xl:h-screen xl:pt-20 flex items-center">
          <div className="h-full w-full">
            <Content
              activeCard={activeCard}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Blog;
