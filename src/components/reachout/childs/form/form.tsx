import { useState, useRef } from "react";
import styles from "./form.module.css";
import ReCAPTCHA from "react-google-recaptcha";

const ReachOutForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
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
      setErrorMessage("Email is required.");
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

    e.preventDefault();
    // Execute the reCAPTCHA challenge manually
    recaptchaRef.current?.execute();
  };

  // Callback for when reCAPTCHA completes
  const onReCAPTCHAChange = (token: string | null) => {
    console.log("ReCAPTCHA token:", token);
    // You can now send the token to your backend for verification
    // Optionally, reset the reCAPTCHA for future submissions
    recaptchaRef.current?.reset();
  };

  return (
    <>
      <form className={styles.formSection} style={{ fontFamily: "Calibri, Arial, sans-serif", fontWeight: 400 }}>
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
                      {errorMessage && <p className={styles.error} style={{ fontFamily: "Calibri, Arial, sans-serif", textAlign: "center" }}>{errorMessage} </p>}
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
                      {errorMessage && <p className={styles.error} style={{ fontFamily: "Calibri, Arial, sans-serif", textAlign: "center" }}>{errorMessage} </p>}

          </div>
        </div>

        <div>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
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
              {errorMessage && <p className={styles.error} style={{ fontFamily: "Calibri, Arial, sans-serif", textAlign: "center" }}>{errorMessage} </p>}

      </form>
      <div className={styles.checkcontent}>
        <label
          htmlFor="privacyPolicy"
          className="flex items-center gap-2 p-2 text-gray-400 whitespace-nowrap"
          style={{ fontFamily: "Calibri, Arial, sans-serif" }}
        >
          <input
            type="checkbox"
            id="privacyPolicy"
            name="privacy"
            checked={isChecked}
            onChange={handleCheckboxChange}
            required
            className="accent-white"
          />
          <span>
            I have read and accept the{" "}
            <span className="underline">Privacy Policy</span>.
          </span>
        </label>

        <div >
          <button onClick={handleSubmit}  className={styles.reachOutButton} style={{ fontFamily: "Calibri, Arial, sans-serif" }} >
            Reach Out
          </button>
        </div>
      </div>
      <div className="fixed bottom-16 right-0.5 -translate-x-1/2 z-[999999]">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LdWstkqAAAAAKexIR0vyC4KcXzhjhTYpdqohU7w"
          size="invisible"
          onChange={onReCAPTCHAChange}
        />
      </div>
    </>
  );
};

export default ReachOutForm;
