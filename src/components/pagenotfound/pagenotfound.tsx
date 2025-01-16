import astronaut from "../../assets/images/backgrounds/astronaut.webp";
import styles from "./pagenotfound.module.css";
import { useNavigate } from "react-router-dom";
import earthPic from "../../assets/images/footerimages/earth2.png";
const PageNotfound = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("./home");
  };
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.content1}>
          <img className={styles.earth} src={earthPic} alt="" />
        </div>

        <div className={styles.content}>
          <h1 className={styles.text404}>404 </h1>
          <img className={styles.astronautPic} src={astronaut} alt="" />
          <p className={styles.text1}>
            <span>HERMES</span>
            <span>WE</span>
            <span>HAVE</span>
            <span>A</span>
            <span>PROBLEM</span>
          </p>{" "}
          <p className={styles.text2}>
            <span>WE</span>
            <span>ARE</span>
            <span>LOST</span>
          </p>
          <button
            onClick={() => navigateToHome()}
            className={styles.homebutton}
          >
            HOMEPAGE
          </button>
        </div>
      </div>
    </>
  );
};

export default PageNotfound;
