<script setup lang="ts">
const props = defineProps<{
  title: string
  value: string | number
  subtitle?: string
  icon: string
  iconColor?: string
  trend?: number
  trendLabel?: string
  pending?: boolean
}>()

const trendColor = computed(() => {
  if (props.trend === undefined) return 'neutral'
  if (props.trend > 0) return 'success'
  if (props.trend < 0) return 'error'
  return 'neutral'
})

const trendIcon = computed(() => {
  if (props.trend === undefined) return ''
  if (props.trend > 0) return 'i-lucide-trending-up'
  if (props.trend < 0) return 'i-lucide-trending-down'
  return 'i-lucide-minus'
})
</script>

<template>
  <UCard class="hover:shadow-md transition-shadow relative">
    <UBadge
      v-if="pending"
      color="warning"
      variant="subtle"
      size="xs"
      icon="i-lucide-clock"
      class="absolute top-2 right-2 z-10"
    >
      Próximamente
    </UBadge>
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-(--ui-text-muted) uppercase tracking-wide truncate">{{ title }}</p>
        <p class="text-2xl font-bold text-(--ui-text-highlighted) mt-1 truncate">{{ value }}</p>
        <p v-if="subtitle" class="text-xs text-(--ui-text-muted) mt-1">{{ subtitle }}</p>
        <div v-if="trend !== undefined" class="flex items-center gap-1 mt-2">
          <UBadge
            :color="trendColor"
            variant="subtle"
            size="sm"
            :icon="trendIcon"
          >
            {{ formatPercent(trend) }}
          </UBadge>
          <span v-if="trendLabel" class="text-xs text-(--ui-text-muted)">{{ trendLabel }}</span>
        </div>
      </div>
      <div
        class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        :class="iconColor ?? 'bg-primary-100 dark:bg-primary-900/30'"
      >
        <UIcon :name="icon" class="w-5 h-5" :class="iconColor ? 'text-white' : 'text-primary-600 dark:text-primary-400'" />
      </div>
    </div>
  </UCard>
</template>
