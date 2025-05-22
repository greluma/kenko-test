import { useEffect, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import BodyFilters from './BodyFilters';
import BodyLista from './BodyLista';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
}: Readonly<ModalBodyProps>) {
  const [estado, setEstado] = useState<EstadoNotificacion>(0);
  const [pagina, setPagina] = useState(1);
  const { t } = useTranslation();

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
  const porPagina = 5;
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
    <div className="px-2 ">
      <BodyFilters
        handleSetEstado={handleSetEstado}
        estado={estado}
        totales={{ cantidadTotal, cantidadNoLeidos, cantidadLeidos }}
      />
      {itemsFiltrados.length === 0 ? (
        <div className="grid  mt-20 text-center">
          <p className="text-slate-700 text-lg w-2/3 mx-auto">
            {t('noNotifications')}
          </p>
        </div>
      ) : (
        <BodyLista itemsPagina={itemsPagina} actualSection={actualSection} />
      )}
      {/* Pagination */}
      <div className="flex justify-center gap-2 my-4 py-1 bg-slate-50 ">
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
  );
}
