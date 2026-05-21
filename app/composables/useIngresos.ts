import type { Ingreso, KpiIngresos } from '~/types/dashboard'

export function useIngresos() {
  const { data: ingresos } = useFetch<Ingreso[]>('/api/ingresos', {
    default: () => [] as Ingreso[]
  })

  const kpi = computed<KpiIngresos>(() => {
    const list = ingresos.value
    if (list.length < 2) return { totalMes: 0, totalAnio: 0, variacionMensual: 0, tendencia: [] }
    const ultimo = list.at(-1)!
    const anterior = list.at(-2)!
    return {
      totalMes: ultimo.total,
      totalAnio: list.filter(i => i.anio === 2025).reduce((acc, i) => acc + i.total, 0),
      variacionMensual: ((ultimo.total - anterior.total) / anterior.total) * 100,
      tendencia: list
    }
  })

  return { ingresos, kpi }
}
