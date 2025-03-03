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
import { ToastContainer, toast } from 'react-toastify';



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


  // const showSuccessToast = () => {
  //   toast.success("Changes saved.", {
  //     position: "top-right",
  //     autoClose: 3000, 
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     style: {
  //       background: "green",
  //       color: "white",
  //       fontSize: "16px",
  //       fontWeight: "bold",
  //     },
  //     icon: "✅",
  //   });
  // };

  // Inside your component
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendEmailToServer(email); // Your email submission logic
      toast.success(
        <div className="flex items-center gap-2 font-mowaq">
          <CheckCircle className="h-5 w-5 text-green-400" />
          Successfully subscribed! Welcome aboard.
        </div>,
        {
          style: {
            background: '#000',
            boxShadow: '0px 0px 15px #ADFF00'
          }
        }
      );
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2 font-mowaq">
          <AlertCircle className="h-5 w-5 text-red-400" />
          There was an error. Please try again.
        </div>,
        {
          style: {
            background: '#000',
            boxShadow: '0px 0px 15px #FF0000'
          }
        }
      );
    } finally {
      setLoading(false);
      setEmail('');
    }
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
          <div className="absolute inset-0 border-2 border-[#ADFF00] animate-border pointer-events-none"></div>


          {/* Header Section */}
          <div className={styles.textSection} >
            <h1 className={styles.heading} style={{ fontFamily: "Mowaq, sans-serif", fontWeight: 400 }}>
              Beyond Human Connection,{' '}
              <span className="text-white heading">
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
                  {/* <button
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
                  </button> */}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`${styles.submitButton} animated-border`}
                    onClick={handleEmailSubmit}
                    style={{
                      fontFamily: "Mowaq, sans-serif",
                      boxShadow: "0px 0px 15px #ADFF00",
                    }}
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full border-2 border-white border-t-transparent h-5 w-5" />
                    ) : (
                      "Subscribe Now"
                    )}
                    <div className="border-effect"></div>
                  </button>

                </div>
              </div>
            </form>
            {/* {renderStatusMessage()} */}
          </div>


          {/* icons */}
          <div className="flex flex-row gap-4 md:gap-8 justify-center items-center w-full p-2 overflow-hidden">
            <img src={midjourney} className="w-12 h-12 max-sm:w-5 max-sm:h-5 md:w-10 md:h-10 object-contain flex-shrink-0" />
            <img src={gpticon} className="w-12 h-12 max-sm:w-5 max-sm:h-5 md:w-10 md:h-10 object-contain flex-shrink-0" />
            <img src={elevenlabs} className="w-12 h-12 max-sm:w-5 max-sm:h-5 md:w-10 md:h-10 object-contain flex-shrink-0" />
            <img src={assembly2} className="w-12 h-12 max-sm:w-5 max-sm:h-5 md:w-10 md:h-10 object-contain flex-shrink-0" />
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
