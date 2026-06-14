export interface FiltrosDashboard {
  mes: string
  anio: string
  estado: string
  tipo: string
}

const MESES_LABEL: Record<string, string> = {
  '01': 'enero',   '02': 'febrero',   '03': 'marzo',
  '04': 'abril',   '05': 'mayo',      '06': 'junio',
  '07': 'julio',   '08': 'agosto',    '09': 'septiembre',
  '10': 'octubre', '11': 'noviembre', '12': 'diciembre'
}

const defaultFiltros = (): FiltrosDashboard => ({
  mes: '01',
  anio: '2024',
  estado: 'todos',
  tipo: 'todos'
})

export function useFiltrosDashboard() {
  const pendiente = useState<FiltrosDashboard>('filtros-pendiente', defaultFiltros)
  const aplicado  = useState<FiltrosDashboard>('filtros-aplicado',  defaultFiltros)

  const subtituloPeriodo = computed(() => {
    const f = aplicado.value
    return `Resumen de ${MESES_LABEL[f.mes] ?? f.mes} ${f.anio}`
  })

  function aplicar() {
    aplicado.value = { ...pendiente.value }
  }

  function limpiar() {
    const d = defaultFiltros()
    pendiente.value = { ...d }
    aplicado.value  = { ...d }
  }

  return { pendiente, aplicado, subtituloPeriodo, aplicar, limpiar }
}
