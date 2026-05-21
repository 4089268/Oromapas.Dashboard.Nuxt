<script setup lang="ts">
const route = useRoute()

const navItems = [
  {
    label: 'Panel Principal',
    icon: 'i-lucide-layout-dashboard',
    to: '/'
  },
  {
    label: 'Ingresos',
    icon: 'i-lucide-trending-up',
    to: '/ingresos'
  },
  {
    label: 'Facturas',
    icon: 'i-lucide-file-text',
    to: '/facturas'
  },
  {
    label: 'Descuentos',
    icon: 'i-lucide-tag',
    to: '/descuentos'
  },
  {
    label: 'Órdenes de Trabajo',
    icon: 'i-lucide-wrench',
    to: '/ordenes'
  },
  {
    label: 'Padrón de Usuarios',
    icon: 'i-lucide-users',
    to: '/padron'
  }
]

const isActive = (to: string) => {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}
</script>

<template>
  <aside class="hidden lg:flex flex-col w-64 shrink-0 border-r border-(--ui-border) bg-(--ui-bg) h-screen sticky top-0">
    <div class="flex items-center h-16 px-4 border-b border-(--ui-border) shrink-0">
      <AppLogo />
    </div>

    <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="isActive(item.to)
          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
          : 'text-(--ui-text-muted) hover:bg-(--ui-bg-elevated) hover:text-(--ui-text)'"
      >
        <UIcon :name="item.icon" class="w-5 h-5 shrink-0" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <div class="px-4 py-3 border-t border-(--ui-border) shrink-0">
      <p class="text-xs text-(--ui-text-muted)">OROMAPAS · v1.0.0 · 2025</p>
    </div>
  </aside>
</template>
