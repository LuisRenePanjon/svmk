'use client';
import React from 'react';
import {motion} from "framer-motion";

interface Props {
  path: string;
  btnBackgroundColor: string;
  btnFontColor: string;
}

const NervousButton = ({btnBackgroundColor, btnFontColor, path}: Props) => {
  return (
    <motion.a
      href={path}
      className="block w-full mt-4 text-center font-semibold py-2 rounded-lg font-cursive"
      animate={{ rotate: [2, -2, 2] }} // Mueve el botón de lado a lado
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
      style={{ backgroundColor: btnBackgroundColor, color: btnFontColor }} // Aquí aplicamos los colores dinámicos
    >
      Vamos a ese momento
    </motion.a>
  );
};

export default NervousButton;
