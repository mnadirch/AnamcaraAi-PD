import { useState } from "react";
import styles from "./home.module.css";
import AiImage from "../../assets/images/headimages/AI_head.png";
import metaVerse from "../../assets/images/headimages/Metaverse_head.png";
import robotics from "../../assets/images/headimages/Flip Image .png";
import AiAnimation from "../../assets/animation/HumanLikeRobot.mp4";
import midjourney from "../../assets/images/headimages/Vector.png";
import gpticon from "../../assets/images/headimages/chatgpt.jpg";
import elevenlabs from "../../assets/images/headimages/elevenlabs.png";
import assembly2 from "../../assets/images/headimages/assembly2.png";
import { useNavigate } from "react-router-dom";
import Particle from "./childs/particlesAnimation/particlesAnimation";
import FogAnimation from "./childs/fogAnimation/fogAnimation";
import SmokeAnimation from "../footer/childs/component/smokeComponent/smoke";
import { AlertCircle, CheckCircle } from 'lucide-react';


const Home = () => {
  const [animateHeadImage, setanimateHeadImage] = useState(false);
  const [reAnimateHeadImage, setreAnimateHeadImage] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<'success' | 'error' | ''>('');
  const [loading, setLoading] = useState<boolean>(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const renderStatusMessage = () => {
    const messages = {
      success: {
        Icon: CheckCircle,
        text: 'Successfully subscribed! Welcome aboard.',
        className: 'mt-4 flex items-center space-x-2 sm:mt-2 sm:space-x-1 md:space-x-1.5 lg:space-x-2 text-white text-xs sm:text-sm md:text-sm lg:text-sm',
      },
      error: {
        Icon: AlertCircle,
        text: 'There was an error. Please try again.',
        className: 'text-red-600',
      },
    };

    if (!status || !(status in messages)) return null;

    const { Icon, text, className } = messages[status as keyof typeof messages];

    return (
      <div className={`mt-4 flex items-center space-x-2 sm:mt-2 sm:space-x-1 md:space-x-1.5 lg:space-x-2 ${className}`}>
        <Icon className="h-5 w-5" />
        <span>{text}</span>
      </div>
    );
  };

  const handleMouseEnter = (image: string) => {
    setHoveredImage(image);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const navigate = useNavigate();

  const navigateToCommingSoonPage = () => {
    navigate("/ai-robotics");
  };
  const handleImages = () => {
    setanimateHeadImage(!animateHeadImage);
  };
  const handleImagesAnimation = () => {
    setreAnimateHeadImage(!reAnimateHeadImage);
  };


  return (
    <>
      <div className={styles.container}>
        <div className={styles.fogLayer}>
          <FogAnimation />
        </div>
        <Particle />
        <SmokeAnimation />

        <div className={styles.textArea} style={{ fontFamily: "Calibri, Arial, sans-serif", fontWeight: 400 }}>
          {/* Header Section */}
          <div className={styles.textSection} >
            <h1 className={styles.heading} style={{ fontFamily: "Mowaq, sans-serif", fontWeight: 400 }}>
              Beyond Human Connection,{' '}
              <span className="text-black heading">
                <br></br>
                Empowering Every Individual
              </span>
            </h1>

            <div className={styles.grid}>
              <div className={styles.para}>
                <h2 className={styles.h2}>
                  Transform Your Experience
                </h2>
                <p className={styles.p}>
                  ANAMCARA AI transforms everyday interactions into personalized experiences
                  that inspire and empower.
                </p>
              </div>

              <div className={styles.para}>
                <h2 className={styles.h2}>
                  Powered by Innovation
                </h2>
                <p className={styles.p}>
                  Our Quadfecta of empathetic technologies redefines human potential where
                  AI fosters deeper understanding.
                </p>
              </div>
            </div>
          </div>
          {/* Subscription Form */}
          <div className={styles.border}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <label htmlFor="email" className={styles.label}>
                  Join our waiting list
                </label>
                <div className={styles.server}>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className={styles.input1}
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.submitButton}
                    style={{
                      fontFamily: 'Mowaq, sans-serif',
                      boxShadow: "0px 0px 15px #ADFF00",
                    }}>
                    {loading ? (
                      <div className="animate-spin rounded-full border-2 border-white border-t-transparent h-5 w-5 sm:h-4 sm:w-4 md:h-3.5 md:w-3.5 lg:h-3 lg:w-3 xl:h-2.5 xl:w-2.5 2xl:h-2 2xl:w-2 border-2 sm:border-2 md:border-1.5 lg:border-1.5 xl:border-1  2xl:border-1" />
                    ) : (
                      'Subscribe Now'
                    )}
                  </button>
                </div>
              </div>
            </form>
            {renderStatusMessage()}
          </div>

          {/* icons */}
          <div className={styles.iconsContent}>
            <img src={midjourney} />
            <img src={gpticon} />
            <img src={elevenlabs} />
            <img src={assembly2} />
          </div>
        </div>



        <div
          className={styles.modelSection}
          onMouseEnter={handleImages}
          onMouseLeave={handleImagesAnimation}
        >
          <video
            className={styles.aiAnimation}
            src={AiAnimation}
            autoPlay
            loop
            tabIndex={-1} // Removes an element from the natural tab order like on iphone default behaviour
            style={{ outline: "none", }}
            muted
            controls={false}
            playsInline
          />
          <img
            onClick={() => navigateToCommingSoonPage()}
            src={AiImage}
            alt="random1"
            className={`${styles.randomImage1} ${hoveredImage === "ai" ? styles.stopFloat : ""}`}

            onMouseEnter={() => handleMouseEnter("ai")}
            onMouseLeave={handleMouseLeave}
          />
          <img
            onClick={() => navigateToCommingSoonPage()}
            src={metaVerse}
            alt="random2"
            className={`${styles.randomImage2} ${hoveredImage === "metaverse" ? styles.stopFloat : ""}`}
            onMouseEnter={() => handleMouseEnter("metaverse")}
            onMouseLeave={handleMouseLeave}
          />
          <img
            onClick={() => navigateToCommingSoonPage()}
            src={robotics}
            alt="random3"
            className={`${styles.randomImage3} ${hoveredImage === "robotics" ? styles.stopFloat : ""}`}
            onMouseEnter={() => handleMouseEnter("robotics")}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
