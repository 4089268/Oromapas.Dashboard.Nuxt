import sql from 'mssql'
import type { RecaudacionMensual } from '~/types/dashboard'

export default defineEventHandler(async (event): Promise<RecaudacionMensual[]> => {
  const q    = getQuery(event)
  const anio = parseInt(String(q.anio ?? new Date().getFullYear()))

  const db = await getDb()
  const { recordset } = await db.request()
    .input('Anio', sql.Int, anio)
    .execute('Dashboard.SP_Dashboard_Recaudacion_Tendencia')

  return recordset.map(r => ({
    mes:                  r.mes,
    totalRecibos:         r.total_recibos,
    subtotalServicios:    r.subtotal_servicios,
    totalRecargos:        r.total_recargos,
    totalIva:             r.total_iva,
    totalRecaudado:       r.total_recaudado,
    recuperacionVencidos: r.recuperacion_vencidos,
  }))
})
