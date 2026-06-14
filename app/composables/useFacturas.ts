import type { Factura, KpiFacturas } from '~/types/dashboard'

export function useFacturas() {
  const { aplicado } = useFiltrosDashboard()

  const query = computed(() => {
    const f = aplicado.value
    const q: Record<string, string> = { mes: f.mes, anio: f.anio }
    if (f.estado !== 'todos') q.estado = f.estado
    return q
  })

  const { data: facturas } = useFetch<Factura[]>('/api/facturas', {
    query,
    default: () => [] as Factura[]
  })

  const kpi = computed<KpiFacturas>(() => {
    const list = facturas.value
    return {
      totalEmitidas: list.length,
      totalPagadas: list.filter(f => f.estado === 'pagada').length,
      totalPendientes: list.filter(f => f.estado === 'pendiente').length,
      totalVencidas: list.filter(f => f.estado === 'vencida').length,
      montoPagado: list.filter(f => f.estado === 'pagada').reduce((s, f) => s + f.total, 0),
      montoPendiente: list.filter(f => f.estado === 'pendiente').reduce((s, f) => s + f.total, 0)
    }
  })

  return { facturas, kpi }
}
