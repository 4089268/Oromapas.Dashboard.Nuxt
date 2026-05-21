import type { OrdenTrabajo, KpiOrdenes } from '~/types/dashboard'

export function useOrdenesTrabajo() {
  const { data: ordenes } = useFetch<OrdenTrabajo[]>('/api/ordenes', {
    default: () => [] as OrdenTrabajo[]
  })

  const kpi = computed<KpiOrdenes>(() => {
    const list = ordenes.value
    return {
      totalAbiertas: list.filter(o => o.estado === 'abierta').length,
      totalEnProceso: list.filter(o => o.estado === 'en_proceso').length,
      totalCompletadas: list.filter(o => o.estado === 'completada').length,
      totalMes: list.length,
      tiempoPromedioHoras: 18
    }
  })

  return { ordenes, kpi }
}
