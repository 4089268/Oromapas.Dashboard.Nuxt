import sql from 'mssql'
import type { FacturacionKpis } from '~/types/dashboard'

export default defineEventHandler(async (event): Promise<FacturacionKpis> => {
  const q      = getQuery(event)
  const anio   = parseInt(String(q.anio ?? new Date().getFullYear()))
  const mes    = q.mes    ? parseInt(String(q.mes))    : null
  const mesFin = q.mesFin ? parseInt(String(q.mesFin)) : null

  const db = await getDb()
  const { recordset } = await db.request()
    .input('Anio',   sql.Int, anio)
    .input('Mes',    sql.Int, mes)
    .input('MesFin', sql.Int, mesFin)
    .execute('Dashboard.SP_Dashboard_Facturacion_KPIs')

  const r = recordset[0]
  return {
    anio:                    r.anio,
    mesDesde:                r.mes_desde,
    mesHasta:                r.mes_hasta,
    totalUsuarios:           r.total_usuarios,
    totalFacturado:          r.total_facturado,
    subtotalServicios:       r.subtotal_servicios,
    totalRecargos:           r.total_recargos,
    totalIva:                r.total_iva,
    totalM3Facturados:       r.total_m3_facturados,
    totalM3Consumidos:       r.total_m3_consumidos,
    diferenciaM3:            r.diferencia_m3,
    cargoPromedioUsuario:    r.cargo_promedio_usuario,
    consumoPromedioM3:       r.consumo_promedio_m3,
    totalConMedidor:         r.total_con_medidor,
    totalSinMedidor:         r.total_sin_medidor,
    totalMedidorFuncional:   r.total_medidor_funcional,
    totalMedidorNofuncional: r.total_medidor_nofuncional,
    pctConMedidor:           r.pct_con_medidor,
    pctMedidorFuncional:     r.pct_medidor_funcional,
    lecturasReales:          r.lecturas_reales,
    lecturasPromediadas:     r.lecturas_promediadas,
    pctLecturasReales:       r.pct_lecturas_reales,
  }
})
