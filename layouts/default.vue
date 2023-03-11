<template>
    <div class="min-h-screen bg-rose_very_light flex-col">
      <header class="shadow-sm bg-white">
        <ApplicationHeader />
      </header>
      <!-- page content in slot -->
      <div class="mx-auto md:py-8 py-4 md:px-6 lg:px-8 px-4 h-[calc(100vh-64px)] overflow-auto"><slot /></div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>