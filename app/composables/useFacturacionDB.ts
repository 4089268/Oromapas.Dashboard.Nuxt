import type {
  FacturacionKpis,
  FacturacionMensual,
  FacturacionPorTarifa,
  FacturacionMedicion,
  FacturacionConceptos,
  FacturacionTipoCalculo,
} from '~/types/dashboard'

export function useFacturacionDB() {
  const { aplicado } = useFiltrosDashboard()

  const queryPeriodo = computed(() => ({
    anio: aplicado.value.anio,
    mes:  aplicado.value.mes,
  }))

  const queryAnio = computed(() => ({ anio: aplicado.value.anio }))

  const { data: kpis } = useFetch<FacturacionKpis>('/api/facturacion/kpis', {
    query: queryPeriodo,
    default: (): FacturacionKpis => ({
      anio: 2024, mesDesde: 1, mesHasta: 1,
      totalUsuarios: 0, totalFacturado: 0, subtotalServicios: 0,
      totalRecargos: 0, totalIva: 0,
      totalM3Facturados: 0, totalM3Consumidos: 0, diferenciaM3: 0,
      cargoPromedioUsuario: 0, consumoPromedioM3: 0,
      totalConMedidor: 0, totalSinMedidor: 0,
      totalMedidorFuncional: 0, totalMedidorNofuncional: 0,
      pctConMedidor: 0, pctMedidorFuncional: 0,
      lecturasReales: 0, lecturasPromediadas: 0, pctLecturasReales: 0,
    })
  })

  const { data: tendencia } = useFetch<FacturacionMensual[]>('/api/facturacion/tendencia', {
    query: queryAnio,
    default: () => [] as FacturacionMensual[]
  })

  const { data: porTarifa } = useFetch<FacturacionPorTarifa[]>('/api/facturacion/tarifa', {
    query: queryPeriodo,
    default: () => [] as FacturacionPorTarifa[]
  })

  const { data: medicion } = useFetch<FacturacionMedicion>('/api/facturacion/medicion', {
    query: queryPeriodo,
    default: (): FacturacionMedicion => ({
      totalUsuarios: 0, conMedidorFuncional: 0, conMedidorNofuncional: 0,
      conMedidorTotal: 0, sinMedidor: 0,
      pctMedidorFuncional: 0, pctMedidorNofuncional: 0, pctSinMedidor: 0,
      lecturasReales: 0, lecturasPromediadas: 0,
      usuariosMedidos: 0, usuariosFijos: 0, pctLecturasReales: 0,
    })
  })

  const { data: conceptos } = useFetch<FacturacionConceptos>('/api/facturacion/conceptos', {
    query: queryPeriodo,
    default: (): FacturacionConceptos => ({
      agua: 0, drenaje: 0, saneamiento: 0, otros: 0,
      recargos: 0, iva: 0, subtotalServicios: 0, totalFacturado: 0,
    })
  })

  const { data: tipoCalculo } = useFetch<FacturacionTipoCalculo[]>('/api/facturacion/tipocalculo', {
    query: queryPeriodo,
    default: () => [] as FacturacionTipoCalculo[]
  })

  return { kpis, tendencia, porTarifa, medicion, conceptos, tipoCalculo }
}
