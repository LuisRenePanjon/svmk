"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FloatingButton = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * window.innerWidth * 1,
        y: Math.random() * window.innerHeight * 0.8,
      });
    }, 1); // Cambia la posición cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.button
      type="button"
      className="fixed w-32 h-24 bg-pink-400 text-white text-lg  flex items-center
                 justify-center text-center transition-all duration-300 font-cursive
                 hover:bg-pink-500 active:scale-95"
      style={{
        clipPath:
          "path('M 65 12 C 80 -8, 125 0, 115 35 C 110 60, 65 95, 65 95 C 65 95, 20 60, 15 35 C 5 0, 50 -8, 65 12 Z')",
      }}
      animate={{
        x: position.x,
        y: position.y,
        rotate: [0, 360], // Rotación completa
      }}
      transition={{
        ease: "easeInOut",
      }}
    >
      Presioname
    </motion.button>
  );
};

export default FloatingButton;
