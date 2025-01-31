import { useState } from "react";
import Dialog from "./components/Dialog";

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen((isOpen) =>!isOpen);
  };

  const closeModal = () =>{
    setIsOpen(false);
  }
  return (
    <div className=" relative bg-white p-1 w-full h-screen">
      <button type="button" className=" px-4 py-1 bg-blue-700 rounded-lg font-mono text-neutral-50 " onClick={toggleModal}>Open</button>
      {isOpen && (
        <div className=" w-full h-full flex items-center justify-center">
          <Dialog onClose={closeModal}><h1>Hey!</h1></Dialog>
        </div>
      )}
    </div>
  )
}

export default App