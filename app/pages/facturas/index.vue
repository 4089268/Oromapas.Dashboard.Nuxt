<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const { kpis, medicion } = useFacturacionDB()
const { pendiente, subtituloPeriodo, aplicar, limpiar } = useFiltrosDashboard()

const filtrosPanelAbierto = ref(false)

const meses = [
  { label: 'Enero',      value: '01' }, { label: 'Febrero',    value: '02' },
  { label: 'Marzo',      value: '03' }, { label: 'Abril',      value: '04' },
  { label: 'Mayo',       value: '05' }, { label: 'Junio',      value: '06' },
  { label: 'Julio',      value: '07' }, { label: 'Agosto',     value: '08' },
  { label: 'Septiembre', value: '09' }, { label: 'Octubre',    value: '10' },
  { label: 'Noviembre',  value: '11' }, { label: 'Diciembre',  value: '12' },
]
const anios = [
  { label: '2025', value: '2025' },
  { label: '2024', value: '2024' },
  { label: '2023', value: '2023' },
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

      <!-- Panel de filtros -->
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

      <!-- Contenido principal -->
      <div class="flex-1 min-w-0 space-y-6 lg:space-y-8 w-full">

        <!-- KPI Cards -->
        <section>
          <UiSectionTitle title="Facturación" :subtitle="subtituloPeriodo" />
          <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-4 mt-4">
            <DashboardKpiCard
              title="Total Facturado"
              :value="formatCurrency(kpis.totalFacturado)"
              :subtitle="`${formatNumber(kpis.totalUsuarios)} usuarios`"
              icon="i-lucide-file-text"
              icon-color="bg-teal-600"
            />
            <DashboardKpiCard
              title="Servicios"
              :value="formatCurrency(kpis.subtotalServicios)"
              subtitle="Agua · Dren · Sane"
              icon="i-lucide-droplets"
              icon-color="bg-blue-600"
            />
            <DashboardKpiCard
              title="m³ Facturados"
              :value="formatNumber(kpis.totalM3Facturados)"
              :subtitle="`Consumidos: ${formatNumber(kpis.totalM3Consumidos)}`"
              icon="i-lucide-gauge"
              icon-color="bg-cyan-600"
            />
            <DashboardKpiCard
              title="Cargo Promedio"
              :value="formatCurrency(kpis.cargoPromedioUsuario)"
              subtitle="Por usuario"
              icon="i-lucide-user"
              icon-color="bg-violet-600"
            />
            <DashboardKpiCard
              title="Cobertura Medición"
              :value="`${kpis.pctConMedidor}%`"
              :subtitle="`${kpis.pctMedidorFuncional}% funcional`"
              icon="i-lucide-radio"
              icon-color="bg-amber-500"
            />
          </div>
        </section>

        <!-- Tendencia anual -->
        <section>
          <UiSectionTitle title="Tendencia Anual" subtitle="Facturación mensual y servicios" />
          <UCard class="mt-4">
            <ClientOnly>
              <FacturacionTendenciaChart />
              <template #fallback>
                <div class="h-72 animate-pulse rounded-lg bg-elevated" />
              </template>
            </ClientOnly>
          </UCard>
        </section>

        <!-- Distribución -->
        <section>
          <UiSectionTitle title="Distribución" />
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4">
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-bar-chart-2" class="w-4 h-4 text-primary-600" />
                  <p class="font-semibold text-sm">Por Tipo de Tarifa</p>
                </div>
              </template>
              <ClientOnly>
                <FacturacionTarifaChart />
                <template #fallback>
                  <div class="h-64 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>

            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-pie-chart" class="w-4 h-4 text-primary-600" />
                  <p class="font-semibold text-sm">Por Concepto</p>
                </div>
              </template>
              <ClientOnly>
                <FacturacionConceptosChart />
                <template #fallback>
                  <div class="h-64 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>
          </div>
        </section>

        <!-- Medición y calidad -->
        <section>
          <UiSectionTitle title="Medición y Calidad de Lectura" />
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4">
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-radio" class="w-4 h-4 text-amber-500" />
                  <p class="font-semibold text-sm">Cobertura de Medidores</p>
                </div>
              </template>
              <ClientOnly>
                <FacturacionMedicionChart />
                <template #fallback>
                  <div class="h-56 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>

            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-bar-chart-horizontal" class="w-4 h-4 text-primary-600" />
                  <p class="font-semibold text-sm">Tipo de Cálculo</p>
                </div>
              </template>
              <ClientOnly>
                <FacturacionTipoCalculoChart />
                <template #fallback>
                  <div class="h-48 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>
          </div>
        </section>

        <!-- Detalle de medición -->
        <section>
          <UiSectionTitle title="Detalle de Medición" />
          <UCard class="mt-4">
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-(--ui-border)">
                    <th class="text-left py-2 px-3 font-medium text-(--ui-text-muted)">Estado</th>
                    <th class="text-right py-2 px-3 font-medium text-(--ui-text-muted)">Usuarios</th>
                    <th class="text-right py-2 px-3 font-medium text-(--ui-text-muted)">% del padrón</th>
                    <th class="py-2 px-3" />
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, i) in [
                      { label: 'Medidor funcional',     value: medicion.conMedidorFuncional,   color: 'bg-emerald-500', pct: medicion.pctMedidorFuncional },
                      { label: 'Medidor no funcional',  value: medicion.conMedidorNofuncional, color: 'bg-amber-400',   pct: medicion.pctMedidorNofuncional },
                      { label: 'Sin medidor',           value: medicion.sinMedidor,            color: 'bg-red-500',     pct: medicion.pctSinMedidor },
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
                      {{ row.pct }}%
                    </td>
                    <td class="py-2.5 px-3 w-32">
                      <div class="h-1.5 rounded-full bg-(--ui-bg-elevated) overflow-hidden">
                        <div
                          class="h-full rounded-full transition-all"
                          :class="row.color"
                          :style="{ width: `${row.pct}%` }"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </UCard>
        </section>

        <!-- Facturas recientes -->
        <section>
          <div class="flex items-center gap-3 mt-0">
            <UiSectionTitle title="Facturas Recientes" />
            <UBadge color="warning" variant="subtle" size="sm" icon="i-lucide-clock">
              No implementado
            </UBadge>
          </div>
          <UCard class="mt-4">
            <div class="overflow-x-auto -mx-4 sm:mx-0">
              <div class="min-w-[600px] sm:min-w-0 px-4 sm:px-0">
                <DashboardRecentFacturasTable />
              </div>
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
