<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { porTarifa } = useRecaudacion()
const colorMode = useColorMode()

const COLORS: Record<number, string> = { 1: '#2563eb', 4: '#7c3aed', 5: '#0891b2', 7: '#059669' }

const chartData = computed(() => ({
  labels: porTarifa.value.map(t => t.tarifa),
  datasets: [
    {
      label: 'Recaudado',
      data: porTarifa.value.map(t => t.totalRecaudado),
      backgroundColor: porTarifa.value.map(t => COLORS[t.idTarifa] ?? '#94a3b8'),
      borderRadius: 6,
      borderWidth: 0
    }
  ]
}))

const gridColor = computed(() =>
  colorMode.value === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
)
const tickColor = computed(() =>
  colorMode.value === 'dark' ? '#94a3b8' : '#64748b'
)

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: { raw: unknown }) => ` ${formatCurrency(ctx.raw as number)}`
      }
    }
  },
  scales: {
    x: {
      grid: { color: gridColor.value },
      ticks: {
        color: tickColor.value,
        font: { size: 11 },
        callback: (v: number | string) => `$${(Number(v) / 1_000_000).toFixed(1)}M`
      }
    },
    y: {
      grid: { display: false },
      ticks: { color: tickColor.value, font: { size: 12 } }
    }
  }
}))
</script>

<template>
  <div class="h-56">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
