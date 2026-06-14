<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const { kpis, morosidad } = useRecaudacion()
const { pendiente, subtituloPeriodo, aplicar, limpiar } = useFiltrosDashboard()

const filtrosPanelAbierto = ref(false)

const meses = [
  { label: 'Enero',      value: '01' }, { label: 'Febrero',    value: '02' },
  { label: 'Marzo',      value: '03' }, { label: 'Abril',      value: '04' },
  { label: 'Mayo',       value: '05' }, { label: 'Junio',      value: '06' },
  { label: 'Julio',      value: '07' }, { label: 'Agosto',     value: '08' },
  { label: 'Septiembre', value: '09' }, { label: 'Octubre',    value: '10' },
  { label: 'Noviembre',  value: '11' }, { label: 'Diciembre',  value: '12' }
]
const anios = [
  { label: '2025', value: '2025' },
  { label: '2024', value: '2024' },
  { label: '2023', value: '2023' }
]

function aplicarFiltros() {
  aplicar()
  filtrosPanelAbierto.value = false
}
</script>

<template>
  <div class="relative">

    <!-- Backdrop mobile -->
    <Transition name="fade">
      <div
        v-if="filtrosPanelAbierto"
        class="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
        @click="filtrosPanelAbierto = false"
      />
    </Transition>

    <div class="flex gap-6 p-4 lg:p-6 max-w-screen-2xl mx-auto">

      <!-- Panel de Filtros -->
      <aside
        class="fixed top-0 left-0 h-full w-72 z-40 overflow-y-auto bg-(--ui-bg) border-r border-(--ui-border) px-4 py-4 transition-transform duration-300 ease-in-out
               lg:relative lg:top-auto lg:left-auto lg:h-auto lg:w-56 lg:z-auto lg:bg-transparent lg:border-0 lg:p-0 lg:overflow-visible lg:translate-x-0 lg:shrink-0"
        :class="filtrosPanelAbierto ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="flex items-center justify-between mb-4 lg:hidden">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-sliders-horizontal" class="w-4 h-4 text-primary-600" />
            <span class="font-semibold text-sm">Filtros</span>
          </div>
          <UButton icon="i-lucide-x" size="sm" color="neutral" variant="ghost" @click="filtrosPanelAbierto = false" />
        </div>

        <div class="lg:sticky lg:top-20">
          <UCard>
            <template #header>
              <div class="hidden lg:flex items-center gap-2">
                <UIcon name="i-lucide-sliders-horizontal" class="w-4 h-4 text-primary-600" />
                <p class="font-semibold text-sm">Filtros</p>
              </div>
            </template>

            <div class="flex flex-col gap-4">
              <UFormField label="Mes">
                <USelect v-model="pendiente.mes" :items="meses" value-key="value" label-key="label" class="w-full" />
              </UFormField>
              <UFormField label="Año">
                <USelect v-model="pendiente.anio" :items="anios" value-key="value" label-key="label" class="w-full" />
              </UFormField>
            </div>

            <template #footer>
              <div class="flex flex-col gap-2">
                <UButton icon="i-lucide-search" block @click="aplicarFiltros">Aplicar</UButton>
                <UButton icon="i-lucide-x" color="neutral" variant="outline" block @click="limpiar">Limpiar</UButton>
              </div>
            </template>
          </UCard>
        </div>
      </aside>

      <!-- Contenido -->
      <div class="flex-1 min-w-0 space-y-6 lg:space-y-8 w-full">

        <!-- KPI Cards -->
        <section>
          <UiSectionTitle title="Recaudación" :subtitle="subtituloPeriodo" />
          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-4 mt-4">
            <DashboardKpiCard
              title="Total Recaudado"
              :value="formatCurrency(kpis.totalRecaudado)"
              :subtitle="`${formatNumber(kpis.totalRecibos)} recibos`"
              icon="i-lucide-circle-dollar-sign"
              icon-color="bg-blue-600"
            />
            <DashboardKpiCard
              title="Servicios"
              :value="formatCurrency(kpis.subtotalServicios)"
              subtitle="Agua · Dren · Sane"
              icon="i-lucide-droplets"
              icon-color="bg-cyan-600"
            />
            <DashboardKpiCard
              title="Recargos por Mora"
              :value="formatCurrency(kpis.totalRecargos)"
              :subtitle="`${formatNumber(kpis.recibosMorosos)} recibos en mora`"
              icon="i-lucide-alert-triangle"
              icon-color="bg-red-600"
            />
            <DashboardKpiCard
              title="Recuperado Vencidos"
              :value="formatCurrency(kpis.recuperacionVencidos)"
              subtitle="Cartera anterior"
              icon="i-lucide-rotate-ccw"
              icon-color="bg-amber-500"
            />
            <DashboardKpiCard
              title="Índice de Morosidad"
              :value="`${kpis.pctMorosidad}%`"
              :subtitle="`${kpis.pctAlCorriente}% al corriente`"
              icon="i-lucide-percent"
              icon-color="bg-violet-600"
              :trend="-(kpis.pctMorosidad - 96)"
              trend-label="vs promedio"
            />
          </div>
        </section>

        <!-- Tendencia anual -->
        <section>
          <UiSectionTitle title="Tendencia Anual" subtitle="Recaudación mensual y recuperación de vencidos" />
          <UCard class="mt-4">
            <ClientOnly>
              <RecaudacionTendenciaChart />
              <template #fallback>
                <div class="h-72 animate-pulse rounded-lg bg-elevated" />
              </template>
            </ClientOnly>
          </UCard>
        </section>

        <!-- Desglose por concepto y tarifa -->
        <section>
          <UiSectionTitle title="Distribución" />
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4">
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-pie-chart" class="w-4 h-4 text-primary-600" />
                  <p class="font-semibold text-sm">Por Concepto</p>
                </div>
              </template>
              <ClientOnly>
                <RecaudacionConceptosChart />
                <template #fallback>
                  <div class="h-72 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>

            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-bar-chart-horizontal" class="w-4 h-4 text-primary-600" />
                  <p class="font-semibold text-sm">Por Tipo de Tarifa</p>
                </div>
              </template>
              <ClientOnly>
                <RecaudacionTarifaChart />
                <template #fallback>
                  <div class="h-56 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>
          </div>
        </section>

        <!-- Morosidad y Vencidos -->
        <section>
          <UiSectionTitle title="Cartera y Morosidad" />
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4">
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-clock" class="w-4 h-4 text-red-500" />
                  <p class="font-semibold text-sm">Antigüedad de Cartera</p>
                </div>
              </template>
              <ClientOnly>
                <RecaudacionMorosidadChart />
                <template #fallback>
                  <div class="h-64 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>

            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-rotate-ccw" class="w-4 h-4 text-amber-500" />
                  <p class="font-semibold text-sm">Recuperación de Vencidos por Mes</p>
                </div>
              </template>
              <ClientOnly>
                <RecaudacionVencidosChart />
                <template #fallback>
                  <div class="h-64 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>
          </div>
        </section>

        <!-- Resumen de antigüedad detallada -->
        <section>
          <UiSectionTitle title="Detalle de Antigüedad" />
          <UCard class="mt-4">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-(--ui-border)">
                    <th class="text-left py-2 px-3 font-medium text-(--ui-text-muted)">Tramo</th>
                    <th class="text-right py-2 px-3 font-medium text-(--ui-text-muted)">Recibos</th>
                    <th class="text-right py-2 px-3 font-medium text-(--ui-text-muted)">% del total</th>
                    <th class="py-2 px-3" />
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, i) in [
                      { label: 'Al corriente',    value: morosidad.corriente,        color: 'bg-emerald-500' },
                      { label: '1 mes de atraso', value: morosidad.atraso1Mes,       color: 'bg-amber-400' },
                      { label: '2 meses',         value: morosidad.atraso2Meses,     color: 'bg-orange-500' },
                      { label: '3 meses',         value: morosidad.atraso3Meses,     color: 'bg-red-500' },
                      { label: '4+ meses',        value: morosidad.atraso4MasMeses,  color: 'bg-red-900' },
                    ]"
                    :key="i"
                    class="border-b border-(--ui-border) last:border-0 hover:bg-(--ui-bg-elevated) transition-colors"
                  >
                    <td class="py-2.5 px-3 flex items-center gap-2">
                      <span class="w-2.5 h-2.5 rounded-full shrink-0" :class="row.color" />
                      {{ row.label }}
                    </td>
                    <td class="py-2.5 px-3 text-right font-medium tabular-nums">
                      {{ formatNumber(row.value) }}
                    </td>
                    <td class="py-2.5 px-3 text-right text-(--ui-text-muted) tabular-nums">
                      {{ morosidad.totalRecibosCartera > 0
                          ? ((row.value / morosidad.totalRecibosCartera) * 100).toFixed(1)
                          : '0.0' }}%
                    </td>
                    <td class="py-2.5 px-3 w-32">
                      <div class="h-1.5 rounded-full bg-(--ui-bg-elevated) overflow-hidden">
                        <div
                          class="h-full rounded-full transition-all"
                          :class="row.color"
                          :style="{
                            width: morosidad.totalRecibosCartera > 0
                              ? `${(row.value / morosidad.totalRecibosCartera) * 100}%`
                              : '0%'
                          }"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </UCard>
        </section>

      </div>
    </div>

    <!-- FAB filtros mobile -->
    <button
      class="fixed bottom-6 right-6 z-20 lg:hidden flex items-center gap-2 px-4 py-3 rounded-full bg-primary-600 hover:bg-primary-700 active:scale-95 text-white shadow-lg shadow-primary-600/30 transition-all duration-150"
      @click="filtrosPanelAbierto = true"
    >
      <UIcon name="i-lucide-sliders-horizontal" class="w-4 h-4" />
      <span class="text-sm font-semibold">Filtros</span>
    </button>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
