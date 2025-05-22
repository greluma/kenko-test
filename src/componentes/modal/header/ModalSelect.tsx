import { useTranslation } from 'react-i18next';
import type { Idiomas } from '../../../i18n';
import { FaCheck } from 'react-icons/fa6';

export default function ModalSelect({
  isSelect,
}: Readonly<{ isSelect: boolean }>) {
  const { i18n } = useTranslation();

  const idiomas: { code: Idiomas; label: string }[] = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
  ];

  const changeLanguage = (lang: Idiomas) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div
      className={`bg-k-blue-300 w-1/3 md:w-1/5 px-4 pb-2 rounded-b-lg shadow-lg border-t-[0.2px] border-k-blue-100 min-w-fit text-center pt-1 md:pt-2 ${
        isSelect ? '' : 'hidden'
      }`}
      role="menu"
      aria-label="Selector de idioma"
    >
      <ul className="text-md space-y-1 font-sans">
        {idiomas.map(({ code, label }) => (
          <li key={code}>
            <button
              type="button"
              onClick={() => changeLanguage(code)}
              role="menuitem"
              aria-current={i18n.language === code ? 'true' : undefined}
              tabIndex={0}
              className="w-full text-left"
            >
              <div className="flex items-center gap-2">
                <span>{label}</span>
                <span className={i18n.language === code ? '' : 'hidden'}>
                  <FaCheck />
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
