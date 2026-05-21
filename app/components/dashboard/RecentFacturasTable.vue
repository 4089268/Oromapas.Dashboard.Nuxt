<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Factura } from '~/types/dashboard'

const { facturas } = useFacturas()

const estadoColor: Record<Factura['estado'], 'success' | 'warning' | 'error' | 'neutral'> = {
  pagada: 'success',
  pendiente: 'warning',
  vencida: 'error',
  cancelada: 'neutral'
}

const estadoLabel: Record<Factura['estado'], string> = {
  pagada: 'Pagada',
  pendiente: 'Pendiente',
  vencida: 'Vencida',
  cancelada: 'Cancelada'
}

const columns: TableColumn<Factura>[] = [
  { accessorKey: 'folio', header: 'Folio', id: 'folio' },
  { accessorKey: 'usuario', header: 'Usuario', id: 'usuario' },
  { accessorKey: 'total', header: 'Total', id: 'total' },
  { accessorKey: 'estado', header: 'Estado', id: 'estado' },
  { accessorKey: 'fechaEmision', header: 'Emisión', id: 'fechaEmision' },
  { accessorKey: 'fechaVencimiento', header: 'Vencimiento', id: 'fechaVencimiento' }
]
</script>

<template>
  <UTable :data="facturas" :columns="columns">
    <template #total-cell="{ row }">
      {{ formatCurrency(row.original.total) }}
    </template>
    <template #estado-cell="{ row }">
      <UBadge
        :color="estadoColor[row.original.estado]"
        variant="subtle"
        size="sm"
      >
        {{ estadoLabel[row.original.estado] }}
      </UBadge>
    </template>
    <template #fechaEmision-cell="{ row }">
      {{ formatDate(row.original.fechaEmision) }}
    </template>
    <template #fechaVencimiento-cell="{ row }">
      {{ formatDate(row.original.fechaVencimiento) }}
    </template>
  </UTable>
</template>
