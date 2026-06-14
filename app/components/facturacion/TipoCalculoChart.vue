<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale,
  type ChartOptions
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { tipoCalculo } = useFacturacionDB()
const colorMode = useColorMode()

const COLORES = ['#10b981', '#f59e0b', '#94a3b8']

const chartData = computed(() => ({
  labels: tipoCalculo.value.map(t => t.tipo),
  datasets: [
    {
      label: 'Usuarios',
      data: tipoCalculo.value.map(t => t.totalUsuarios),
      backgroundColor: tipoCalculo.value.map((_, i) => COLORES[i] ?? '#64748b'),
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
  indexAxis: 'y' as const,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const row = tipoCalculo.value[ctx.dataIndex]
          return [
            ` Usuarios: ${formatNumber(ctx.raw as number)} (${row?.pctUsuarios ?? 0}%)`,
            ` m³: ${formatNumber(row?.totalM3Facturados ?? 0)} (${row?.pctM3 ?? 0}%)`,
          ]
        }
      }
    }
  },
  scales: {
    x: {
      grid: { color: gridColor.value },
      ticks: { color: tickColor.value, font: { size: 11 }, callback: (v) => formatNumber(Number(v)) }
    },
    y: {
      grid: { display: false },
      ticks: { color: tickColor.value, font: { size: 12 } }
    }
  }
}))
</script>

<template>
  <div class="h-48">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
