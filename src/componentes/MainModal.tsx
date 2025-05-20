import { useState } from 'react';
import ModalHeader from './ModalHeader';

export default function MainModal({
  isModalOpen,
  closeModal,
}: Readonly<{ isModalOpen: boolean; closeModal: () => void }>) {
  const [actualSection, setActualSection] = useState<string>('0');

  const [isFullOpen, setIsFullOpen] = useState<boolean>(false);
  const handleOpenFull = () => {
    if (isFullOpen) {
      setIsFullOpen(false);
    } else {
      setIsFullOpen(true);
    }
  };

  const handleSetModalSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    console.log(id);
    return setActualSection(id);
  };

  return (
    <section
      className={`${
        isModalOpen ? '' : 'hidden'
      } fixed inset-0 h-screen w-screen grid items-center`}
    >
      {/* Fondo con opacidad */}
      <div className="absolute inset-0 bg-slate-500 opacity-40 pointer-events-none z-0"></div>
      {/* Contenido modal */}
      <div
        className={`${
          isFullOpen
            ? 'w-full h-full'
            : 'sm:w-[80%] sm:h-[90%] md:w-[70%] md:h-[80%] lg:w-[70%] lg:h-[80%]'
        } relative z-10 w-full h-full  m-auto bg-k-white  sm:rounded-md sm:shadow-xl md:shadow-2xl`}
      >
        {/* Header */}
        <ModalHeader
          actualSection={actualSection}
          handleSetModalSection={handleSetModalSection}
          closeModal={closeModal}
          handleOpenFull={handleOpenFull}
          isFullOpen={isFullOpen}
        />
        <div className="px-2">
          <ul>
            <li>Not 1</li>
            <li>Not 2</li>
            <li>Not 3</li>
            <li>Not 4</li>
            <li>Not 5</li>
            <li>Not 6</li>
            <li>Not 7</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
