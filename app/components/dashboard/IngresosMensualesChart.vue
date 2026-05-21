<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

const { ingresos } = useIngresos()
const colorMode = useColorMode()

const chartData = computed(() => ({
  labels: ingresos.value.map(i => i.mes),
  datasets: [
    {
      label: 'Ingresos',
      data: ingresos.value.map(i => i.total),
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.08)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#2563eb',
      borderWidth: 2
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
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
      grid: {
        color: colorMode.value === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
      },
      ticks: {
        color: colorMode.value === 'dark' ? '#94a3b8' : '#64748b',
        font: { size: 11 }
      }
    },
    y: {
      grid: {
        color: colorMode.value === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
      },
      ticks: {
        color: colorMode.value === 'dark' ? '#94a3b8' : '#64748b',
        font: { size: 11 },
        callback: (v: number | string) => `$${(Number(v) / 1000).toFixed(0)}K`
      }
    }
  }
}))
</script>

<template>
  <div class="h-64">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
