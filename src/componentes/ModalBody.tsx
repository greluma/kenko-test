import { useState } from 'react';
import { CiRead } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { RiArchiveDrawerLine } from 'react-icons/ri';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

export interface NotificationsInterface {
  id: number;
  mensaje: string;
  leido: boolean;
  timestamp: string;
}
// ! Se puede mejorar de forma tal que se seleccionen todos o varios mensajes. Se podría crear una papelera de reciclaje

type EstadoNotificacion = 0 | 1 | 2;
// 0-Todos , 1-Leidos, 2-No Leidos

interface ModalBodyProps {
  lista: NotificationsInterface[];
}

export default function ModalBody({ lista }: Readonly<ModalBodyProps>) {
  const [estado, setEstado] = useState<EstadoNotificacion>(0);
  const handleSetEstado = (newEstado: EstadoNotificacion) => {
    setEstado(newEstado);
    setPagina(1);
  };

  const { t } = useTranslation();

  function filtrarPorEstado(
    lista: NotificationsInterface[],
    estado: EstadoNotificacion
  ) {
    if (estado === 0) return lista;
    if (estado === 1) return lista.filter((item) => item.leido);
    if (estado === 2) return lista.filter((item) => !item.leido);
    return lista;
  }

  const itemsFiltrados = filtrarPorEstado(lista, estado);
  const cantidadTotal = filtrarPorEstado(lista, 0).length;
  const cantidadLeidos = filtrarPorEstado(lista, 1).length;
  const cantidadNoLeidos = filtrarPorEstado(lista, 2).length;

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
    return fecha.toLocaleDateString('es-ES');
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
      <div className=" ">
        <ul className="space-y-4">
          {itemsPagina.map((item, idx) => {
            const bgClass = idx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50';
            return (
              <li key={item.id} className={`${bgClass} py-2 pl-2`}>
                <div className="space-y-1">
                  <p className="text-center">{item.mensaje}</p>
                  <div className="flex justify-center gap-4">
                    <button className="text-2xl transition-all hover:scale-110">
                      <CiRead />
                    </button>
                    <button className="text-xl transition-all hover:scale-110">
                      <RiArchiveDrawerLine />
                    </button>
                    <button className="text-xl transition-all hover:scale-110 hover:text-red-500">
                      <MdDeleteOutline />
                    </button>
                    <div className="absolute right-20">
                      <span className="text-xs text-slate-500">
                        {formatearFecha(item.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-center gap-2 mt-4 ">
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
    </div>
  );
}
