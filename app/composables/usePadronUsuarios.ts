import type { Usuario, KpiPadron } from '~/types/dashboard'

export function usePadronUsuarios() {
  const { data: usuarios } = useFetch<Usuario[]>('/api/padron', {
    default: () => [] as Usuario[]
  })

  const kpi = computed<KpiPadron>(() => {
    const list = usuarios.value
    const activos = list.filter(u => u.estado === 'activo').length
    return {
      totalRegistrados: list.length,
      totalActivos: activos,
      totalInactivos: list.filter(u => u.estado === 'inactivo').length,
      totalSuspendidos: list.filter(u => u.estado === 'suspendido').length,
      porcentajeActivos: list.length > 0 ? (activos / list.length) * 100 : 0
    }
  })

  return { usuarios, kpi }
}
