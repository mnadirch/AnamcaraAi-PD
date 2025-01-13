import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "../../assets/images/navabarlogo/logo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const links = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Our Solutions", path: "/solutions" },
    { name: "Features", path: "/features" },
    { name: "Resources", path: "/resources" },
    { name: "Reach Out", path: "/reachout" },
  ];

  useEffect(() => {
    const currentIndex = links.findIndex(
      (link) => link.path === location.pathname
    );
    setActiveIndex(currentIndex);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handlenavigate = () => {
    navigate("/home");
  };
  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          handlenavigate();
        }}
        className={styles.logo}
      >
        <img src={logo} alt="Logo" className={styles.logoImage} />
      </div>
      <div onClick={toggleMenu} className={styles.sidebarIcon}>
        ☰
      </div>
      <div
        className={`${styles.links} ${
          isMenuOpen ? styles.show : styles.notshow
        }`}
      >
        {links.map((link, index) => (
          <a
            key={index}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(link.path);
              setIsMenuOpen(false);
            }}
            style={{
              fontWeight: activeIndex === index ? "bold" : "",
              textDecoration: activeIndex === index ? "underline" : "",
              color: "#d9ff0f",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            {link.name}
          </a>
        ))}
      </div>
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
          className={styles.animatedborderbutton}
          style={{ color: "#d9ff0f" }}
        >
          Get Connected
        </button>
      </div>
    </div>
  );
};

export default Navbar;
