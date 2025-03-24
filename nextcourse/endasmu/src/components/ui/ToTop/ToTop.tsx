"use client";

import { ArrowUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOnBottom, setIsOnBottom] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const initialScrollY = window.scrollY > 0;
    setIsScrolled(initialScrollY);
    setLastScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    const handleMobileScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsOnBottom(true);
      } else {
        setIsOnBottom(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleMobileScroll);
    return () => window.removeEventListener("scroll", handleMobileScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 
        ${isOnBottom ? "max-md:bottom-2" : "max-md:bottom-20"}
       right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full 
                  flex justify-center items-center shadow-lg transition-all 
                  duration-500 ease-in-out transform
                  ${
                    isVisible
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-75 pointer-events-none"
                  }
                  bg-gradient-to-r from-orange-400 to-orange-600 
                  hover:scale-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]`}
    >
      <ArrowUp
        className="text-white transition-all duration-300 ease-in-out 
                   hover:drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
      />
    </motion.button>
  );
};

export default ToTop;
