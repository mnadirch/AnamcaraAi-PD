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
      className="fixed top-0 left-0 w-full z-50 shadow-lg text-white flex items-center justify-between px-4 py-3 bg-transparent"
    >
      {/* Logo */}
      <div
        className="flex flex-col sm:flex-row items-center cursor-pointer space-x-2 sm:space-x-1"
        onClick={() => handleNavigate("/home")}
      >
        <img src={logo} alt="Logo" className="w-16 h-auto" />
        <span className="text-xs sm:text-sm md:text-sm font-bold tracking-wide text-white whitespace-nowrap">
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
    className={`${isMenuOpen ? "flex" : "hidden"} 
    lg:flex flex-col lg:flex-row items-center justify-center md:gap-8 max-lg:gap-20
    absolute lg:static top-14 
    bg-[#111]/80 lg:bg-transparent lg:p-0 
    rounded lg:rounded-none z-50`}
  
      >
        {links.map((link, index) => (
          <div key={index} className="relative w-3/5">
            {link.hasDropdown ? (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
              >
                <span className="relative group text-white text-sm  whitespace-nowrap">
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
                className="relative group text-white text-sm whitespace-nowrap"
              >
                {link.name}
                {/* Underline Effect */}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ADFF00] transition-all duration-300 group-hover:w-full"></span>
              </a>
            )}

            {/* Dropdown Menu with Better Positioning & Auto-close */}
            {link.hasDropdown && isResourcesOpen && (
              <div
                className="absolute top-full left-0 w-48 text-white shadow-lg rounded-lg mt-2 z-50"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                onMouseLeave={() => setIsResourcesOpen(false)} // Auto close when mouse leaves
              >
                {dropdownLinks.map((dropdownLink, idx) => (
                  <a
                    key={idx}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(dropdownLink.path);
                      setIsResourcesOpen(false); // Close after click
                    }}
                    className="relative block px-4 py-2 text-white group"
                  >
                    {dropdownLink.name}
                    {/* Underline Effect */}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#ADFF00] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Call-to-Action Button */}
      <div className="relative flex justify-center items-center sm:min-w-[180px] min-h-[60px] h-full overflow-hidden">
        <button className="relative px-4 md:px-4 lg:px-4 py-2 text-xs sm:text-sm md:text-base font-medium cursor-pointer border border-[#ADFF00] transition-all duration-300 bg-[#ADFF00] text-black hover:bg-black hover:text-white">
          Get Connected
          <div className="absolute inset-0 border-2 border-[#ADFF00] animate-border pointer-events-none"></div>
        </button>
      </div>

    </div>
  );
};

export default Navbar;
