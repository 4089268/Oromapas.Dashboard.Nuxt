import sql from 'mssql'
import type { FacturacionConceptos } from '~/types/dashboard'

export default defineEventHandler(async (event): Promise<FacturacionConceptos> => {
  const q      = getQuery(event)
  const anio   = parseInt(String(q.anio ?? new Date().getFullYear()))
  const mes    = q.mes    ? parseInt(String(q.mes))    : null
  const mesFin = q.mesFin ? parseInt(String(q.mesFin)) : null

  const db = await getDb()
  const { recordset } = await db.request()
    .input('Anio',   sql.Int, anio)
    .input('Mes',    sql.Int, mes)
    .input('MesFin', sql.Int, mesFin)
    .execute('Dashboard.SP_Dashboard_Facturacion_Conceptos')

  const r = recordset[0]
  return {
    agua:               r.agua,
    drenaje:            r.drenaje,
    saneamiento:        r.saneamiento,
    otros:              r.otros,
    recargos:           r.recargos,
    iva:                r.iva,
    subtotalServicios:  r.subtotal_servicios,
    totalFacturado:     r.total_facturado,
  }
})
