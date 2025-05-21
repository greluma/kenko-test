import { useEffect, useState } from 'react';
import { motion, useDragControls, type PanInfo } from 'framer-motion';
import { FaRegBell } from 'react-icons/fa6';
import { useAppSelector } from '../store/hooks';
import { contadorNotificacionesGlobal } from '../features/globalSlice';

// ! Updates: Bell effect, constrains parameters, diferenciar evento onClick de drag y onMouseUp/Down

export default function BellBtnWidget({
  openModal,
  isModalOpen,
}: Readonly<{
  openModal: () => void;
  isModalOpen: boolean;
}>) {
  const controls = useDragControls();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const contador = useAppSelector(contadorNotificacionesGlobal);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const newPos = { x: info.point.x, y: info.point.y };
    setPosition(newPos);
    setIsDrag(false);
  };

  useEffect(() => {
    const buttonSize = 48;
    const padding = 24;
    const x = window.innerWidth - buttonSize - padding;
    setPosition({ x, y: padding });
  }, []);

  return (
    <div className={`${isModalOpen ? 'hidden' : ''}`}>
      <motion.div
        onDragStart={() => setIsDrag(true)}
        onPointerDown={() => setIsDrag(true)}
        onPointerUp={() => setIsDrag(false)}
        drag
        dragControls={controls}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={{ x: position.x, y: position.y }}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        dragElastic={0.5}
        whileTap={{ cursor: 'grabbing' }}
        className={` rounded-full transition-shadow grid items-center justify-center  ${
          isDrag ? 'h-11 w-11 shadow-custom ' : 'h-12 w-12 '
        } ${contador === 0 ? 'opacity-85 bg-slate-300' : 'bg-k-blue-100'}`}
      >
        <button
          className="cursor-grab"
          onPointerDown={(e) => controls.start(e)}
          onClick={openModal}
        >
          <span className="text-3xl text-k-blue-800">
            <FaRegBell />
          </span>
        </button>
        <span
          className={`absolute -top-2 -right-2 bg-red-500 h-6 w-6 rounded-full grid items-center justify-center text-k-white text-sm ${
            contador === 0 ? 'hidden' : ''
          }`}
        >
          {contador}
        </span>
      </motion.div>
    </div>
  );
}
