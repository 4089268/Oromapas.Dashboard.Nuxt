<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

const { vencidos } = useRecaudacion()
const colorMode = useColorMode()

const chartData = computed(() => ({
  labels: vencidos.value.map(v => MESES[v.mes - 1]),
  datasets: [
    {
      label: 'Recuperado',
      data: vencidos.value.map(v => v.totalRecuperado),
      backgroundColor: 'rgba(245,158,11,0.85)',
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
      grid: { display: false },
      ticks: { color: tickColor.value, font: { size: 11 } }
    },
    y: {
      grid: { color: gridColor.value },
      ticks: {
        color: tickColor.value,
        font: { size: 11 },
        callback: (v: number | string) => `$${(Number(v) / 1000).toFixed(0)}K`
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
