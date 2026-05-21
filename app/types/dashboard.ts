export interface Ingreso {
  id: string
  mes: string
  anio: number
  total: number
  categorias: {
    tarifas: number
    reconexiones: number
    multas: number
  }
}

export interface Factura {
  id: string
  folio: string
  usuario: string
  cuenta: string
  monto: number
  descuento: number
  total: number
  estado: 'pagada' | 'pendiente' | 'vencida' | 'cancelada'
  fechaEmision: string
  fechaVencimiento: string
  fechaPago?: string
}

export interface Descuento {
  id: string
  tipo: string
  porcentaje: number
  monto: number
  facturas: number
}

export interface OrdenTrabajo {
  id: string
  folio: string
  tipo: 'fuga' | 'instalacion' | 'mantenimiento' | 'medidor' | 'reconexion'
  descripcion: string
  colonia: string
  estado: 'abierta' | 'en_proceso' | 'completada' | 'cancelada'
  prioridad: 'alta' | 'media' | 'baja'
  fechaCreacion: string
  fechaCierre?: string
  tecnico?: string
}

export interface Usuario {
  id: string
  cuenta: string
  nombre: string
  colonia: string
  tarifa: 'domestica' | 'comercial' | 'industrial' | 'gobierno'
  estado: 'activo' | 'inactivo' | 'suspendido' | 'baja'
  adeudo: number
  fechaRegistro: string
}

export interface KpiIngresos {
  totalMes: number
  totalAnio: number
  variacionMensual: number
  tendencia: Ingreso[]
}

export interface KpiFacturas {
  totalEmitidas: number
  totalPagadas: number
  totalPendientes: number
  totalVencidas: number
  montoPagado: number
  montoPendiente: number
}

export interface KpiDescuentos {
  totalMonto: number
  totalFacturas: number
  porTipo: Descuento[]
}

export interface KpiOrdenes {
  totalAbiertas: number
  totalEnProceso: number
  totalCompletadas: number
  totalMes: number
  tiempoPromedioHoras: number
}

export interface KpiPadron {
  totalRegistrados: number
  totalActivos: number
  totalInactivos: number
  totalSuspendidos: number
  porcentajeActivos: number
}
