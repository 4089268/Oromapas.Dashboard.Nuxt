import type { OrdenTrabajo, KpiOrdenes } from '~/types/dashboard'

export function useOrdenesTrabajo() {
  const { aplicado } = useFiltrosDashboard()

  const query = computed(() => {
    const f = aplicado.value
    const q: Record<string, string> = { periodo: f.periodo }
    if (f.periodo === 'mes') {
      q.mes = f.mes
      q.anio = f.anio
    } else {
      if (f.fechaInicio) q.fechaInicio = f.fechaInicio
      if (f.fechaFin) q.fechaFin = f.fechaFin
    }
    if (f.tipo !== 'todos') q.tipo = f.tipo
    return q
  })

  const { data: ordenes } = useFetch<OrdenTrabajo[]>('/api/ordenes', {
    query,
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
