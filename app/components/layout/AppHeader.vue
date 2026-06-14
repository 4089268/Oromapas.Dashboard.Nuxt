<script setup lang="ts">
const colorMode = useColorMode()
const route = useRoute()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val) => { colorMode.preference = val ? 'dark' : 'light' }
})

const formattedDate = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric', month: 'short', year: 'numeric'
}).format(new Date())

const navItems = [
  { label: 'Dashboard',    to: '/dashboard',    icon: 'i-lucide-layout-dashboard' },
  { label: 'Recaudación',  to: '/recaudacion',  icon: 'i-lucide-circle-dollar-sign' },
  { label: 'Facturas',     to: '/facturas',     icon: 'i-lucide-file-text' },
  { label: 'Órdenes',      to: '/ordenes',      icon: 'i-lucide-wrench',             pending: true },
  { label: 'Padrón',       to: '/padron',       icon: 'i-lucide-users',              pending: true },
]
</script>

<template>
  <header class="flex items-center justify-between h-16 px-4 lg:px-6 border-b border-(--ui-border) bg-(--ui-bg) shrink-0 sticky top-0 z-10">
    <div class="flex items-center gap-4">
      <AppLogo />
      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
          :class="$route.path.startsWith(item.to)
            ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400'
            : 'text-(--ui-text-muted) hover:text-(--ui-text) hover:bg-(--ui-bg-elevated)'"
        >
          <UIcon :name="item.icon" class="w-4 h-4" />
          <span>{{ item.label }}</span>
          <UBadge v-if="item.pending" color="warning" variant="subtle" size="xs">
            Próx.
          </UBadge>
        </NuxtLink>
      </nav>
    </div>
    <div class="flex items-center gap-3">
      <span class="text-xs text-(--ui-text-muted) hidden sm:block">{{ formattedDate }}</span>
      <div class="flex items-center gap-1.5">
        <UIcon name="i-lucide-sun" class="w-3.5 h-3.5 text-(--ui-text-muted)" />
        <USwitch v-model="isDark" size="sm" />
        <UIcon name="i-lucide-moon" class="w-3.5 h-3.5 text-(--ui-text-muted)" />
      </div>
    </div>
  </header>
</template>
