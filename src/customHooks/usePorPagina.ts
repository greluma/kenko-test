import { useEffect, useState } from 'react';

export default function usePorPagina(isFullOpen: boolean) {
  const [porPagina, setPorPagina] = useState(10);

  useEffect(() => {
    function updatePorPagina() {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        // lg
        setPorPagina(isFullOpen ? 15 : 10);
      } else if (window.matchMedia('(min-width: 768px)').matches) {
        // md
        setPorPagina(10);
      } else {
        // sm
        setPorPagina(6);
      }
    }
    updatePorPagina();
    window.addEventListener('resize', updatePorPagina);
    return () => window.removeEventListener('resize', updatePorPagina);
  }, [isFullOpen]);

  return porPagina;
}
