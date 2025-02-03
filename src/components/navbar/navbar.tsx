import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/navabarlogo/ANAMCARA AI LOGO ICON TRANSPARENT 2.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState<boolean>(false);

  const links = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Our Solutions", path: "/solutions" },
    { name: "Features", path: "/features" },
    { name: "Resources", path: "/resources", hasDropdown: true },
    { name: "Reach Out", path: "/reachout" },
  ];

  const dropdownLinks = [
    { name: "Blog Hub", path: "/resources/blog" },
    { name: "Video Vault", path: "/resources/videos" },
    { name: "Press Release", path: "/resources/press" },
    { name: "Case Studies", path: "/resources/case-studies" },
    { name: "Research & Insights", path: "/resources/research" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsResourcesOpen(false); // Close dropdown when navigating
  };

  return (
<div
  className="fixed top-0 left-0 w-full z-50 shadow-lg text-white flex items-center justify-between px-5 py-3"
  style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
>      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => handleNavigate("/home")}
      >
        <img src={logo} alt="Logo" className="w-16 h-auto" />
        <span className="ml-3 text-xl font-bold tracking-wide text-white">
          ANAMCARA AI
        </span>
      </div>

      {/* Mobile Menu Icon */}
      <div
        className="text-xl lg:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </div>

      {/* Links */}
      <div
        className={`${isMenuOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row items-center gap-12 lg:gap-20 absolute lg:static top-14 left-1/2 transform -translate-x-1/2 lg:translate-x-0 bg-[#000000] lg:bg-transparent p-4 lg:p-0 rounded lg:rounded-none`}
      >
        {links.map((link, index) => (
          <div key={index} className="relative">
            {link.hasDropdown ? (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              >
                <span className="relative group text-white">
                  {link.name}
                  {/* Underline Effect */}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ADFF00] transition-all duration-300 group-hover:w-full"></span>
                </span>
                <span
                  className={`ml-2 transform transition-transform duration-300 ${isResourcesOpen ? "rotate-180" : ""
                    }`}
                >
                  ⌃
                </span>
              </div>
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(link.path);
                }}
                className="relative group text-white"
              >
                {link.name}
                {/* Underline Effect */}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ADFF00] transition-all duration-300 group-hover:w-full"></span>
              </a>
            )}

            {/* Dropdown Menu */}
            {link.hasDropdown && isResourcesOpen && (
              <div className="absolute top-full left-0 text-white shadow-lg rounded-lg mt-2 w-48"
               style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                {dropdownLinks.map((dropdownLink, idx) => (
                  <a
                    key={idx}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(dropdownLink.path);
                    }}
                    className="relative block px-4 py-2 text-white group"
                  >
                    {dropdownLink.name}
                    {/* Underline Effect for Dropdown Options */}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ADFF00] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call-to-Action Button */}
      <div className="relative flex justify-center items-center min-w-[216px] min-h-[60px] h-full overflow-hidden ">
        <button className="relative px-6 py-2 text-[#ADFF00] font-medium cursor-pointer border-[#ADFF00] transition-all duration-300 bg-[#ADFF00] text-black hover:bg-[black] hover:text-white" 

>
          Get Connected
          <div
            className="absolute inset-0 border-2 border-[#ADFF00] animate-border pointer-events-none"
          ></div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
