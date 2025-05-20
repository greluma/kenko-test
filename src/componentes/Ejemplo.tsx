import { useTranslation } from 'react-i18next';
import type { Idiomas } from '../i18n';
import { useAppSelector } from '../store/hooks';

export default function Ejemplo() {
  const { value } = useAppSelector((state) => state.global);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: Idiomas) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className="space-y-3">
      <h2>
        Este es un componente de ejemplo para probar todas las dependencias
      </h2>
      <div>
        <h3 className="text-blue-600 font-bold">Tailwind</h3>
      </div>
      <div>
        <h4>Redux: {value}</h4>
      </div>

      <div>
        <h4>Ii18n</h4>
        <h5>{t('welcome')}</h5>
        <p>{t('hello', { name: 'Manuel' })}</p>
        <div className="flex gap-2">
          <button
            className="border border-blue-600 p-1"
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          <button
            className="border border-blue-600 p-1"
            onClick={() => changeLanguage('es')}
          >
            Español
          </button>
          <button
            className="border border-blue-600 p-1"
            onClick={() => changeLanguage('fr')}
          >
            Frances
          </button>
        </div>
      </div>

      <div>
        <h4>Paleta de colores</h4>
        <div className="w-full border-2 h-44 grid border-black">
          <span className="bg-k-white "></span>
          <span className="bg-k-blue-100"></span>
          <span className="bg-k-blue-300"></span>
          <span className="bg-k-blue-700"></span>
          <span className="bg-k-blue-800"></span>
          <span className="bg-k-blue-900"></span>
        </div>
      </div>
    </div>
  );
}
