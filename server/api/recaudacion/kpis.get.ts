import sql from 'mssql'
import type { RecaudacionKpis } from '~/types/dashboard'

export default defineEventHandler(async (event): Promise<RecaudacionKpis> => {
  const q    = getQuery(event)
  const anio = parseInt(String(q.anio ?? new Date().getFullYear()))
  const mes  = q.mes ? parseInt(String(q.mes)) : null

  const db = await getDb()
  const req = db.request()
    .input('Anio', sql.Int, anio)
    .input('Mes',  sql.Int, mes)

  const { recordset } = await req.execute('Dashboard.SP_Dashboard_Recaudacion_KPIs')
  const r = recordset[0]

  return {
    anio:                 r.anio,
    mesDesde:             r.mes_desde,
    mesHasta:             r.mes_hasta,
    totalRecibos:         r.total_recibos,
    subtotalServicios:    r.subtotal_servicios,
    totalRecargos:        r.total_recargos,
    totalIva:             r.total_iva,
    totalRecaudado:       r.total_recaudado,
    recuperacionVencidos: r.recuperacion_vencidos,
    recibosCorrientes:    r.recibos_corrientes,
    recibosAtraso1:       r.recibos_atraso_1,
    recibosAtraso2:       r.recibos_atraso_2,
    recibosAtraso3:       r.recibos_atraso_3,
    recibosAtraso4mas:    r.recibos_atraso_4mas,
    recibosMorosos:       r.recibos_morosos,
    pctMorosidad:         r.pct_morosidad,
    pctAlCorriente:       r.pct_al_corriente,
  }
})
