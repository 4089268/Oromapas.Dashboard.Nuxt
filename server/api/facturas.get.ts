import type { Factura } from '~/types/dashboard'

export default defineEventHandler((): Factura[] => {
  return [
    { id: '1', folio: 'FAC-2025-00421', usuario: 'María González López', cuenta: 'DOM-001234', monto: 285, descuento: 0, total: 285, estado: 'pagada', fechaEmision: '2025-05-01', fechaVencimiento: '2025-05-20', fechaPago: '2025-05-10' },
    { id: '2', folio: 'FAC-2025-00422', usuario: 'Carlos Hernández Ruiz', cuenta: 'DOM-005678', monto: 340, descuento: 34, total: 306, estado: 'pagada', fechaEmision: '2025-05-01', fechaVencimiento: '2025-05-20', fechaPago: '2025-05-08' },
    { id: '3', folio: 'FAC-2025-00423', usuario: 'Farmacia San Juan S.A.', cuenta: 'COM-000892', monto: 1_250, descuento: 0, total: 1_250, estado: 'pendiente', fechaEmision: '2025-05-01', fechaVencimiento: '2025-05-25' },
    { id: '4', folio: 'FAC-2025-00424', usuario: 'Roberto Martínez Soto', cuenta: 'DOM-009012', monto: 195, descuento: 58.5, total: 136.5, estado: 'pendiente', fechaEmision: '2025-05-01', fechaVencimiento: '2025-05-25' },
    { id: '5', folio: 'FAC-2025-00425', usuario: 'Ana Lucía Peña Díaz', cuenta: 'DOM-003456', monto: 420, descuento: 0, total: 420, estado: 'vencida', fechaEmision: '2025-04-01', fechaVencimiento: '2025-04-25' },
    { id: '6', folio: 'FAC-2025-00426', usuario: 'Industrias Metálicas del Norte', cuenta: 'IND-000045', monto: 8_750, descuento: 0, total: 8_750, estado: 'pagada', fechaEmision: '2025-05-01', fechaVencimiento: '2025-05-30', fechaPago: '2025-05-15' },
    { id: '7', folio: 'FAC-2025-00427', usuario: 'José Luis Ramírez Torres', cuenta: 'DOM-007890', monto: 310, descuento: 93, total: 217, estado: 'pagada', fechaEmision: '2025-05-01', fechaVencimiento: '2025-05-20', fechaPago: '2025-05-12' },
    { id: '8', folio: 'FAC-2025-00428', usuario: 'Escuela Primaria Juárez', cuenta: 'GOB-000234', monto: 680, descuento: 680, total: 0, estado: 'pagada', fechaEmision: '2025-05-01', fechaVencimiento: '2025-05-31', fechaPago: '2025-05-18' },
    { id: '9', folio: 'FAC-2025-00429', usuario: 'Patricia Morales Vega', cuenta: 'DOM-011234', monto: 255, descuento: 0, total: 255, estado: 'pendiente', fechaEmision: '2025-05-01', fechaVencimiento: '2025-05-25' },
    { id: '10', folio: 'FAC-2025-00430', usuario: 'Taquería El Buen Sabor', cuenta: 'COM-001456', monto: 540, descuento: 0, total: 540, estado: 'vencida', fechaEmision: '2025-04-01', fechaVencimiento: '2025-04-25' },
    { id: '11', folio: 'FAC-2025-00431', usuario: 'Fernando Castro Ríos', cuenta: 'DOM-013578', monto: 375, descuento: 0, total: 375, estado: 'cancelada', fechaEmision: '2025-05-01', fechaVencimiento: '2025-05-25' },
    { id: '12', folio: 'FAC-2025-00432', usuario: 'Clínica Dental Sonrisa', cuenta: 'COM-002890', monto: 920, descuento: 0, total: 920, estado: 'pendiente', fechaEmision: '2025-05-01', fechaVencimiento: '2025-05-30' }
  ]
})
