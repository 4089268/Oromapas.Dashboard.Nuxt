<script setup lang="ts">
import { Chart } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  BarElement, LineElement, PointElement,
  CategoryScale, LinearScale,
  type ChartOptions
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale)

const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

const { tendencia } = useFacturacionDB()
const { aplicado } = useFiltrosDashboard()
const colorMode = useColorMode()

function linearRegression(values: number[]): number[] {
  const n = values.length
  if (n < 2) return values
  const sumX  = values.reduce((_, __, i) => _ + i, 0)
  const sumY  = values.reduce((a, v) => a + v, 0)
  const sumXY = values.reduce((a, v, i) => a + i * v, 0)
  const sumX2 = values.reduce((a, _, i) => a + i * i, 0)
  const slope     = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n
  return values.map((_, i) => slope * i + intercept)
}

const chartData = computed(() => {
  const valores = tendencia.value.map(r => r.totalFacturado)
  return {
    labels: tendencia.value.map(r => `${MESES[r.mes - 1]} ${aplicado.value.anio}`),
    datasets: [
      {
        type: 'bar' as const,
        label: 'Total Facturado',
        data: valores,
        backgroundColor: 'rgba(13,148,136,0.8)',
        hoverBackgroundColor: '#0d9488',
        borderRadius: 4,
        borderSkipped: false,
        order: 2,
      },
      {
        type: 'line' as const,
        label: 'Tendencia',
        data: linearRegression(valores),
        borderColor: '#f59e0b',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 4],
        pointRadius: 0,
        tension: 0,
        order: 1,
      }
    ]
  }
})

const gridColor = computed(() => colorMode.value === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)')
const tickColor = computed(() => colorMode.value === 'dark' ? '#94a3b8' : '#64748b')

const chartOptions = computed((): ChartOptions<'bar'> => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.dataset.label}: ${formatCurrency(ctx.raw as number)}`
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
        callback: (v: number | string) => `$${(Number(v) / 1_000_000).toFixed(1)}M`
      }
    }
  }
}))
</script>

<template>
  <div class="h-64">
    <Chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>
