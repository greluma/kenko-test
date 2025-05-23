import { useState } from 'react';
import { BellBtnWidget, MainModal } from './componentes';
import { resetNotificationsCont } from './features/globalSlice';
import { useAppDispatch } from './store/hooks';
import useNotificaciones from './customHooks/useNotifications';
import kenkoLogo from '../public/kenko_logo.png';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useNotificaciones();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(resetNotificationsCont());
  };
  return (
    <div className="bg-k-blue-700  h-screen w-screen">
      <div className="flex bg-k-blue-800 items-center shadow-md">
        <img src={kenkoLogo} alt="kenko logo" className="h-14 " />
        <h1 className="font-bold p-2 sm:text-lg text-slate-50 tracking-wide">
          Prueba Técnica: Kenko Imalytics
        </h1>
      </div>
      <BellBtnWidget isModalOpen={isModalOpen} openModal={openModal} />
      <MainModal isModalOpen={isModalOpen} closeModal={closeModal} />
      {/* <TestWebSockets /> */}
    </div>
  );
}
