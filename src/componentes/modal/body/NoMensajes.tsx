import { useTranslation } from 'react-i18next';

export default function NoMensajes() {
  const { t } = useTranslation();
  return (
    <div className="grid  mt-20 text-center">
      <p className="text-slate-700 text-lg w-2/3 mx-auto">
        {t('noNotifications')}
      </p>
    </div>
  );
}
