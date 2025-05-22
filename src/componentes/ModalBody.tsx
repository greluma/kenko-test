import { useEffect, useState } from 'react';
import { CiRead } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineFolder } from 'react-icons/md';
import { MdOutlineFolderOff } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { CiUnread } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../store/hooks';
import {
  cambiarEstadoLeido,
  eliminarNotificacion,
  moverNotificacion,
} from '../features/globalSlice';

export interface NotificationsInterface {
  id: number;
  mensaje: string;
  leido: boolean;
  timestamp: string;
}

type EstadoNotificacion = 0 | 1 | 2;
// 0-Todos , 1-Leidos, 2-No Leidos

interface ModalBodyProps {
  listaDeNotif: NotificationsInterface[];
  actualSection: string;
}

export default function ModalBody({
  listaDeNotif,
  actualSection,
}: Readonly<ModalBodyProps>) {
  const [estado, setEstado] = useState<EstadoNotificacion>(0);
  const handleSetEstado = (newEstado: EstadoNotificacion) => {
    setEstado(newEstado);
    setPagina(1);
  };

  useEffect(() => {
    setPagina(1);
  }, [actualSection]);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  function filtrarPorEstado(
    lista: NotificationsInterface[],
    estado: EstadoNotificacion
  ) {
    if (estado === 0) return lista;
    if (estado === 1) return lista.filter((item) => item.leido);
    if (estado === 2) return lista.filter((item) => !item.leido);
    return lista;
  }

  const itemsFiltrados = filtrarPorEstado(listaDeNotif, estado);
  const cantidadTotal = filtrarPorEstado(listaDeNotif, 0).length;
  const cantidadLeidos = filtrarPorEstado(listaDeNotif, 1).length;
  const cantidadNoLeidos = filtrarPorEstado(listaDeNotif, 2).length;

  // Paginación
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;
  const totalPaginas = Math.ceil(itemsFiltrados.length / porPagina);

  const handleAnterior = () => setPagina((p) => Math.max(1, p - 1));
  const handleSiguiente = () => setPagina((p) => Math.min(totalPaginas, p + 1));

  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;
  const itemsPagina = itemsFiltrados.slice(inicio, fin);

  function formatearFecha(timestamp: string) {
    const fecha = new Date(timestamp);
    const hora = fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dia = fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
    return `${hora} - ${dia}`;
  }

  return (
    <div className="px-2 ">
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => handleSetEstado(0)}
          className={`my-4 py-0.5 rounded-md px-3 text-center   max-w-fit text-sm ${
            estado === 0
              ? 'border-slate-900 text-slate-900 border-2 font-semibold'
              : 'border-slate-500 text-slate-500 border font-normal'
          }`}
        >
          {t('modalState.all')}: {cantidadTotal}
        </button>
        <button
          onClick={() => handleSetEstado(2)}
          className={`my-4 py-0.5 rounded-md px-3 text-center border  max-w-fit text-sm ${
            estado === 2
              ? 'border-slate-900 text-slate-900 border-2 font-semibold'
              : 'border-slate-500 text-slate-500 border font-normal'
          }`}
        >
          {t('modalState.unread')}: {cantidadNoLeidos}
        </button>
        <button
          onClick={() => handleSetEstado(1)}
          className={`my-4 py-0.5 rounded-md px-3 text-center border  max-w-fit text-sm ${
            estado === 1
              ? 'border-slate-900 text-slate-900 border-2 font-semibold'
              : 'border-slate-500 text-slate-500 border font-normal'
          }`}
        >
          {t('modalState.read')}: {cantidadLeidos}
        </button>
      </div>
      {itemsFiltrados.length === 0 ? (
        <div className="grid  mt-20 text-center">
          <p className="text-slate-700 text-lg w-2/3 mx-auto">
            {t('noNotifications')}
          </p>
        </div>
      ) : (
        <div className=" ">
          <ul className="space-y-4">
            {itemsPagina.map((item, idx) => {
              const bgClass = idx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50';

              return (
                <li
                  id={`itemList_${item.id}`}
                  key={item.id}
                  className={`${bgClass} py-2 pl-2`}
                >
                  <div className="space-y-1">
                    <p
                      className={`text-center ${
                        item.leido ? 'text-slate-500' : 'text-slate-950'
                      }`}
                    >
                      {item.mensaje}
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        className="text-2xl transition-all hover:scale-110"
                        onClick={(e) => {
                          const fullId =
                            e.currentTarget.parentElement?.parentElement
                              ?.parentElement?.id;
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
                              ?.parentElement?.id;
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
                              ?.parentElement?.id;
                          const id = fullId?.replace('itemList_', '');

                          if (id) {
                            dispatch(eliminarNotificacion(id));
                          }
                        }}
                        className="text-xl transition-all hover:scale-110 hover:text-red-500"
                      >
                        <MdDeleteOutline />
                      </button>
                      <div className="absolute right-2 lg:right-20">
                        <span className="text-xs lg:text-sm text-slate-500">
                          {formatearFecha(item.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center gap-2 my-1 py-1 bg-slate-50">
            <button
              onClick={handleAnterior}
              disabled={pagina === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              <IoIosArrowBack />
            </button>
            <span className="px-2 py-1">
              {pagina} / {totalPaginas}
            </span>
            <button
              onClick={handleSiguiente}
              disabled={pagina === totalPaginas}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
