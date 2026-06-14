<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  ArcElement,
  type ChartOptions
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const { conceptos } = useFacturacionDB()

const chartData = computed(() => ({
  labels: ['Agua', 'Drenaje', 'Saneamiento', 'Otros', 'Recargos', 'IVA'],
  datasets: [
    {
      data: [
        conceptos.value.agua,
        conceptos.value.drenaje,
        conceptos.value.saneamiento,
        conceptos.value.otros,
        conceptos.value.recargos,
        conceptos.value.iva,
      ],
      backgroundColor: ['#2563eb', '#0891b2', '#0d9488', '#64748b', '#dc2626', '#9333ea'],
      hoverBackgroundColor: ['#1d4ed8', '#0e7490', '#0f766e', '#475569', '#b91c1c', '#7e22ce'],
      borderWidth: 0,
    }
  ]
}))

const chartOptions = computed((): ChartOptions<'doughnut'> => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: {
      position: 'right' as const,
      labels: { usePointStyle: true, pointStyleWidth: 8, font: { size: 11 }, padding: 12 }
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${formatCurrency(ctx.raw as number)}`
      }
    }
  }
}))
</script>

<template>
  <div class="h-64">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
