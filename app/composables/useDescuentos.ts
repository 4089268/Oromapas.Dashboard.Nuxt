import type { Descuento, KpiDescuentos } from '~/types/dashboard'

export function useDescuentos() {
  const { data: descuentos } = useFetch<Descuento[]>('/api/descuentos', {
    default: () => [] as Descuento[]
  })

  const kpi = computed<KpiDescuentos>(() => ({
    totalMonto: descuentos.value.reduce((s, d) => s + d.monto, 0),
    totalFacturas: descuentos.value.reduce((s, d) => s + d.facturas, 0),
    porTipo: descuentos.value
  }))

  return { descuentos, kpi }
}
