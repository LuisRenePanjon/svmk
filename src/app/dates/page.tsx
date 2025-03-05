import React from 'react';
import Image from "next/image";
import NervousButton from "@/app/components/nervousButton";

const dates: {
  date: string;
  description: string;
  image: string;
  path: string;
  backgroundColor: string;
  fontColor: string;
  btnBackgroundColor: string;
  btnFontColor: string;
}[] = [
  {
    date: "2025-02-14",
    description: "Día de San Valentín",
    image: "/images/14feb.jpg",
    path: "/peticion",
    backgroundColor: "#e069a0",
    fontColor: "#ffffff",
    btnBackgroundColor: "#1A5276",
    btnFontColor: "#ffffff"
  },
  {
    date: "2025-03-08",
    description: "Día Internacional de la Mujer",
    image: "/images/8m2.jpg",
    path: "/mujer8m",
    backgroundColor: "#682184",
    fontColor: "#ffffff",
    btnBackgroundColor: "#F4A100",
    btnFontColor: "#ffffff"
  }
];



const Dates = () => {
  //   Create a div with cards for each date
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-br from-purple-900 via-red-600 to-pink-600">
      <h1 className="text-4xl text-center font-bold font-cursive text-white p-2">Nuestros recuerdos</h1>
      {dates.map((date, index) => (
        <div
          key={index}
          className="rounded-2xl shadow-2xl mx-6 my-4 p-3"
          style={{ backgroundColor: date.backgroundColor, color: date.fontColor }} // Aquí aplicamos los colores dinámicos
        >
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              className="w-full object-contain rounded-2xl"
              src={date.image}
              alt={date.description}
              width={500}
              height={500}
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold font-cursive">{date.description}</h2>
            <p className="font-cursive">{date.date}</p>
            <NervousButton btnBackgroundColor={date.btnBackgroundColor} btnFontColor={date.btnFontColor} path={date.path} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dates;
