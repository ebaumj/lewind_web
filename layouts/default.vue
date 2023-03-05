<template>
    <div class="min-h-screen bg-rose_very_light">
      <header class="shadow-sm bg-white ">
        <ApplicationHeader />
      </header>
      <!-- page content in slot -->
      <div class="mx-auto py-8 px-4 sm:px-6 lg:px-8"><slot /></div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>