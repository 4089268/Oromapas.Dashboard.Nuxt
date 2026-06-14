import sql from 'mssql'
import type { FacturacionTipoCalculo } from '~/types/dashboard'

export default defineEventHandler(async (event): Promise<FacturacionTipoCalculo[]> => {
  const q      = getQuery(event)
  const anio   = parseInt(String(q.anio ?? new Date().getFullYear()))
  const mes    = q.mes    ? parseInt(String(q.mes))    : null
  const mesFin = q.mesFin ? parseInt(String(q.mesFin)) : null

  const db = await getDb()
  const { recordset } = await db.request()
    .input('Anio',   sql.Int, anio)
    .input('Mes',    sql.Int, mes)
    .input('MesFin', sql.Int, mesFin)
    .execute('Dashboard.SP_Dashboard_Facturacion_TipoCalculo')

  return recordset.map(r => ({
    idTipoCalculado:   r.id_tipocalculado,
    tipo:              r.tipo,
    totalUsuarios:     r.total_usuarios,
    totalM3Facturados: r.total_m3_facturados,
    totalM3Consumidos: r.total_m3_consumidos,
    totalFacturado:    r.total_facturado,
    pctUsuarios:       r.pct_usuarios,
    pctM3:             r.pct_m3,
  }))
})
