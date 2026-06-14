<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const { kpi: kpiIngresos } = useIngresos()
const { kpi: kpiFacturas } = useFacturas()
const { kpi: kpiDescuentos } = useDescuentos()
const { kpi: kpiOrdenes } = useOrdenesTrabajo()
const { kpi: kpiPadron } = usePadronUsuarios()

const { pendiente, subtituloPeriodo, aplicar, limpiar } = useFiltrosDashboard()

const activeTab = ref('facturas')
const filtrosPanelAbierto = ref(false)

const tabItems = [
  { label: 'Facturas Recientes', value: 'facturas' },
  { label: 'Órdenes Recientes', value: 'ordenes' }
]

const meses = [
  { label: 'Enero',      value: '01' },
  { label: 'Febrero',    value: '02' },
  { label: 'Marzo',      value: '03' },
  { label: 'Abril',      value: '04' },
  { label: 'Mayo',       value: '05' },
  { label: 'Junio',      value: '06' },
  { label: 'Julio',      value: '07' },
  { label: 'Agosto',     value: '08' },
  { label: 'Septiembre', value: '09' },
  { label: 'Octubre',    value: '10' },
  { label: 'Noviembre',  value: '11' },
  { label: 'Diciembre',  value: '12' }
]

const anios = [
  { label: '2025', value: '2025' },
  { label: '2024', value: '2024' },
  { label: '2023', value: '2023' }
]

const estadosFactura = [
  { label: 'Todos los estados', value: 'todos' },
  { label: 'Pagadas',           value: 'pagada' },
  { label: 'Pendientes',        value: 'pendiente' },
  { label: 'Vencidas',          value: 'vencida' },
  { label: 'Canceladas',        value: 'cancelada' }
]

const tiposOrden = [
  { label: 'Todos los tipos', value: 'todos' },
  { label: 'Fuga',            value: 'fuga' },
  { label: 'Instalación',     value: 'instalacion' },
  { label: 'Mantenimiento',   value: 'mantenimiento' },
  { label: 'Medidor',         value: 'medidor' },
  { label: 'Reconexión',      value: 'reconexion' }
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
        <!-- Encabezado del panel mobile -->
        <div class="flex items-center justify-between mb-4 lg:hidden">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-sliders-horizontal" class="w-4 h-4 text-primary-600" />
            <span class="font-semibold text-sm">Filtros</span>
          </div>
          <UButton
            icon="i-lucide-x"
            size="sm"
            color="neutral"
            variant="ghost"
            @click="filtrosPanelAbierto = false"
          />
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

              <USeparator />

              <UFormField label="Estado de Facturas">
                <USelect v-model="pendiente.estado" :items="estadosFactura" value-key="value" label-key="label" class="w-full" />
              </UFormField>

              <UFormField label="Tipo de Orden">
                <USelect v-model="pendiente.tipo" :items="tiposOrden" value-key="value" label-key="label" class="w-full" />
              </UFormField>
            </div>

            <template #footer>
              <div class="flex flex-col gap-2">
                <UButton icon="i-lucide-search" block @click="aplicarFiltros">Aplicar</UButton>
                <UButton icon="i-lucide-x" color="neutral" variant="outline" block @click="limpiar">
                  Limpiar
                </UButton>
              </div>
            </template>
          </UCard>
        </div>
      </aside>

      <!-- Contenido principal -->
      <div class="flex-1 min-w-0 space-y-6 lg:space-y-8 w-full">

        <!-- Zona 1: KPI Cards -->
        <section>
          <UiSectionTitle title="Indicadores del período" :subtitle="subtituloPeriodo" />
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-3 lg:gap-4 mt-4">
            <DashboardKpiCard
              title="Ingresos del Mes"
              :value="formatCurrency(kpiIngresos.totalMes)"
              :subtitle="`Anual: ${formatCurrency(kpiIngresos.totalAnio)}`"
              icon="i-lucide-banknote"
              icon-color="bg-blue-600"
              :trend="kpiIngresos.variacionMensual"
              trend-label="vs mes anterior"
            />
            <DashboardKpiCard
              title="Facturas Emitidas"
              :value="formatNumber(kpiFacturas.totalEmitidas)"
              :subtitle="`${kpiFacturas.totalPendientes} pend. · ${kpiFacturas.totalVencidas} venc.`"
              icon="i-lucide-file-text"
              icon-color="bg-teal-600"
            />
            <DashboardKpiCard
              title="Descuentos"
              :value="formatCurrency(kpiDescuentos.totalMonto)"
              :subtitle="`${formatNumber(kpiDescuentos.totalFacturas)} facturas`"
              icon="i-lucide-tag"
              icon-color="bg-violet-600"
            />
            <DashboardKpiCard
              title="Órdenes Activas"
              :value="formatNumber(kpiOrdenes.totalAbiertas + kpiOrdenes.totalEnProceso)"
              :subtitle="`${kpiOrdenes.totalCompletadas} completadas`"
              icon="i-lucide-wrench"
              icon-color="bg-amber-500"
            />
            <DashboardKpiCard
              title="Padrón"
              :value="formatNumber(kpiPadron.totalRegistrados)"
              :subtitle="`${kpiPadron.porcentajeActivos.toFixed(1)}% activos`"
              icon="i-lucide-users"
              icon-color="bg-emerald-600"
            />
          </div>
        </section>

        <!-- Zona 2: Gráficas -->
        <section>
          <UiSectionTitle title="Análisis Gráfico" />
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-4">
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-trending-up" class="w-4 h-4 text-primary-600" />
                  <p class="font-semibold text-sm">Ingresos Mensuales</p>
                </div>
              </template>
              <ClientOnly>
                <DashboardIngresosMensualesChart />
                <template #fallback>
                  <div class="h-64 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>

            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-pie-chart" class="w-4 h-4 text-primary-600" />
                  <p class="font-semibold text-sm">Estado de Facturas</p>
                </div>
              </template>
              <ClientOnly>
                <DashboardFacturasStatusChart />
                <template #fallback>
                  <div class="h-64 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>

            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-bar-chart-horizontal" class="w-4 h-4 text-primary-600" />
                  <p class="font-semibold text-sm">Órdenes por Estado</p>
                </div>
              </template>
              <ClientOnly>
                <DashboardOrdenesStatusChart />
                <template #fallback>
                  <div class="h-64 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>

            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-bar-chart-2" class="w-4 h-4 text-primary-600" />
                  <p class="font-semibold text-sm">Padrón por Tarifa</p>
                </div>
              </template>
              <ClientOnly>
                <DashboardPadronUsuariosChart />
                <template #fallback>
                  <div class="h-64 animate-pulse rounded-lg bg-elevated" />
                </template>
              </ClientOnly>
            </UCard>
          </div>
        </section>

        <!-- Zona 3: Actividad Reciente -->
        <section>
          <UiSectionTitle title="Actividad Reciente" />
          <UCard class="mt-4">
            <template #header>
              <UTabs v-model="activeTab" :items="tabItems" variant="link" />
            </template>
            <div class="overflow-x-auto -mx-4 sm:mx-0">
              <div class="min-w-[600px] sm:min-w-0 px-4 sm:px-0">
                <DashboardRecentFacturasTable v-if="activeTab === 'facturas'" />
                <DashboardRecentOrdenesTable v-else />
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
