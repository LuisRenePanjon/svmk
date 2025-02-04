interface ModalProps {
  message: string;
  closeModal: () => void;
}

const Modal = (
  {message,closeModal}: ModalProps
) => {
  const backgroundImage = "/images/modal-background.jpg";

  return (
  //   Create a modal component with css to display simple messagem, using tailwindcss and the designe is for san valentin

    // aling the modal in the center of the screen and over the background image
    <div
      className="bg-white w-1/2 p-4 rounded-lg shadow-lg absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-contain"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover", // Asegura que la imagen ocupe todo el fondo
        backgroundRepeat: "no-repeat", // Evita la repetición
        backgroundPosition: "center", // Centra la imagen en el contenedor
      }}
    >
      <div className="flex justify-end">
        <button className="text-white font-serif font-bold" onClick={closeModal}>
          X
        </button>
      </div>
      <p className="text-white font-serif text-2xl text-center  mb-14">{message}</p>
    </div>
  );
};

export default Modal;
