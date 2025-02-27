import { useState, useRef } from "react";
import styles from "./form.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { FormEvent } from 'react';


interface formData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ReachOutForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    privacy: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors = { name: "", email: "", subject: "", message: "", privacy: "" };
    let hasError = false;

    if (!formData.name) {
      newErrors.name = "Name is required.";
      hasError = true;
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
      hasError = true;
    }
    if (!formData.subject) {
      newErrors.subject = "Subject is required.";
      hasError = true;
    }
    if (!formData.message) {
      newErrors.message = "Message is required.";
      hasError = true;
    }
    if (!isChecked) {
      newErrors.privacy = "You must accept the privacy policy to proceed.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Reset form and errors
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({ name: "", email: "", subject: "", message: "", privacy: "" });

    // Execute reCAPTCHA challenge manually
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
    <div className="max-w-4xl" style={{ fontFamily: "Calibri, Arial, sans-serif", fontWeight: 400 }}>

      {/* Form Container */}
      <div className="relative w-full max-w-xl mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="
      flex 
      flex-col 
      space-y-4 
      p-6 
      md:p-8 
      shadow-lg
    "
        >
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className=" 
        w-full 
        p-3 
        border 
        border-[#ADFF00] 
        focus:outline-none 
        text-white
        tracking-wide
        bg-transparent
        focus:bg-[#A9A9A9]/50
      "/>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="
        w-full 
        p-3 
        border 
        border-[#ADFF00] 
        focus:outline-none 
        text-white 
        tracking-wide
        bg-transparent
                focus:bg-[#A9A9A9]/50
      "/>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

          <label> Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="
        w-full 
        p-3 
        border 
        border-[#ADFF00] 
        focus:outline-none 
        text-white 
        tracking-wide
      bg-transparent
        focus:bg-[#A9A9A9]/50

      "
          />
          {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}

          <label>Message</label>
          <textarea
            name="message"
            // placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="
        w-full 
        p-3 
        border 
        border-[#ADFF00] 
        focus:outline-none 
        text-white 
        bg-transparent
        tracking-wide         
        focus:bg-[#A9A9A9]/50
      "/>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}



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
              <button onClick={handleSubmit} className={styles.reachOutButton} style={{ fontFamily: "Calibri, Arial, sans-serif" }} >
                Reach Out
              </button>
            </div>
          </div>
        </form>
      </div>


      <div className="fixed bottom-16 right-0.5 -translate-x-1/2 z-[999999]">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LdWstkqAAAAAKexIR0vyC4KcXzhjhTYpdqohU7w"
          size="invisible"
          onChange={onReCAPTCHAChange}
        />
      </div>
    </div >
  );
};

export default ReachOutForm;
