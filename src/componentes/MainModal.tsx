import { useState } from 'react';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import archivadasData from '../bd_local/archivadas.json';
import inboxData from '../bd_local/inbox.json';

export default function MainModal({
  isModalOpen,
  closeModal,
}: Readonly<{ isModalOpen: boolean; closeModal: () => void }>) {
  const [actualSection, setActualSection] = useState<string>('0');
  // 0 entradas - 1 archivadas

  const [isFullOpen, setIsFullOpen] = useState<boolean>(false);
  const handleOpenFull = () => {
    if (isFullOpen) {
      setIsFullOpen(false);
    } else {
      setIsFullOpen(true);
    }
  };

  const fetchDB = () => {
    if (actualSection === '0') {
      return inboxData.bandeja_entrada;
    } else {
      return archivadasData.archivadas;
    }
  };

  const handleSetModalSection = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
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
            : 'sm:w-[80%] sm:h-[90%] md:w-[70%] md:h-[90%] lg:w-[70%] lg:h-[95%]'
        } relative overflow-scroll z-10 w-full h-full  m-auto bg-k-white  sm:rounded-md sm:shadow-xl md:shadow-2xl`}
      >
        {/* Header */}
        <ModalHeader
          actualSection={actualSection}
          handleSetModalSection={handleSetModalSection}
          closeModal={closeModal}
          handleOpenFull={handleOpenFull}
          isFullOpen={isFullOpen}
        />
        <ModalBody lista={fetchDB()} />
      </div>
    </section>
  );
}
