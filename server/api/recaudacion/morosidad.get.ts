import sql from 'mssql'
import type { RecaudacionMorosidad } from '~/types/dashboard'

export default defineEventHandler(async (event): Promise<RecaudacionMorosidad> => {
  const q    = getQuery(event)
  const anio = parseInt(String(q.anio ?? new Date().getFullYear()))
  const mes  = q.mes    ? parseInt(String(q.mes))    : null
  const mesFin = q.mesFin ? parseInt(String(q.mesFin)) : null

  const db = await getDb()
  const { recordset } = await db.request()
    .input('Anio',   sql.Int, anio)
    .input('Mes',    sql.Int, mes)
    .input('MesFin', sql.Int, mesFin)
    .execute('Dashboard.SP_Dashboard_Recaudacion_Morosidad')

  const r = recordset[0]
  return {
    corriente:           r.corriente,
    atraso1Mes:          r.atraso_1_mes,
    atraso2Meses:        r.atraso_2_meses,
    atraso3Meses:        r.atraso_3_meses,
    atraso4MasMeses:     r.atraso_4_mas_meses,
    totalRecibosCartera: r.total_recibos_cartera,
    pctCorriente:        r.pct_corriente,
    pctMorosos:          r.pct_morosos,
  }
})
