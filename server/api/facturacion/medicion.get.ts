import sql from 'mssql'
import type { FacturacionMedicion } from '~/types/dashboard'

export default defineEventHandler(async (event): Promise<FacturacionMedicion> => {
  const q      = getQuery(event)
  const anio   = parseInt(String(q.anio ?? new Date().getFullYear()))
  const mes    = q.mes    ? parseInt(String(q.mes))    : null
  const mesFin = q.mesFin ? parseInt(String(q.mesFin)) : null

  const db = await getDb()
  const { recordset } = await db.request()
    .input('Anio',   sql.Int, anio)
    .input('Mes',    sql.Int, mes)
    .input('MesFin', sql.Int, mesFin)
    .execute('Dashboard.SP_Dashboard_Facturacion_Medicion')

  const r = recordset[0]
  return {
    totalUsuarios:          r.total_usuarios,
    conMedidorFuncional:    r.con_medidor_funcional,
    conMedidorNofuncional:  r.con_medidor_nofuncional,
    conMedidorTotal:        r.con_medidor_total,
    sinMedidor:             r.sin_medidor,
    pctMedidorFuncional:    r.pct_medidor_funcional,
    pctMedidorNofuncional:  r.pct_medidor_nofuncional,
    pctSinMedidor:          r.pct_sin_medidor,
    lecturasReales:         r.lecturas_reales,
    lecturasPromediadas:    r.lecturas_promediadas,
    usuariosMedidos:        r.usuarios_medidos,
    usuariosFijos:          r.usuarios_fijos,
    pctLecturasReales:      r.pct_lecturas_reales,
  }
})
