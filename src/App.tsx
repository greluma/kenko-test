import { useState } from 'react';
import { BellBtnWidget, MainModal } from './componentes';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="space-y-3">
      <h1 className="font-bold  bg-green-500 ">Hola Kenko</h1>
      <BellBtnWidget isModalOpen={isModalOpen} openModal={openModal} />
      <MainModal isModalOpen={isModalOpen} closeModal={closeModal} />
      {/* <Ejemplo /> */}
    </div>
  );
}
