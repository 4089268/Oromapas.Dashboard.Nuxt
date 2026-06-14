import type {
  RecaudacionKpis,
  RecaudacionMensual,
  RecaudacionConceptos,
  RecaudacionPorTarifa,
  RecaudacionMorosidad,
  VencidosMensual
} from '~/types/dashboard'

export function useRecaudacion() {
  const { aplicado } = useFiltrosDashboard()

  const queryPeriodo = computed(() => {
    const f = aplicado.value
    return { anio: f.anio, mes: f.mes }
  })

  const queryAnio = computed(() => ({ anio: aplicado.value.anio }))

  const { data: kpis } = useFetch<RecaudacionKpis>('/api/recaudacion/kpis', {
    query: queryPeriodo,
    default: (): RecaudacionKpis => ({
      anio: 2024, mesDesde: 1, mesHasta: 1,
      totalRecibos: 0, subtotalServicios: 0, totalRecargos: 0, totalIva: 0,
      totalRecaudado: 0, recuperacionVencidos: 0,
      recibosCorrientes: 0, recibosAtraso1: 0, recibosAtraso2: 0,
      recibosAtraso3: 0, recibosAtraso4mas: 0, recibosMorosos: 0,
      pctMorosidad: 0, pctAlCorriente: 0
    })
  })

  const { data: tendencia } = useFetch<RecaudacionMensual[]>('/api/recaudacion/tendencia', {
    query: queryAnio,
    default: () => [] as RecaudacionMensual[]
  })

  const { data: conceptos } = useFetch<RecaudacionConceptos>('/api/recaudacion/conceptos', {
    query: queryPeriodo,
    default: (): RecaudacionConceptos => ({
      agua: 0, drenaje: 0, saneamiento: 0, otros: 0, recargos: 0, iva: 0, recuperacionVencidosNeto: 0
    })
  })

  const { data: porTarifa } = useFetch<RecaudacionPorTarifa[]>('/api/recaudacion/tarifa', {
    query: queryPeriodo,
    default: () => [] as RecaudacionPorTarifa[]
  })

  const { data: morosidad } = useFetch<RecaudacionMorosidad>('/api/recaudacion/morosidad', {
    query: queryPeriodo,
    default: (): RecaudacionMorosidad => ({
      corriente: 0, atraso1Mes: 0, atraso2Meses: 0, atraso3Meses: 0,
      atraso4MasMeses: 0, totalRecibosCartera: 0, pctCorriente: 0, pctMorosos: 0
    })
  })

  const { data: vencidos } = useFetch<VencidosMensual[]>('/api/recaudacion/vencidos', {
    query: queryAnio,
    default: () => [] as VencidosMensual[]
  })

  return { kpis, tendencia, conceptos, porTarifa, morosidad, vencidos }
}
