import sql from 'mssql'
import type { FacturacionPorTarifa } from '~/types/dashboard'

export default defineEventHandler(async (event): Promise<FacturacionPorTarifa[]> => {
  const q      = getQuery(event)
  const anio   = parseInt(String(q.anio ?? new Date().getFullYear()))
  const mes    = q.mes    ? parseInt(String(q.mes))    : null
  const mesFin = q.mesFin ? parseInt(String(q.mesFin)) : null

  const db = await getDb()
  const { recordset } = await db.request()
    .input('Anio',   sql.Int, anio)
    .input('Mes',    sql.Int, mes)
    .input('MesFin', sql.Int, mesFin)
    .execute('Dashboard.SP_Dashboard_Facturacion_PorTarifa')

  return recordset.map(r => ({
    idTarifa:            r.id_tarifa,
    tarifa:              r.tarifa,
    totalUsuarios:       r.total_usuarios,
    totalM3Facturados:   r.total_m3_facturados,
    totalM3Consumidos:   r.total_m3_consumidos,
    totalFacturado:      r.total_facturado,
    cargoPromedioUsuario: r.cargo_promedio_usuario,
    consumoPromedioM3:   r.consumo_promedio_m3,
    pctUsuarios:         r.pct_usuarios,
    pctFacturado:        r.pct_facturado,
  }))
})
