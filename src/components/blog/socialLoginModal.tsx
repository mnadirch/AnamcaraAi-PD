import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialLoginModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="h-10 w-10 bg-gray-300 rounded-sm flex items-center justify-center">
            {/* Replace with your logo */}
            <div className="h-5 w-5 bg-yellow-500"></div>
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="text-lg font-semibold text-center">Bookmark this story</h2>
        <p className="text-gray-600 text-sm text-center mt-1">
          Login or register to save your favourite articles.
        </p>

        {/* Social Login Buttons */}
        <div className="mt-4 space-y-3">
          {/* <button className="w-full flex items-center justify-center px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100">
            <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" className="w-5 h-5 mr-3" />
            Sign in with Facebook
          </button> */}

          <button className="w-full flex items-center justify-center px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100">
            <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" className="w-5 h-5 mr-3" />
            Sign in with Google
          </button>

          <button className="w-full flex items-center justify-center px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100">
            <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="Apple" className="w-5 h-5 mr-3" />
            Sign in with Apple
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Email Sign-in */}
        <button className="w-full flex items-center justify-center px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100">
          <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" className="w-5 h-5 mr-3" />
          Sign in with Email
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500 mt-4">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and acknowledge our{" "}
          <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default SocialLoginModal;
