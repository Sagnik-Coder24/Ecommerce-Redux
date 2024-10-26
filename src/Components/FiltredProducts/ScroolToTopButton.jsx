import React, { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to a certain distance
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-4 right-3 hover:bottom-3 duration-300 ease-in-out">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-2 bg-orange-700 text-white rounded-full shadow-lg hover:bg-orange-900 duration-300 ease-in-out hover:py-4"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
