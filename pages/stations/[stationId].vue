<template>
    <div>
      <Transition name="station-detail" mode="out-in">
        <Suspense>
            <StationDetailView :id="stationId" :name="stationName" />
            <template #fallback>
                <StationDetailViewSkeleton />
            </template>
        </Suspense>
      </Transition>
      <button v-show="!stationRemoved" @click="removeFromFavorites" class="md:text-4xl text-2xl py-4 px-0 mt-4 md:mt-8 bg-white rounded-md shadow-md w-full flex items-center justify-center cursor-pointer hover:bg-rose_light text-rose_red">
        Remove Station
      </button>
    </div>
</template>

<script setup>
const gtag = useGtag()
gtag('event', 'screen_view', {
  app_name: 'Le Wind',
  screen_name: 'Station Details'
})

const savedStationsLocal = ref(await useStorage().getAllStations())
const { stationId } = useRoute().params
const stationName = ref(savedStationsLocal.value.filter((station) => station.id == stationId)[0]?.name)
const stationRemoved = ref(savedStationsLocal.value.filter((station) => station.id == stationId).length == 0)

useAuthentification().onAuthStateChangedCallback(async () => {
    savedStationsLocal.value = await useStorage().getAllStations()
    stationName.value = savedStationsLocal.value.filter((station) => station.id == stationId)[0]?.name
    stationRemoved.value = savedStationsLocal.value.filter((station) => station.id == stationId).length == 0
}, "StationId")

const removeFromFavorites = async () => {
    savedStationsLocal.value = await useStorage().removeStation(stationId)
    stationRemoved.value = true
}
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