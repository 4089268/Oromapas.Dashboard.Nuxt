import sql from 'mssql'
import type { FacturacionMensual } from '~/types/dashboard'

export default defineEventHandler(async (event): Promise<FacturacionMensual[]> => {
  const q    = getQuery(event)
  const anio = parseInt(String(q.anio ?? new Date().getFullYear()))

  const db = await getDb()
  const { recordset } = await db.request()
    .input('Anio', sql.Int, anio)
    .execute('Dashboard.SP_Dashboard_Facturacion_Tendencia')

  return recordset.map(r => ({
    mes:                   r.mes,
    totalUsuarios:         r.total_usuarios,
    totalM3Facturados:     r.total_m3_facturados,
    totalM3Consumidos:     r.total_m3_consumidos,
    subtotalServicios:     r.subtotal_servicios,
    totalRecargos:         r.total_recargos,
    totalIva:              r.total_iva,
    totalFacturado:        r.total_facturado,
    cargoPromedioUsuario:  r.cargo_promedio_usuario,
  }))
})
