import sql from 'mssql'
import type { RecaudacionPorTarifa } from '~/types/dashboard'

export default defineEventHandler(async (event): Promise<RecaudacionPorTarifa[]> => {
  const q    = getQuery(event)
  const anio = parseInt(String(q.anio ?? new Date().getFullYear()))
  const mes  = q.mes    ? parseInt(String(q.mes))    : null
  const mesFin = q.mesFin ? parseInt(String(q.mesFin)) : null

  const db = await getDb()
  const { recordset } = await db.request()
    .input('Anio',   sql.Int, anio)
    .input('Mes',    sql.Int, mes)
    .input('MesFin', sql.Int, mesFin)
    .execute('Dashboard.SP_Dashboard_Recaudacion_PorTarifa')

  return recordset.map(r => ({
    idTarifa:       r.id_tarifa,
    tarifa:         r.tarifa,
    totalRecibos:   r.total_recibos,
    totalRecaudado: r.total_recaudado,
    pctMorosidad:   r.pct_morosidad,
  }))
})
