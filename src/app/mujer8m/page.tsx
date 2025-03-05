"use client";
import { motion } from "framer-motion";
import Confetti from 'react-confetti'
import {useState} from "react";

const Mujer8M = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [running, setRunning] = useState(false);
  const onPlayMusic = () => {
    setRunning(true);
    setShowConfetti(true);
  }

  const onPauseMusic = () => {
    setRunning(false);
  }


  return (
    <div className="relative bg-cover bg-center h-[100vh]">
      {showConfetti && <Confetti numberOfPieces={running ? 200 : 10}
      colors={["#682184", "#F4A100", "#1A5276", "#e069a0", "#ffffff"]}
      />}
      {/* Video de fondo */}
      <video
        className="absolute inset-0 h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/miles_girasoles.mp4" type="video/mp4" />
        Tu navegador no soporta el formato de video.
      </video>

      {/* Fondo oscuro para mejorar la legibilidad del texto */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center p-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white font-cursive mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Para mi querida María Josésita
        </motion.h1>

        <motion.p
          className="text-xl text-white mb-8 font-cursive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          Hoy celebro tu grandeza, tu amor y todo lo que eres. ¡Feliz Día de la Mujer! 💛
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <audio controls className="w-full max-w-md mx-auto" onPlay={onPlayMusic} onPause={onPauseMusic}>
            <source src="/songs/un_regalo_de_dios.mp3" type="audio/mp3" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </motion.div>
      </div>
    </div>
  );
};

export default Mujer8M;
