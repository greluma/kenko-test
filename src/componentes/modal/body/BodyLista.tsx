// Estado
import {
  cambiarEstadoLeido,
  eliminarNotificacion,
  moverNotificacion,
} from '../../../features/globalSlice';
import { useAppDispatch } from '../../../store/hooks';
// Types
import type { NotificationsInterface } from './ModalBody';
// Iconos
import { CiRead, CiUnread } from 'react-icons/ci';
import {
  MdDeleteOutline,
  MdOutlineFolder,
  MdOutlineFolderOff,
} from 'react-icons/md';
// Utils
import dateFormat from '../../../utils/dateFormat';
// Framer Motion
import { motion } from 'framer-motion';

interface BodyListaProps {
  itemsPagina: NotificationsInterface[];
  actualSection: string;
}

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 60 },
    duration: 0.1,
  },
};

export default function BodyLista({
  itemsPagina,
  actualSection,
}: Readonly<BodyListaProps>) {
  const dispatch = useAppDispatch();

  return (
    <div className="">
      <motion.ul
        className="space-y-4"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {itemsPagina.map((item, idx) => {
          const bgClass = idx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50';

          return (
            <motion.li
              id={`itemList_${item.id}`}
              key={item.id}
              className={`${bgClass} py-2 pl-2`}
              variants={itemVariants}
            >
              <div className="space-y-1">
                <p
                  className={`text-center ${
                    item.leido ? 'text-slate-500' : 'text-slate-950'
                  }`}
                >
                  {item.mensaje}
                </p>
                <div className="flex  justify-between">
                  <div className="flex-1"></div>
                  <div className="flex gap-4 flex-1 justify-center">
                    <button
                      className="text-2xl transition-all hover:scale-110"
                      onClick={(e) => {
                        const fullId =
                          e.currentTarget.parentElement?.parentElement
                            ?.parentElement?.parentElement?.id;

                        const id = fullId?.replace('itemList_', '');

                        if (id) {
                          dispatch(cambiarEstadoLeido(id));
                        }
                      }}
                    >
                      {item.leido ? <CiUnread /> : <CiRead />}
                    </button>
                    <button
                      className="text-xl transition-all hover:scale-110"
                      onClick={(e) => {
                        const fullId =
                          e.currentTarget.parentElement?.parentElement
                            ?.parentElement?.parentElement?.id;
                        const id = fullId?.replace('itemList_', '');

                        if (id) {
                          dispatch(
                            moverNotificacion({
                              id,
                              lista: actualSection === '0' ? 0 : 1,
                            })
                          );
                        }
                      }}
                    >
                      {actualSection === '0' ? (
                        <MdOutlineFolder />
                      ) : (
                        <MdOutlineFolderOff />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        const fullId =
                          e.currentTarget.parentElement?.parentElement
                            ?.parentElement?.parentElement?.id;
                        const id = fullId?.replace('itemList_', '');

                        if (id) {
                          dispatch(eliminarNotificacion(id));
                        }
                      }}
                      className="text-xl transition-all hover:scale-110 hover:text-red-500"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                  <div className="flex flex-1 justify-center">
                    <span className="text-xs lg:text-sm text-slate-500">
                      {dateFormat(item.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}
