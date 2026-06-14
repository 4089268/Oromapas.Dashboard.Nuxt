import sql from 'mssql'
import type { Ingreso } from '~/types/dashboard'

const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

export default defineEventHandler(async (event): Promise<Ingreso[]> => {
  const q    = getQuery(event)
  const anio = parseInt(String(q.anio ?? new Date().getFullYear()))

  const db = await getDb()
  const { recordset } = await db.request()
    .input('Anio', sql.Int, anio)
    .execute('Dashboard.SP_Dashboard_Recaudacion_Tendencia')

  return recordset.map(r => ({
    id:    String(r.mes),
    mes:   `${MESES[r.mes - 1]} ${anio}`,
    anio,
    total: r.total_recaudado,
    categorias: {
      tarifas:       r.subtotal_servicios,
      reconexiones:  r.recuperacion_vencidos,
      multas:        r.total_recargos + r.total_iva,
    },
  }))
})
