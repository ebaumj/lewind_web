<template>
    <div class="h-full">
      <Transition name="station-map" mode="out-in">
        <Suspense>
            <MapsView />
            <template #fallback>
                <MapsViewSkeleton />
            </template>
        </Suspense>
      </Transition>
    </div>
</template>

<script setup>
definePageMeta({ authRequired: false })
</script>

<style scoped>
.station-map-enter-active,
.station-map-leave-active {
  /*transition: all 0.3s;*/
  transition: 300ms ease all;
}
.station-map-enter-from,
.station-map-leave-to {
  opacity: 0;
  /*transform: translateX(100%) scale(0.6);*/
  transform: rotateY(180deg);
}
</style>