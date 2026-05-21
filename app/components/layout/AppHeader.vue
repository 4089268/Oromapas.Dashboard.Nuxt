<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val) => { colorMode.preference = val ? 'dark' : 'light' }
})

const formattedDate = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
}).format(new Date())
</script>

<template>
  <header class="flex items-center justify-between h-16 px-4 lg:px-6 border-b border-(--ui-border) bg-(--ui-bg) shrink-0 sticky top-0 z-10">
    <div class="flex items-center gap-3">
      <AppLogo />
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
