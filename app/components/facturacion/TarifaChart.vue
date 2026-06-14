<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale,
  type ChartOptions
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { porTarifa } = useFacturacionDB()
const colorMode = useColorMode()

const COLORES = ['#2563eb', '#0d9488', '#7c3aed', '#d97706']

const chartData = computed(() => ({
  labels: porTarifa.value.map(t => t.tarifa),
  datasets: [
    {
      label: 'Total Facturado',
      data: porTarifa.value.map(t => t.totalFacturado),
      backgroundColor: COLORES,
      borderRadius: 6,
      borderSkipped: false,
    }
  ]
}))

const gridColor = computed(() => colorMode.value === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)')
const tickColor = computed(() => colorMode.value === 'dark' ? '#94a3b8' : '#64748b')

const chartOptions = computed((): ChartOptions<'bar'> => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${formatCurrency(ctx.raw as number)}`
      }
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: tickColor.value, font: { size: 11 } }
    },
    y: {
      grid: { color: gridColor.value },
      ticks: {
        color: tickColor.value,
        font: { size: 11 },
        callback: (v: number | string) => `$${(Number(v) / 1_000).toFixed(0)}K`
      }
    }
  }
}))
</script>

<template>
  <div class="h-64">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
