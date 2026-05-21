<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const { kpi } = useFacturas()

const chartData = computed(() => ({
  labels: ['Pagadas', 'Pendientes', 'Vencidas', 'Canceladas'],
  datasets: [
    {
      data: [
        kpi.value.totalPagadas,
        kpi.value.totalPendientes,
        kpi.value.totalVencidas,
        kpi.value.totalEmitidas - kpi.value.totalPagadas - kpi.value.totalPendientes - kpi.value.totalVencidas
      ],
      backgroundColor: ['#22c55e', '#f59e0b', '#ef4444', '#94a3b8'],
      borderWidth: 0,
      hoverOffset: 4
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '68%',
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
  }
}
</script>

<template>
  <div class="h-64">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
