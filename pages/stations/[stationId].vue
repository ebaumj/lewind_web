<template>
    <div>
      <Transition name="station-detail" mode="out-in">
        <Suspense>
            <StationDetailView :id="stationId" />
            <template #fallback>
                <StationDetailViewSkeleton />
            </template>
        </Suspense>
      </Transition>
    </div>
</template>

<script setup>
  const { stationId } = useRoute().params
</script>
  
<style scoped>
.station-detail-enter-active,
.station-detail-leave-active {
  /*transition: all 0.3s;*/
  transition: 300ms ease all;
}
.station-detail-enter-from,
.station-detail-leave-to {
  opacity: 0;
  /*transform: translateX(100%) scale(0.6);*/
  transform: rotateY(180deg);
}
</style>