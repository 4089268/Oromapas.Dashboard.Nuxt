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

const { usuarios } = usePadronUsuarios()
const colorMode = useColorMode()

const tarifas = ['domestica', 'comercial', 'industrial', 'gobierno'] as const
const tarifaLabels: Record<string, string> = {
  domestica: 'Doméstica',
  comercial: 'Comercial',
  industrial: 'Industrial',
  gobierno: 'Gobierno'
}

const chartData = computed(() => ({
  labels: tarifas.map(t => tarifaLabels[t]),
  datasets: [
    {
      label: 'Activos',
      data: tarifas.map(t => usuarios.value.filter(u => u.tarifa === t && u.estado === 'activo').length),
      backgroundColor: '#22c55e',
      borderRadius: 4,
      borderWidth: 0
    },
    {
      label: 'Inactivos/Suspendidos',
      data: tarifas.map(t => usuarios.value.filter(u => u.tarifa === t && u.estado !== 'activo').length),
      backgroundColor: '#94a3b8',
      borderRadius: 4,
      borderWidth: 0
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 16,
        font: { size: 12 },
        usePointStyle: true,
        pointStyleWidth: 8
      }
    }
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false },
      ticks: {
        color: colorMode.value === 'dark' ? '#94a3b8' : '#64748b',
        font: { size: 11 }
      }
    },
    y: {
      stacked: true,
      grid: {
        color: colorMode.value === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
      },
      ticks: {
        color: colorMode.value === 'dark' ? '#94a3b8' : '#64748b',
        font: { size: 11 },
        stepSize: 1
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
