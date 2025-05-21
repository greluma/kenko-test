import { useState } from 'react';
import { BellBtnWidget, MainModal } from './componentes';
// import TestWebSockets from './componentes/TestWebSockets';
import { resetNotificationsCont } from './features/globalSlice';
import { useAppDispatch } from './store/hooks';
import useNotificaciones from './customHooks/useNotifications';

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
    <div className="space-y-3">
      <h1 className="font-bold  bg-green-500 ">Hola Kenko</h1>
      <BellBtnWidget isModalOpen={isModalOpen} openModal={openModal} />
      <MainModal isModalOpen={isModalOpen} closeModal={closeModal} />
      {/* <TestWebSockets /> */}
    </div>
  );
}
