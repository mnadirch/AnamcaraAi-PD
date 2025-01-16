import styles from "./startup.module.css";

import { useNavigate } from "react-router-dom";
import Model from "../model/earth";
const StartUpPage = () => {
  const navigate = useNavigate();
  const EnterClickHandler = () => {
    navigate("./home");
  };
  return (
    <div className={styles.container}>
      <Model />
      <div className={styles.animatedborderbutton2}>
        <div className={styles.bubble1}></div>
        <div className={styles.bubble2}></div>
        <div className={styles.bubble3}></div>
        <div className={styles.bubble4}></div>
        <div className={styles.bubble5}></div>
        <div className={styles.bubble6}></div>
        <div className={styles.bubble7}></div>
        <div className={styles.bubble8}></div>
        <div className={styles.bubble9}></div>
        <div className={styles.bubble10}></div>
        <div className={styles.bubble11}></div>
        <div className={styles.bubble12}></div>
        <div className={styles.bubble13}></div>
        <button
          onClick={() => EnterClickHandler()}
          className={styles.animatedborderbutton}
        >
          Click To Enter
        </button>
      </div>
    </div>
  );
};

export default StartUpPage;
