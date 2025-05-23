// Estado
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { contadorNotificacionesGlobal } from '../features/globalSlice';
// Librerías Externas
import { motion, useDragControls, type PanInfo } from 'framer-motion';
// Iconos
import { FaRegBell } from 'react-icons/fa6';

interface BellBtnWidgetProps {
  openModal: () => void;
  isModalOpen: boolean;
}

export default function BellBtnWidget({
  openModal,
  isModalOpen,
}: Readonly<BellBtnWidgetProps>) {
  // FramerMotion Config
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const controls = useDragControls();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Contador de notificaciones global
  const contador = useAppSelector(contadorNotificacionesGlobal);

  // Manejador de evento de arrastre
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const newPos = { x: info.point.x, y: info.point.y };
    setPosition(newPos);
    setIsDrag(false);
  };

  // Utilidad para posicionar el widget en el primer render
  useEffect(() => {
    const buttonSize = 48;
    const padding = 24;
    const x = window.innerWidth - buttonSize - padding;
    setPosition({ x, y: padding });
  }, []);

  // Utilidad para animar la campanita
  const [isShaking, setIsShaking] = useState(false);
  const prevContador = useRef(contador);

  useEffect(() => {
    if (contador > prevContador.current) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
    }
    prevContador.current = contador;
  }, [contador]);

  // Utilidad para diferenciar click de drag
  const [pointerDownPos, setPointerDownPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const DRAG_THRESHOLD = 5;

  return (
    <motion.button
      onPointerDown={(e) => {
        setPointerDownPos({ x: e.clientX, y: e.clientY });
        controls.start(e);
      }}
      onPointerUp={(e) => {
        setIsDrag(false);
        if (
          pointerDownPos &&
          Math.abs(e.clientX - pointerDownPos.x) < DRAG_THRESHOLD &&
          Math.abs(e.clientY - pointerDownPos.y) < DRAG_THRESHOLD
        ) {
          openModal();
        }
        setPointerDownPos(null);
      }}
      onDragStart={() => setIsDrag(true)}
      drag
      dragControls={controls}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      animate={{ x: position.x, y: position.y }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      dragElastic={0.5}
      whileTap={{ cursor: 'grabbing' }}
      className={`cursor-pointer rounded-full transition-shadow grid items-center justify-center  ${
        isDrag ? 'h-11 w-11 shadow-custom ' : 'h-12 w-12 '
      } ${contador === 0 ? 'opacity-85 bg-slate-300' : 'bg-k-blue-100'} ${
        isModalOpen ? 'hidden' : ''
      }`}
      aria-label="Abrir panel de notificaciones"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          openModal();
        }
      }}
    >
      <div className="">
        <span className="text-3xl text-k-blue-800 grid ">
          <motion.span
            animate={
              isShaking
                ? { rotate: [0, -25, 20, -15, 10, -5, 0] }
                : { rotate: 0 }
            }
            transition={
              isShaking
                ? { duration: 2, times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1] }
                : {}
            }
            style={{ display: 'inline-block' }}
          >
            <FaRegBell />
          </motion.span>
        </span>
      </div>
      <span
        aria-live="polite"
        aria-atomic="true"
        className={`absolute -top-2 -right-2 bg-red-500 h-6 w-6 rounded-full grid items-center justify-center text-k-white text-sm ${
          contador === 0 ? 'hidden' : ''
        }`}
      >
        {contador}
      </span>
    </motion.button>
  );
}
