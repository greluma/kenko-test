import { IoFilterSharp } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { BiExpandAlt } from 'react-icons/bi';
import { BiCollapseAlt } from 'react-icons/bi';
import type { Idiomas } from '../i18n';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

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
  const [isSelect, setIsSelect] = useState<0 | 1 | 2>(0);

  const sections: ModalSections[] = [
    { id: '0', title: t('modalTitles.inbox') },
    { id: '1', title: t('modalTitles.archived') },
  ];

  const selectRef = useRef<HTMLDivElement>(null);
  const selectRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isInsideSelect =
        selectRef.current && selectRef.current.contains(target);
      const isInsideSelect2 =
        selectRef2.current && selectRef2.current.contains(target);

      // Si el clic NO está dentro de ninguno de los dos, cerramos
      if (!isInsideSelect && !isInsideSelect2) {
        setIsSelect(0);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sm:rounded-t-md relative">
      <div className="relative sm:rounded-t-md flex justify-between items-center bg-k-blue-300 px-2 py-3 shadow-lg">
        <div className="text-xl  space-x-5 ">
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
          <div className="space-x-5 flex items-center" ref={selectRef}>
            <button
              className={`transition-all hover:scale-110 ${
                isSelect === 1 && 'scale-125 hover:scale-125'
              }`}
              onClick={() => setIsSelect(1)}
            >
              <span>
                <GrLanguage />
              </span>
            </button>
            <button
              className={`text-xl transition-all hover:scale-110 ${
                isSelect === 2 && 'scale-125 hover:scale-125'
              }`}
              onClick={() => setIsSelect(2)}
            >
              <span>
                <IoFilterSharp />
              </span>
            </button>
          </div>
          <button
            className={`text-xl transition-all hover:scale-110 hidden sm:block`}
            onClick={handleOpenFull}
          >
            <span>{isFullOpen ? <BiCollapseAlt /> : <BiExpandAlt />}</span>
          </button>
          <button
            className={`text-xl transition-all hover:text-red-500 hover:scale-110`}
            onClick={closeModal}
          >
            <span>
              <IoClose />
            </span>
          </button>
        </div>
      </div>
      <div ref={selectRef2} className="absolute right-0">
        <ModalSelect isSelect={isSelect} />
      </div>
    </div>
  );
}

interface ModalSectionBtnProps extends ModalSections {
  modalSection: string;
  handleSetModalSection: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function ModalSectionBtn({
  id,
  title,
  modalSection,
  handleSetModalSection,
}: Readonly<ModalSectionBtnProps>) {
  return (
    <button
      onClick={handleSetModalSection}
      id={id}
      className={` relative  after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:translate-y-2 after:bottom-0 after:w-8 after:border-b-[2.5px]  transition-colors  ${
        modalSection === id
          ? ' after:border-slate-800 -translate-y-1'
          : ' after:border-b-[0px]  hover:after:border-b-[2.5px] after:border-k-blue-300 hover:after:border-slate-600'
      }`}
    >
      {title}
    </button>
  );
}

function ModalSelect({ isSelect }: Readonly<{ isSelect: number }>) {
  const { i18n } = useTranslation();
  const changeLanguage = (lang: Idiomas) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div
      className={` bg-k-blue-300 w-1/3 md:w-1/5 px-4 pb-2  rounded-b-lg shadow-lg border-t-[0.2px] border-k-blue-100 min-w-fit text-center pt-1 md:pt-2 ${
        isSelect === 1 || isSelect === 2 ? '' : 'hidden'
      }`}
    >
      <div>
        <ul className="text-md space-y-1 font-sans">
          {isSelect === 1 && (
            <>
              <li>
                <button onClick={() => changeLanguage('es')}>
                  <div className="flex items-center gap-2">
                    <span className="">Español</span>
                    <span className={`${i18n.language === 'es' || 'hidden'} `}>
                      <FaCheck />
                    </span>
                  </div>
                </button>
              </li>
              <li>
                <button onClick={() => changeLanguage('en')}>
                  <div className="flex items-center gap-2">
                    <span>English</span>
                    <span className={`${i18n.language === 'en' || 'hidden'}`}>
                      <FaCheck />
                    </span>
                  </div>
                </button>
              </li>
              <li>
                <button onClick={() => changeLanguage('fr')}>
                  <div className="flex items-center gap-2">
                    <span>Français</span>
                    <span className={`${i18n.language === 'fr' || 'hidden'}`}>
                      <FaCheck />
                    </span>
                  </div>
                </button>
              </li>
            </>
          )}
          {isSelect === 2 && (
            <>
              <li>
                <button> No leídos</button>
              </li>
              <li>
                <button>Leídos</button>
              </li>
              <li>
                <button>Todos</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
