import React from 'react';
import type { ModalSections } from './ModalHeader';

interface ModalSectionBtnProps extends ModalSections {
  modalSection: string;
  handleSetModalSection: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ModalSectionBtn = React.memo(function ModalSectionBtn({
  id,
  title,
  modalSection,
  handleSetModalSection,
}: Readonly<ModalSectionBtnProps>) {
  const isActive = modalSection === id;

  return (
    <button
      type="button"
      onClick={handleSetModalSection}
      id={id}
      aria-pressed={isActive}
      aria-current={isActive ? 'true' : undefined}
      className={`relative after:content-[''] after:absolute after:left-1/2 after:transform after:-translate-x-1/2 after:translate-y-2 after:bottom-0 after:w-8 after:border-b-[2.5px] transition-colors cursor-pointer ${
        isActive
          ? 'after:border-slate-800 -translate-y-1'
          : 'after:border-b-[0px] hover:after:border-b-[2.5px] after:border-k-blue-300 hover:after:border-slate-600'
      }`}
    >
      {title}
    </button>
  );
});

export default ModalSectionBtn;
