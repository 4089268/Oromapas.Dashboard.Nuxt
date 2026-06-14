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

// ── Recaudación (esquema real de BD) ─────────────────────────────

/** Fila de la tabla dbo.Recaudacion */
export interface RecaudacionRow {
  af: number
  mf: number
  id_localidad: number
  id_colonia: number
  id_tarifa: 1 | 4 | 5 | 7
  id_tipocalculado: 0 | 1 | 2 | 3
  recibos: number
  agua: number
  dren: number
  sane: number
  otros: number
  recar: number
  r_agua: number
  r_dren: number
  r_sane: number
  iva: number
  mes_0: number
  mes_1: number
  mes_2: number
  mes_3: number
  mes_4: number
  ven_recibos: number
  ven_subtotal: number
  ven_iva: number
  ven_total: number
}

/** Resultado de SP_Dashboard_Recaudacion_KPIs */
export interface RecaudacionKpis {
  anio: number
  mesDesde: number
  mesHasta: number
  totalRecibos: number
  subtotalServicios: number
  totalRecargos: number
  totalIva: number
  totalRecaudado: number
  recuperacionVencidos: number
  recibosCorrientes: number
  recibosAtraso1: number
  recibosAtraso2: number
  recibosAtraso3: number
  recibosAtraso4mas: number
  recibosMorosos: number
  pctMorosidad: number
  pctAlCorriente: number
}

/** Resultado de SP_Dashboard_Recaudacion_Tendencia — una fila por mes */
export interface RecaudacionMensual {
  mes: number
  totalRecibos: number
  subtotalServicios: number
  totalRecargos: number
  totalIva: number
  totalRecaudado: number
  recuperacionVencidos: number
}

/** Resultado de SP_Dashboard_Recaudacion_Conceptos */
export interface RecaudacionConceptos {
  agua: number
  drenaje: number
  saneamiento: number
  otros: number
  recargos: number
  iva: number
  recuperacionVencidosNeto: number
}

/** Resultado de SP_Dashboard_Recaudacion_PorTarifa */
export interface RecaudacionPorTarifa {
  idTarifa: number
  tarifa: string
  totalRecibos: number
  totalRecaudado: number
  pctMorosidad: number
}

/** Resultado de SP_Dashboard_Recaudacion_PorColonia */
export interface RecaudacionPorColonia {
  idColonia: number
  idLocalidad: number
  totalRecibos: number
  totalRecaudado: number
  recuperacionVencidos: number
  pctMorosidad: number
}

/** Resultado de SP_Dashboard_Recaudacion_Morosidad */
export interface RecaudacionMorosidad {
  corriente: number
  atraso1Mes: number
  atraso2Meses: number
  atraso3Meses: number
  atraso4MasMeses: number
  totalRecibosCartera: number
  pctCorriente: number
  pctMorosos: number
}

/** Resultado de SP_Dashboard_Recaudacion_MorosidadPorTarifa */
export interface MorosidadPorTarifa {
  idTarifa: number
  tarifa: string
  totalRecibos: number
  corriente: number
  atraso1Mes: number
  atraso2Meses: number
  atraso3Meses: number
  atraso4Mas: number
  pctMorosidad: number
}

/** Resultado de SP_Dashboard_Recaudacion_Vencidos — una fila por mes */
export interface VencidosMensual {
  mes: number
  recibosRecuperados: number
  montoNeto: number
  iva: number
  totalRecuperado: number
}

/** Resultado de SP_Dashboard_Recaudacion_TipoCalculo */
export interface RecaudacionTipoCalculo {
  idTipoCalculado: number
  tipo: string
  totalRecibos: number
  totalRecaudado: number
  pctRecibos: number
}

// ── Facturación (esquema real de BD) ─────────────────────────────

/** Resultado de SP_Dashboard_Facturacion_KPIs */
export interface FacturacionKpis {
  anio: number
  mesDesde: number
  mesHasta: number
  totalUsuarios: number
  totalFacturado: number
  subtotalServicios: number
  totalRecargos: number
  totalIva: number
  totalM3Facturados: number
  totalM3Consumidos: number
  diferenciaM3: number
  cargoPromedioUsuario: number
  consumoPromedioM3: number
  totalConMedidor: number
  totalSinMedidor: number
  totalMedidorFuncional: number
  totalMedidorNofuncional: number
  pctConMedidor: number
  pctMedidorFuncional: number
  lecturasReales: number
  lecturasPromediadas: number
  pctLecturasReales: number
}

/** Resultado de SP_Dashboard_Facturacion_Tendencia — una fila por mes */
export interface FacturacionMensual {
  mes: number
  totalUsuarios: number
  totalM3Facturados: number
  totalM3Consumidos: number
  subtotalServicios: number
  totalRecargos: number
  totalIva: number
  totalFacturado: number
  cargoPromedioUsuario: number
}

/** Resultado de SP_Dashboard_Facturacion_PorTarifa */
export interface FacturacionPorTarifa {
  idTarifa: number
  tarifa: string
  totalUsuarios: number
  totalM3Facturados: number
  totalM3Consumidos: number
  totalFacturado: number
  cargoPromedioUsuario: number
  consumoPromedioM3: number
  pctUsuarios: number
  pctFacturado: number
}

/** Resultado de SP_Dashboard_Facturacion_Medicion */
export interface FacturacionMedicion {
  totalUsuarios: number
  conMedidorFuncional: number
  conMedidorNofuncional: number
  conMedidorTotal: number
  sinMedidor: number
  pctMedidorFuncional: number
  pctMedidorNofuncional: number
  pctSinMedidor: number
  lecturasReales: number
  lecturasPromediadas: number
  usuariosMedidos: number
  usuariosFijos: number
  pctLecturasReales: number
}

/** Resultado de SP_Dashboard_Facturacion_Conceptos */
export interface FacturacionConceptos {
  agua: number
  drenaje: number
  saneamiento: number
  otros: number
  recargos: number
  iva: number
  subtotalServicios: number
  totalFacturado: number
}

/** Resultado de SP_Dashboard_Facturacion_TipoCalculo */
export interface FacturacionTipoCalculo {
  idTipoCalculado: number
  tipo: string
  totalUsuarios: number
  totalM3Facturados: number
  totalM3Consumidos: number
  totalFacturado: number
  pctUsuarios: number
  pctM3: number
}
