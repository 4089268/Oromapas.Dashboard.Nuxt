<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { kpi } = useOrdenesTrabajo()
const colorMode = useColorMode()

const chartData = computed(() => ({
  labels: ['Abiertas', 'En Proceso', 'Completadas'],
  datasets: [
    {
      data: [kpi.value.totalAbiertas, kpi.value.totalEnProceso, kpi.value.totalCompletadas],
      backgroundColor: ['#3b82f6', '#f59e0b', '#22c55e'],
      borderRadius: 6,
      borderWidth: 0
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      grid: {
        color: colorMode.value === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
      },
      ticks: {
        color: colorMode.value === 'dark' ? '#94a3b8' : '#64748b',
        font: { size: 11 },
        stepSize: 1
      }
    },
    y: {
      grid: { display: false },
      ticks: {
        color: colorMode.value === 'dark' ? '#94a3b8' : '#64748b',
        font: { size: 12 }
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
