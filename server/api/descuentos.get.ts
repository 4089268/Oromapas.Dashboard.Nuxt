import type { Descuento } from '~/types/dashboard'

export default defineEventHandler((): Descuento[] => {
  return [
    { id: '1', tipo: 'Adulto Mayor', porcentaje: 30, monto: 42_500, facturas: 187 },
    { id: '2', tipo: 'Personas con Discapacidad', porcentaje: 30, monto: 18_900, facturas: 83 },
    { id: '3', tipo: 'Pronto Pago (10 días)', porcentaje: 10, monto: 35_200, facturas: 412 },
    { id: '4', tipo: 'Instituciones Educativas', porcentaje: 100, monto: 28_600, facturas: 24 },
    { id: '5', tipo: 'Convenio Social', porcentaje: 50, monto: 15_800, facturas: 96 }
  ]
})
