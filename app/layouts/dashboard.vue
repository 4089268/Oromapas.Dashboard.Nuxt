<template>
  <div class="flex min-h-screen bg-(--ui-bg-subtle)">
    <div class="flex-1 flex flex-col min-w-0">
      <LayoutAppHeader />
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>
