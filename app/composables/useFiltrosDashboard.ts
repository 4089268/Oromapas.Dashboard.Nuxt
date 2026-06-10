export interface FiltrosDashboard {
  periodo: 'mes' | 'periodo'
  mes: string
  anio: string
  fechaInicio: string
  fechaFin: string
  estado: string
  tipo: string
}

const MESES_LABEL: Record<string, string> = {
  '01': 'enero',
  '02': 'febrero',
  '03': 'marzo',
  '04': 'abril',
  '05': 'mayo',
  '06': 'junio', 
  '07': 'julio',
  '08': 'agosto',
  '09': 'septiembre',
  '10': 'octubre',
  '11': 'noviembre',
  '12': 'diciembre'
}

const defaultFiltros = (): FiltrosDashboard => ({
  periodo: 'mes',
  mes: '01',
  anio: '2026',
  fechaInicio: '2026-01-01',
  fechaFin: '2026-01-31',
  estado: 'todos',
  tipo: 'todos'
})

export function useFiltrosDashboard() {
  const pendiente = useState<FiltrosDashboard>('filtros-pendiente', defaultFiltros)
  const aplicado = useState<FiltrosDashboard>('filtros-aplicado', defaultFiltros)

  const esPeriodo = computed(() => pendiente.value.periodo === 'periodo')

  const subtituloPeriodo = computed(() => {
    const f = aplicado.value
    if (f.periodo === 'mes') return `Resumen de ${MESES_LABEL[f.mes] ?? f.mes} ${f.anio}`
    if (f.fechaInicio && f.fechaFin) return `Del ${f.fechaInicio} al ${f.fechaFin}`
    return 'Período personalizado'
  })

  function aplicar() {
    aplicado.value = { ...pendiente.value }
  }

  function limpiar() {
    const d = defaultFiltros()
    pendiente.value = { ...d }
    aplicado.value = { ...d }
  }

  return { pendiente, aplicado, esPeriodo, subtituloPeriodo, aplicar, limpiar }
}
