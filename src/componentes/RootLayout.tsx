import { useState } from 'react';
import { resetNotificationsCont } from '../features/globalSlice';
import { useAppDispatch } from '../store/hooks';
import useNotificaciones from '../customHooks/useNotifications';
import { BellBtnWidget, MainModal } from '../componentes';

export default function RootLayout() {
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
    <div>
      <BellBtnWidget isModalOpen={isModalOpen} openModal={openModal} />
      <MainModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}
