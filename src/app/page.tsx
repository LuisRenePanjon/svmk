'use client';

import {FormEvent, useState} from "react";
import Modal from "@/app/components/modal";
import {invalidMessages} from "@/app/utils/messages";

export default function Home() { // Coloca el hook aquí, siempre debe estar en el mismo orden
  const backgroundImage = "/images/globos.png";
  const message = invalidMessages[Math.floor(Math.random() * invalidMessages.length)];
  const clue = "Para entrar a mi corazón debes ingresar: (nombre de tu noviecito)meamamucho";
  const [isInvalidUser, setIsInvalidUser] = useState(false)
  const [showClue, setShowClue] = useState(false);

  const closeModal = () => {
    setIsInvalidUser(false);
    setShowClue(false);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password}),
    });

    if (response.ok) {
      window.location.href = "/peticion";
    } else {
      setIsInvalidUser(true);
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{backgroundImage: `url(${backgroundImage})`}}
    >
      {isInvalidUser && <Modal message={message} closeModal={closeModal}/>}
      {showClue && <Modal message={clue} closeModal={closeModal}/>}

      <div className="absolute inset-0 "></div>
      <div className="relative z-10 flex items-center justify-center h-full text-white flex flex-col">
        <h1 className="font-cursive text-red-600 text-3xl text-center m-5">Mi bella María Josesita, por favor
          ingrese.</h1>
        {/*  create a div with other background image*/}
        <div className="relative bg-contain bg-center w-full h-auto">
          <form onSubmit={onSubmit} className="flex flex-col align-middle justify-center space-y-2">
            <label htmlFor="username" className="text-red-600 font-serif text-center font-bold">El nombre del amor de mi
              bida</label>
            <input
              type="text"
              id="username"
              className="p-1 mx-20 h-10 rounded-2xl bg-pink-600 text-center"
              value={"María Josésita"}
              readOnly={true}
              name="username"
            />
            <label htmlFor="password" className="text-red-600 font-serif text-center font-bold">Contraseña</label>
            <input
              type="password"
              id="password"
              className="p-1 mx-20 h-10 rounded-2xl bg-pink-600 text-center selection:border-white"
              name="password"
            />
            <div className={"flex justify-center"}>
              <button
                type="submit"
                className="relative w-32 h-24 bg-pink-400 text-white text-xl font-bold
             flex items-center justify-center text-center transition-all duration-300 font-cursive
             hover:bg-pink-500 active:scale-95"
                style={{
                  clipPath:
                    "path('M 65 12 C 80 -8, 125 0, 115 35 C 110 60, 65 95, 65 95 C 65 95, 20 60, 15 35 C 5 0, 50 -8, 65 12 Z')",
                }}
              >
                Te amo
              </button>
            </div>
            {/*  add forgot password question*/}
            <a href="#" onClick={() => setShowClue(true)} aria-readonly={isInvalidUser || showClue ? "true" : "false"}
             className="text-pink-600 font-serif text-center font-bold">¿Un pista para ingresar?</a>
          </form>
        </div>
      </div>
    </div>
  );
}
