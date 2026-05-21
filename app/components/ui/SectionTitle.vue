<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div>
    <h2 class="text-base font-semibold text-(--ui-text-highlighted)">{{ title }}</h2>
    <p v-if="subtitle" class="text-sm text-(--ui-text-muted) mt-0.5">{{ subtitle }}</p>
  </div>
</template>
