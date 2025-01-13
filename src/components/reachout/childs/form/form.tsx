import { useState } from "react";
import styles from "./form.module.css";

import ReCAPTCHA from "react-google-recaptcha";
const ReachOutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleSubmit = (e: any) => {
    console.log("click on reach out ");
    e.preventDefault();
    if (!formData.name) {
      setErrorMessage("Name is required.");
      return;
    }
    if (!formData.email) {
      setErrorMessage("email is required.");
      return;
    }
    if (!isChecked) {
      alert("You must accept the privacy policy to proceed.");
      return;
    }
    if (!isChecked) {
      alert("You must accept the privacy policy to proceed.");
      return;
    }
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };
  const handleCaptchaChange = () => {};
  return (
    <>
      <form className={styles.formSection}>
        <div className={styles.inlineFields}>
          <div>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            style={{ width: " 100% " }}
          />
        </div>

        <div>
          <label htmlFor="message">Your Message (Optional)</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            style={{ height: 120, width: "100%" }}
          ></textarea>
        </div>
      </form>
      <div className={styles.checkcontent}>
        <div className={styles.checkBox}>
          <input
            type="checkbox"
            id="privacyPolicy"
            name="privacy"
            checked={isChecked}
            onChange={handleCheckboxChange}
            required
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="privacypolicy">
            I have read and accept the{" "}
            <span className={styles.underline}>privacy policy</span>
          </label>
        </div>
        <div>
          <button onClick={handleSubmit} className={styles.reachOutButton}>
            Reach Out
          </button>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </div>
      </div>
      <div className={styles.captcha}>
        <ReCAPTCHA
          sitekey="6Ld9OXsqAAAAAMUubGh-_XNFCTunJNDFOYoz8vzL"
          onChange={() => handleCaptchaChange()}
        />
      </div>
    </>
  );
};

export default ReachOutForm;
