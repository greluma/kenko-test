// Estado
import { useAppSelector } from '../store/hooks';
import {
  archivadasGlobal,
  notificacionesGlobal,
} from '../features/globalSlice';
import { useMemo, useCallback, useState, useRef, useEffect } from 'react';
// Componentes
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';

interface MainModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export default function MainModal({
  isModalOpen,
  closeModal,
}: Readonly<MainModalProps>) {
  // Extraer los datos del estado global
  const listaNotificaciones = useAppSelector(notificacionesGlobal);
  const listaArchivadas = useAppSelector(archivadasGlobal);

  // Manejo de estado para usar lista de notificaciones en bandeja de entrada (0) o archivadas (1)
  const [actualSection, setActualSection] = useState<string>('0');

  const handleSetModalSection = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setActualSection(e.currentTarget.id);
    },
    []
  );

  const listaDeNotif = useMemo(
    () => (actualSection === '0' ? listaNotificaciones : listaArchivadas),
    [actualSection, listaNotificaciones, listaArchivadas]
  );

  // Utilidad para maximizar a minimizar la ventana
  const [isFullOpen, setIsFullOpen] = useState<boolean>(false);

  const handleOpenFull = useCallback(() => {
    setIsFullOpen((prev) => !prev);
  }, []);

  // Accesibilidad
  const modalRef = useRef<HTMLDivElement>(null);

  // Enfoca el modal al abrirse
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isModalOpen]);

  // Cierra el modal con Escape
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal]);

  return (
    <section
      className={`${
        isModalOpen ? '' : 'hidden'
      } fixed inset-0 h-screen w-screen grid items-center`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`${
          isFullOpen
            ? 'w-full h-full'
            : 'sm:w-[80%] sm:h-[90%] md:w-[70%] md:h-[90%] lg:w-[70%] lg:h-[95%]'
        } relative overflow-scroll z-10 m-auto bg-k-white sm:rounded-md sm:shadow-xl md:shadow-2xl`}
      >
        <ModalHeader
          actualSection={actualSection}
          handleSetModalSection={handleSetModalSection}
          closeModal={closeModal}
          handleOpenFull={handleOpenFull}
          isFullOpen={isFullOpen}
        />
        <ModalBody listaDeNotif={listaDeNotif} actualSection={actualSection} />
      </div>
    </section>
  );
}
