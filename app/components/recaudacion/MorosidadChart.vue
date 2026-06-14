<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { morosidad } = useRecaudacion()
const colorMode = useColorMode()

const chartData = computed(() => ({
  labels: ['Al corriente', '1 mes', '2 meses', '3 meses', '4+ meses'],
  datasets: [{
    label: 'Recibos',
    data: [
      morosidad.value.corriente,
      morosidad.value.atraso1Mes,
      morosidad.value.atraso2Meses,
      morosidad.value.atraso3Meses,
      morosidad.value.atraso4MasMeses
    ],
    backgroundColor: ['#22c55e', '#f59e0b', '#f97316', '#ef4444', '#991b1b'],
    borderRadius: 6,
    borderWidth: 0
  }]
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
        label: (ctx: { raw: unknown }) => ` ${formatNumber(ctx.raw as number)} recibos`
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
      ticks: { color: tickColor.value, font: { size: 11 } }
    }
  }
}))
</script>

<template>
  <div class="space-y-4">
    <div class="h-52">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
    <!-- Resumen porcentual -->
    <div class="grid grid-cols-2 gap-3 text-sm">
      <div class="flex items-center gap-2 rounded-lg bg-(--ui-bg-elevated) px-3 py-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
        <span class="text-(--ui-text-muted)">Al corriente</span>
        <span class="ml-auto font-semibold text-emerald-500">{{ morosidad.pctCorriente }}%</span>
      </div>
      <div class="flex items-center gap-2 rounded-lg bg-(--ui-bg-elevated) px-3 py-2">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
        <span class="text-(--ui-text-muted)">En mora</span>
        <span class="ml-auto font-semibold text-red-500">{{ morosidad.pctMorosos }}%</span>
      </div>
    </div>
  </div>
</template>
