import sql from 'mssql'
import type { VencidosMensual } from '~/types/dashboard'

export default defineEventHandler(async (event): Promise<VencidosMensual[]> => {
  const q    = getQuery(event)
  const anio = parseInt(String(q.anio ?? new Date().getFullYear()))

  const db = await getDb()
  const { recordset } = await db.request()
    .input('Anio', sql.Int, anio)
    .execute('Dashboard.SP_Dashboard_Recaudacion_Vencidos')

  return recordset.map(r => ({
    mes:                r.mes,
    recibosRecuperados: r.recibos_recuperados,
    montoNeto:          r.monto_neto,
    iva:                r.iva,
    totalRecuperado:    r.total_recuperado,
  }))
})
