"use client";
import { motion } from "framer-motion";

const Mujer8M = () => {
  return (
    <div className="relative bg-cover bg-center h-[80vh]">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/flores.mp4" type="video/mp4" />
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
          <audio controls className="w-full max-w-md mx-auto">
            <source src="/songs/eres_mi_cancion.mp3" type="audio/mp3" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </motion.div>
      </div>
    </div>
  );
};

export default Mujer8M;
