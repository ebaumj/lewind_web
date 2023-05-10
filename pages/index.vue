<template>
    <div>
        <div class="container my-0 mx-auto px-0 md:px-4">
            <div class="flex flex-wrap -mx-1 lg:-mx-4">
                <div v-for="windStation in savedStations" :key="windStation.id" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 gap-2">
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
                <div v-if="!isMounted" class="flex justify-center text-center w-full text-lg">mounting...</div>
                <div v-else>
                    <div v-if="savedStations.length === 0" class="flex justify-center text-center w-full text-lg">You're not observing any Spots yet. Go to Map to pick your Wind Stations.</div>
                    <div v-if="savedStations.length === 0 && !useAuthentification().isLoggedIn()" class="flex justify-center text-center w-full text-lg">Log in to synchronize your Wind Stations.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const isMounted = ref(false)
const savedStations = ref([])

onMounted(async () => {
    isMounted.value = true
    savedStations.value = await useStorage().getAllStations()
    savedStations.value.sort((a, b) => { return a.index - b.index })
    useAuthentification().onAuthStateChangedCallback(async () => {
        savedStations.value = await useStorage().getAllStations()
        savedStations.value.sort((a, b) => { return a.index - b.index })
    }, "Index")
});
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