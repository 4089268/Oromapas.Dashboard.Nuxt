<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { OrdenTrabajo } from '~/types/dashboard'

const { ordenes } = useOrdenesTrabajo()

const estadoColor: Record<OrdenTrabajo['estado'], 'info' | 'warning' | 'success' | 'neutral'> = {
  abierta: 'info',
  en_proceso: 'warning',
  completada: 'success',
  cancelada: 'neutral'
}

const estadoLabel: Record<OrdenTrabajo['estado'], string> = {
  abierta: 'Abierta',
  en_proceso: 'En proceso',
  completada: 'Completada',
  cancelada: 'Cancelada'
}

const prioridadColor: Record<OrdenTrabajo['prioridad'], 'error' | 'warning' | 'neutral'> = {
  alta: 'error',
  media: 'warning',
  baja: 'neutral'
}

const tipoLabel: Record<OrdenTrabajo['tipo'], string> = {
  fuga: 'Fuga',
  instalacion: 'Instalación',
  mantenimiento: 'Mantenimiento',
  medidor: 'Medidor',
  reconexion: 'Reconexión'
}

const columns: TableColumn<OrdenTrabajo>[] = [
  { accessorKey: 'folio', header: 'Folio', id: 'folio' },
  { accessorKey: 'tipo', header: 'Tipo', id: 'tipo' },
  { accessorKey: 'colonia', header: 'Colonia', id: 'colonia' },
  { accessorKey: 'estado', header: 'Estado', id: 'estado' },
  { accessorKey: 'prioridad', header: 'Prioridad', id: 'prioridad' },
  { accessorKey: 'fechaCreacion', header: 'Fecha', id: 'fechaCreacion' }
]
</script>

<template>
  <UTable :data="ordenes" :columns="columns">
    <template #tipo-cell="{ row }">
      {{ tipoLabel[row.original.tipo] }}
    </template>
    <template #estado-cell="{ row }">
      <UBadge :color="estadoColor[row.original.estado]" variant="subtle" size="sm">
        {{ estadoLabel[row.original.estado] }}
      </UBadge>
    </template>
    <template #prioridad-cell="{ row }">
      <UBadge :color="prioridadColor[row.original.prioridad]" variant="subtle" size="sm">
        {{ row.original.prioridad.charAt(0).toUpperCase() + row.original.prioridad.slice(1) }}
      </UBadge>
    </template>
    <template #fechaCreacion-cell="{ row }">
      {{ formatDate(row.original.fechaCreacion) }}
    </template>
  </UTable>
</template>
