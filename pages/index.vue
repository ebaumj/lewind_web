<template>
  <Suspense>
    <StationsList />
    <template #fallback>
      <StationCardSkeleton />
    </template>
  </Suspense>
</template>

<script setup>

</script>