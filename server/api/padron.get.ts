import type { Usuario } from '~/types/dashboard'

export default defineEventHandler((): Usuario[] => {
  return [
    { id: '1', cuenta: 'DOM-001234', nombre: 'María González López', colonia: 'Centro', tarifa: 'domestica', estado: 'activo', adeudo: 0, fechaRegistro: '2018-03-15' },
    { id: '2', cuenta: 'DOM-005678', nombre: 'Carlos Hernández Ruiz', colonia: 'La Loma', tarifa: 'domestica', estado: 'activo', adeudo: 0, fechaRegistro: '2015-07-22' },
    { id: '3', cuenta: 'COM-000892', nombre: 'Farmacia San Juan S.A.', colonia: 'Centro', tarifa: 'comercial', estado: 'activo', adeudo: 1_250, fechaRegistro: '2010-01-10' },
    { id: '4', cuenta: 'DOM-009012', nombre: 'Roberto Martínez Soto', colonia: 'Las Flores', tarifa: 'domestica', estado: 'activo', adeudo: 136.5, fechaRegistro: '2020-11-08' },
    { id: '5', cuenta: 'DOM-003456', nombre: 'Ana Lucía Peña Díaz', colonia: 'Benito Juárez', tarifa: 'domestica', estado: 'suspendido', adeudo: 840, fechaRegistro: '2017-04-30' },
    { id: '6', cuenta: 'IND-000045', nombre: 'Industrias Metálicas del Norte', colonia: 'Industrial Norte', tarifa: 'industrial', estado: 'activo', adeudo: 0, fechaRegistro: '2005-06-14' },
    { id: '7', cuenta: 'DOM-007890', nombre: 'José Luis Ramírez Torres', colonia: 'Centro', tarifa: 'domestica', estado: 'activo', adeudo: 0, fechaRegistro: '2019-02-28' },
    { id: '8', cuenta: 'GOB-000234', nombre: 'Escuela Primaria Juárez', colonia: 'Centro', tarifa: 'gobierno', estado: 'activo', adeudo: 0, fechaRegistro: '2008-08-20' },
    { id: '9', cuenta: 'DOM-011234', nombre: 'Patricia Morales Vega', colonia: 'Fracc. Jardines', tarifa: 'domestica', estado: 'activo', adeudo: 255, fechaRegistro: '2022-01-15' },
    { id: '10', cuenta: 'COM-001456', nombre: 'Taquería El Buen Sabor', colonia: 'Zona Comercial', tarifa: 'comercial', estado: 'suspendido', adeudo: 1_080, fechaRegistro: '2016-09-03' },
    { id: '11', cuenta: 'DOM-013578', nombre: 'Fernando Castro Ríos', colonia: 'San Marcos', tarifa: 'domestica', estado: 'inactivo', adeudo: 0, fechaRegistro: '2021-06-18' },
    { id: '12', cuenta: 'COM-002890', nombre: 'Clínica Dental Sonrisa', colonia: 'Centro', tarifa: 'comercial', estado: 'activo', adeudo: 920, fechaRegistro: '2013-10-05' }
  ]
})
