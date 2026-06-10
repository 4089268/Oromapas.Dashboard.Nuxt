import type { OrdenTrabajo } from '~/types/dashboard'

const ALL_ORDENES: OrdenTrabajo[] = [
  { id: '1',  folio: 'OT-2025-00312', tipo: 'fuga',          descripcion: 'Fuga en tubería principal calle Hidalgo',  colonia: 'Centro',         estado: 'abierta',    prioridad: 'alta',  fechaCreacion: '2025-05-19' },
  { id: '2',  folio: 'OT-2025-00311', tipo: 'medidor',       descripcion: 'Lectura de medidor doméstico',             colonia: 'La Loma',        estado: 'completada', prioridad: 'baja',  fechaCreacion: '2025-05-18', fechaCierre: '2025-05-19', tecnico: 'Ing. López' },
  { id: '3',  folio: 'OT-2025-00310', tipo: 'reconexion',    descripcion: 'Reconexión por pago de adeudo',            colonia: 'Las Flores',     estado: 'en_proceso', prioridad: 'media', fechaCreacion: '2025-05-18', tecnico: 'Téc. García' },
  { id: '4',  folio: 'OT-2025-00309', tipo: 'instalacion',   descripcion: 'Instalación de toma domiciliaria nueva',   colonia: 'Fracc. Jardines',estado: 'en_proceso', prioridad: 'media', fechaCreacion: '2025-05-17', tecnico: 'Ing. Morales' },
  { id: '5',  folio: 'OT-2025-00308', tipo: 'fuga',          descripcion: 'Fuga visible en calle Revolución s/n',     colonia: 'Benito Juárez',  estado: 'completada', prioridad: 'alta',  fechaCreacion: '2025-05-17', fechaCierre: '2025-05-18', tecnico: 'Ing. López' },
  { id: '6',  folio: 'OT-2025-00307', tipo: 'mantenimiento', descripcion: 'Mantenimiento preventivo red secundaria',  colonia: 'Industrial Norte',estado: 'abierta',   prioridad: 'media', fechaCreacion: '2025-05-16' },
  { id: '7',  folio: 'OT-2025-00306', tipo: 'medidor',       descripcion: 'Cambio de medidor dañado',                 colonia: 'Centro',         estado: 'completada', prioridad: 'media', fechaCreacion: '2025-05-15', fechaCierre: '2025-05-16', tecnico: 'Téc. Pérez' },
  { id: '8',  folio: 'OT-2025-00305', tipo: 'fuga',          descripcion: 'Reporte de fuga en banqueta',              colonia: 'San Marcos',     estado: 'cancelada',  prioridad: 'baja',  fechaCreacion: '2025-05-15', fechaCierre: '2025-05-15' },
  { id: '9',  folio: 'OT-2025-00304', tipo: 'instalacion',   descripcion: 'Instalación de medidor comercial',         colonia: 'Zona Comercial', estado: 'completada', prioridad: 'media', fechaCreacion: '2025-05-14', fechaCierre: '2025-05-15', tecnico: 'Ing. Morales' },
  { id: '10', folio: 'OT-2025-00303', tipo: 'reconexion',    descripcion: 'Reconexión domicilio suspendido',          colonia: 'Las Palmas',     estado: 'abierta',    prioridad: 'alta',  fechaCreacion: '2025-05-14' }
]

export default defineEventHandler((event): OrdenTrabajo[] => {
  const q = getQuery(event)
  let list = [...ALL_ORDENES]

  if (q.periodo === 'mes' && q.mes && q.anio) {
    const mes = parseInt(String(q.mes))
    const anio = parseInt(String(q.anio))
    list = list.filter(o => {
      const d = new Date(o.fechaCreacion)
      return d.getFullYear() === anio && d.getMonth() + 1 === mes
    })
  } else if (q.periodo === 'periodo' && q.fechaInicio && q.fechaFin) {
    const inicio = new Date(String(q.fechaInicio))
    const fin = new Date(String(q.fechaFin))
    list = list.filter(o => {
      const d = new Date(o.fechaCreacion)
      return d >= inicio && d <= fin
    })
  }

  if (q.tipo) {
    list = list.filter(o => o.tipo === String(q.tipo))
  }

  return list
})
