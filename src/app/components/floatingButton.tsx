"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


const FloatingButton = () => {

  const pdfUrl = "/documents/letter.pdf";
  const [position, setPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const updatePosition = () => {
      setPosition({
        x: Math.random() * (window.innerWidth - 150), // Evita que salga de la pantalla
        y: Math.random() * (window.innerHeight - 100),
      });
    };

    const interval = setInterval(updatePosition, 1500); // Cambia la posición cada 1.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.button
      onClick={() => {
        window.open(pdfUrl, "_blank");
      }}
      type="button"
      className="fixed w-32 h-24 bg-red-600 text-white text-lg flex items-center
                 justify-center text-center transition-all duration-300 font-cursive
                 hover:bg-red-800 active:scale-95"
      style={{
        clipPath:
          "path('M 65 12 C 80 -8, 125 0, 115 35 C 110 60, 65 95, 65 95 C 65 95, 20 60, 15 35 C 5 0, 50 -8, 65 12 Z')",
      }}
      animate={{
        x: position.x,
        y: position.y,
        scale: [1, 2, 1], // Efecto de latido (zoom in y out)
        translateY: [0, -10, 0], // Elevación sutil
      }}
      transition={{
        x: { duration: 1.5, ease: "easeInOut" },
        y: { duration: 1.5, ease: "easeInOut" },
        scale: { duration: 0.6, ease: "easeInOut", repeat: Infinity }, // Latido constante
        translateY: { duration: 0.6, ease: "easeInOut", repeat: Infinity }, // Elevación rítmica
      }}
    >
      Presioname
    </motion.button>
  );
};

export default FloatingButton;
