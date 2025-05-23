import { useEffect, useState, useMemo, useCallback } from 'react';
import BodyFilters from './BodyFilters';
import BodyLista from './BodyLista';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import NoMensajes from './NoMensajes';
import usePorPagina from '../../../customHooks/usePorPagina';

export interface NotificationsInterface {
  id: number;
  mensaje: string;
  leido: boolean;
  timestamp: string;
}

export type EstadoNotificacion = 0 | 1 | 2;

interface ModalBodyProps {
  listaDeNotif: NotificationsInterface[];
  actualSection: string;
  isFullOpen: boolean;
}

// Función fuera del componente
function filtrarPorEstado(
  lista: NotificationsInterface[],
  estado: EstadoNotificacion
) {
  if (estado === 0) return lista;
  if (estado === 1) return lista.filter((item) => item.leido);
  if (estado === 2) return lista.filter((item) => !item.leido);
  return lista;
}

export default function ModalBody({
  listaDeNotif,
  actualSection,
  isFullOpen,
}: Readonly<ModalBodyProps>) {
  const [estado, setEstado] = useState<EstadoNotificacion>(0);
  const [pagina, setPagina] = useState(1);

  const handleSetEstado = useCallback((newEstado: EstadoNotificacion) => {
    setEstado(newEstado);
    setPagina(1);
  }, []);

  useEffect(() => {
    setPagina(1);
  }, [actualSection]);

  // Memoiza los valores derivados
  const { itemsFiltrados, cantidadTotal, cantidadLeidos, cantidadNoLeidos } =
    useMemo(() => {
      const total = listaDeNotif.length;
      let leidos = 0;
      let noLeidos = 0;
      listaDeNotif.forEach((item) => {
        if (item.leido) leidos++;
        else noLeidos++;
      });
      const filtrados = filtrarPorEstado(listaDeNotif, estado);
      return {
        itemsFiltrados: filtrados,
        cantidadTotal: total,
        cantidadLeidos: leidos,
        cantidadNoLeidos: noLeidos,
      };
    }, [listaDeNotif, estado]);

  // Paginación
  const porPagina = usePorPagina(isFullOpen);
  const totalPaginas = Math.max(
    1,
    Math.ceil(itemsFiltrados.length / porPagina)
  );
  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;
  const itemsPagina = useMemo(
    () => itemsFiltrados.slice(inicio, fin),
    [itemsFiltrados, inicio, fin]
  );

  const handleAnterior = useCallback(
    () => setPagina((p) => Math.max(1, p - 1)),
    []
  );
  const handleSiguiente = useCallback(
    () => setPagina((p) => Math.min(totalPaginas, p + 1)),
    [totalPaginas]
  );

  return (
    <div className="px-2 pb-2 sm:rounded-b-md grid  grid-rows-[auto_1fr_auto]">
      <BodyFilters
        handleSetEstado={handleSetEstado}
        estado={estado}
        totales={{ cantidadTotal, cantidadNoLeidos, cantidadLeidos }}
      />
      <div className=" grid">
        {itemsFiltrados.length === 0 ? (
          <NoMensajes />
        ) : (
          <BodyLista
            itemsPagina={itemsPagina}
            actualSection={actualSection}
            isFullOpen={isFullOpen}
          />
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center gap-2  bg-slate-50 ">
        <button
          onClick={handleAnterior}
          disabled={pagina === 1}
          className={`px-2 py-1  border rounded disabled:opacity-50 ${
            pagina === 1 ? '' : 'cursor-pointer'
          }`}
        >
          <IoIosArrowBack />
        </button>
        <span className="px-2 py-1">
          {pagina} / {totalPaginas}
        </span>
        <button
          onClick={handleSiguiente}
          disabled={pagina === totalPaginas}
          className={`px-2 py-1  border rounded disabled:opacity-50 ${
            pagina === totalPaginas ? '' : 'cursor-pointer'
          }`}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}
