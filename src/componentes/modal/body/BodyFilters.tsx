import { useTranslation } from 'react-i18next';
import type { EstadoNotificacion } from './ModalBody';

interface BodyFiltersProps {
  handleSetEstado: (newEstado: EstadoNotificacion) => void;
  estado: EstadoNotificacion;
  totales: {
    cantidadTotal: number;
    cantidadNoLeidos: number;
    cantidadLeidos: number;
  };
}

export default function BodyFilters({
  handleSetEstado,
  estado,
  totales: { cantidadLeidos, cantidadNoLeidos, cantidadTotal },
}: Readonly<BodyFiltersProps>) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={() => handleSetEstado(0)}
        className={`my-4 py-0.5 rounded-md px-3 cursor-pointer text-center   max-w-fit text-sm ${
          estado === 0
            ? 'border-slate-900 text-slate-900 border-2 font-semibold'
            : 'border-slate-500 text-slate-500 border font-normal'
        }`}
      >
        {t('modalState.all')}: {cantidadTotal}
      </button>
      <button
        onClick={() => handleSetEstado(2)}
        className={`my-4 py-0.5 cursor-pointer rounded-md px-3 text-center border  max-w-fit text-sm ${
          estado === 2
            ? 'border-slate-900 text-slate-900 border-2 font-semibold'
            : 'border-slate-500 text-slate-500 border font-normal'
        }`}
      >
        {t('modalState.unread')}: {cantidadNoLeidos}
      </button>
      <button
        onClick={() => handleSetEstado(1)}
        className={`my-4 py-0.5 cursor-pointer rounded-md px-3 text-center border  max-w-fit text-sm ${
          estado === 1
            ? 'border-slate-900 text-slate-900 border-2 font-semibold'
            : 'border-slate-500 text-slate-500 border font-normal'
        }`}
      >
        {t('modalState.read')}: {cantidadLeidos}
      </button>
    </div>
  );
}
