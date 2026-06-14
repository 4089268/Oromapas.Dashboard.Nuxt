<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const { conceptos } = useRecaudacion()

const chartData = computed(() => ({
  labels: ['Agua', 'Drenaje', 'Saneamiento', 'Otros', 'Recargos', 'IVA'],
  datasets: [{
    data: [
      conceptos.value.agua,
      conceptos.value.drenaje,
      conceptos.value.saneamiento,
      conceptos.value.otros,
      conceptos.value.recargos,
      conceptos.value.iva
    ],
    backgroundColor: ['#2563eb','#0891b2','#059669','#7c3aed','#dc2626','#d97706'],
    borderWidth: 0,
    hoverOffset: 4
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { padding: 12, font: { size: 11 }, usePointStyle: true, pointStyleWidth: 8 }
    },
    tooltip: {
      callbacks: {
        label: (ctx: { label: string, raw: unknown }) =>
          ` ${ctx.label}: ${formatCurrency(ctx.raw as number)}`
      }
    }
  }
}
</script>

<template>
  <div class="h-72">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
