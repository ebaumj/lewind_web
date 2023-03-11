<template>
    <div>
        <div class="container my-0 mx-auto px-0 md:px-4">
            <div class="flex flex-wrap -mx-1 lg:-mx-4">
                <div v-for="windStation in windStations" :key="windStation.id" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 gap-2">
                    <div class="overflow-hidden rounded-lg shadow-lg">
                        <Transition name="station-card" mode="out-in">
                            <Suspense>
                                <StationCard :station="windStation" />
                                <template #fallback>
                                    <StationCardSkeleton />
                                </template>
                            </Suspense>
                        </Transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const windStations = ref([])
if(localStorage.getItem('windStations')) {
  windStations.value = JSON.parse(localStorage.getItem('windStations'))
}
</script>

<style scoped>
.station-card-enter-active,
.station-card-leave-active {
  transition: 300ms ease all;
}
.station-card-enter-from,
.station-card-leave-to {
  transform: rotateY(180deg);
}
</style>