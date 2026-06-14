<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  ArcElement,
  type ChartOptions
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const { medicion } = useFacturacionDB()

const chartData = computed(() => ({
  labels: ['Med. Funcional', 'Med. No Funcional', 'Sin Medidor'],
  datasets: [
    {
      data: [
        medicion.value.conMedidorFuncional,
        medicion.value.conMedidorNofuncional,
        medicion.value.sinMedidor,
      ],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      hoverBackgroundColor: ['#059669', '#d97706', '#dc2626'],
      borderWidth: 0,
    }
  ]
}))

const chartOptions = computed((): ChartOptions<'doughnut'> => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'right' as const,
      labels: { usePointStyle: true, pointStyleWidth: 8, font: { size: 12 }, padding: 14 }
    },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const total = (ctx.dataset.data as number[]).reduce((a, b) => a + b, 0)
          const pct = total > 0 ? ((ctx.raw as number) / total * 100).toFixed(1) : '0.0'
          return ` ${formatNumber(ctx.raw as number)} usuarios (${pct}%)`
        }
      }
    }
  }
}))
</script>

<template>
  <div class="h-56">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
