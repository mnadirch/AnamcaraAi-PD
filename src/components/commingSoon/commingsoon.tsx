import styles from "./commingsoon.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import hourGlass from "../../assets/animation/hourglass.json";
import Lottie from "react-lottie";
import BlobCursor from "./BlobCursor";
import SmokeAnimation from "../footer/childs/component/smokeComponent/smoke";

const CommingSoon = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: hourGlass,
  };
  return (
    <>
      <BlobCursor />
      <SmokeAnimation />
      <div className={styles.content}>
        <div className={styles.headingSection}>
          <span className={styles.text2}>Just</span>
          <span className={styles.text2}>Around</span>
          <span className={styles.text2}>The</span>
          <span className={styles.text2}>Corner</span>
        </div>
        <div className={styles.ringcontainer}>
          <Lottie options={defaultOptions} height={260} width={200} />
          <div className={styles.staticring1}></div>
          <div className={styles.staticring2}></div>
          <div className={styles.staticring3}></div>
          <div className={styles.staticring4animated}></div>
          <div className={styles.ring1}></div>
          <div className={styles.ring2}></div>
          <div className={styles.ring3}></div>
        </div>
        <div className={styles.commingsoonSection}>
          <div className={styles.text}>Comming Soon</div>
          <div className={styles.iconsContainer}>
            <LinkedInIcon />

            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
            <YouTubeIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommingSoon;
