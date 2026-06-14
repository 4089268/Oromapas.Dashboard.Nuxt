<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  LineElement, PointElement, CategoryScale, LinearScale, Filler,
  type ChartOptions
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

const { tendencia } = useFacturacionDB()
const colorMode = useColorMode()

const chartData = computed(() => ({
  labels: tendencia.value.map(r => MESES[r.mes - 1]),
  datasets: [
    {
      label: 'Total Facturado',
      data: tendencia.value.map(r => r.totalFacturado),
      borderColor: '#0d9488',
      backgroundColor: 'rgba(13,148,136,0.08)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#0d9488',
      borderWidth: 2,
      yAxisID: 'y',
    },
    {
      label: 'Servicios',
      data: tendencia.value.map(r => r.subtotalServicios),
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37,99,235,0.0)',
      fill: false,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: '#2563eb',
      borderWidth: 2,
      borderDash: [4, 3],
      yAxisID: 'y',
    },
  ]
}))

const gridColor  = computed(() => colorMode.value === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)')
const tickColor  = computed(() => colorMode.value === 'dark' ? '#94a3b8' : '#64748b')

const chartOptions = computed((): ChartOptions<'line'> => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index' as const, intersect: false },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: { usePointStyle: true, pointStyleWidth: 8, font: { size: 12 }, padding: 16 }
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw as number)}`
      }
    }
  },
  scales: {
    x: {
      grid: { color: gridColor.value },
      ticks: { color: tickColor.value, font: { size: 11 } }
    },
    y: {
      grid: { color: gridColor.value },
      ticks: {
        color: tickColor.value,
        font: { size: 11 },
        callback: (v: number | string) => `$${(Number(v) / 1_000_000).toFixed(1)}M`
      }
    }
  }
}))
</script>

<template>
  <div class="h-72">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
