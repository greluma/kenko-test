// Hooks
import { useEffect, useMemo, useRef, useState } from 'react';
// Language
import { useTranslation } from 'react-i18next';
// Iconos
import { GrLanguage } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { BiExpandAlt } from 'react-icons/bi';
import { BiCollapseAlt } from 'react-icons/bi';
import ModalSectionBtn from './ModalSectionBtn';
import ModalSelect from './ModalSelect';

export interface ModalSections {
  id: string;
  title: string;
}

interface ModalHeaderProps {
  actualSection: string;
  handleSetModalSection: (e: React.MouseEvent<HTMLButtonElement>) => void;
  closeModal: () => void;
  handleOpenFull: () => void;
  isFullOpen: boolean;
}

export default function ModalHeader({
  actualSection,
  handleSetModalSection,
  closeModal,
  handleOpenFull,
  isFullOpen,
}: Readonly<ModalHeaderProps>) {
  const { t } = useTranslation();

  // Estado local para saber si el select de idiomas esta activo
  const [isSelect, setIsSelect] = useState<boolean>(false);

  // Secciones del Modal
  const sections: ModalSections[] = useMemo(
    () => [
      { id: '0', title: t('modalTitles.inbox') },
      { id: '1', title: t('modalTitles.archived') },
    ],
    [t]
  );

  // Manejo del click fuera de la botonera
  const selectRefBtn1 = useRef<HTMLDivElement>(null);
  const selectRefBtn2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isInsideSelect =
        selectRefBtn1.current && selectRefBtn1.current.contains(target);
      const isInsideSelect2 =
        selectRefBtn2.current && selectRefBtn2.current.contains(target);

      // Si el clic NO está dentro de ninguno de los dos, cerramos
      if (!isInsideSelect && !isInsideSelect2) {
        setIsSelect(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sm:rounded-t-md relative">
      <h2 id="modal-title" className="sr-only">
        {t('title')}
      </h2>
      <div className="relative sm:rounded-t-md flex justify-between items-center bg-k-blue-300 px-2 py-3 shadow-lg">
        <div className="text-xl  space-x-5 z-10">
          {sections.map((section) => {
            return (
              <ModalSectionBtn
                key={section.id}
                id={section.id}
                title={section.title}
                modalSection={actualSection}
                handleSetModalSection={handleSetModalSection}
              />
            );
          })}
        </div>
        <div className="space-x-5 flex text-lg items-center">
          <div className="space-x-5 flex items-center" ref={selectRefBtn1}>
            <button
              className={`transition-all hover:scale-110 ${
                isSelect && 'scale-125 hover:scale-125'
              }`}
              onClick={() => setIsSelect(true)}
              aria-label={'Acceder al selector de idioma'}
              aria-expanded={isSelect}
              aria-haspopup="listbox"
              type="button"
            >
              <span>
                <GrLanguage />
              </span>
            </button>
          </div>
          <button
            className={`text-xl transition-all hover:scale-110 hidden sm:block`}
            onClick={handleOpenFull}
            aria-label={isFullOpen ? 'Minimizar modal' : 'Maximizar modal'}
            type="button"
          >
            <span>{isFullOpen ? <BiCollapseAlt /> : <BiExpandAlt />}</span>
          </button>
          <button
            className={`text-xl transition-all hover:text-red-500 hover:scale-110`}
            onClick={closeModal}
            aria-label={'Cerrar modal'}
            type="button"
          >
            <span>
              <IoClose />
            </span>
          </button>
        </div>
      </div>
      <div ref={selectRefBtn2} className="absolute right-0">
        {isSelect && <ModalSelect isSelect={isSelect} />}
      </div>
    </div>
  );
}
