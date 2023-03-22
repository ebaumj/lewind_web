<template>
    <div class="md:text-4xl text-2xl py-0 px-0 bg-white rounded-md shadow-md w-full h-full">
        <GMapMap :center="center" :zoom="9" class="overflow-clip h-full rounded-md">
            <GMapCluster :zoomOnClick="true" :maxZoom="9">
                <GMapMarker v-for="station in allStations" :visible="station.showMarker" @click="markerClick(station.id)" :key="station.id" :position="{ lat: station.latitude, lng: station.longitude }">
                    <GMapInfoWindow :opened="station.showPreview" :closeclick="true" @closeclick="closePreview(station.id)">
                        <Transition name="station-preview" mode="out-in">
                            <StationPreview v-show="station.previewReady" :name="station.name" :windspeed="station.vent_vitesse" :direction="station.vent_direction" @add-station="addStation(station.id, station.name)" />
                        </Transition>
                    </GMapInfoWindow>
                </GMapMarker>
            </GMapCluster>
        </GMapMap>
    </div>
</template>

<script setup>
const savedStationsLocal = useGetStationsInStorage()
const { data } = (await useFetch("/api/all_stations/"))
if(data == null) {
    throw createError({ statusCode: 404, statusMessage: "Failed to load Map!", fatal: true })
}

const allStations = ref([])
data.value.forEach((station) => {
    station.showMarker = true
    if(savedStationsLocal.value.find(storedStation => storedStation.id === station.id))
        station.showMarker = false
    station.previewReady = false
    station.showPreview = false
    station.name = ""
    allStations.value.push(station)
})

const center = {lat: 47.01, lng: 6.987}
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => { 
    center.lat = position.coords.latitude
    center.lng = position.coords.longitude
  });
}

const openedPreview = ref(null)
const markerClick = async (id) => {
    if(allStations.value.find(station => station.id === id).showMarker) {
        closePreview(openedPreview.value)
        const station = allStations.value.find(station => station.id === id)
        station.showPreview = true
        station.previewReady = false
        const { data } = (await useFetch("/api/station_details/" + id))
        station.name = data.value.name
        station.vent_vitesse = data.value.vent_vitesse
        station.vent_direction = data.value.vent_direction
        station.previewReady = true
        openedPreview.value = id
    }
}

const closePreview = (id) => {
    if(openedPreview.value !== null)
        allStations.value.find(station => station.id === id).showPreview = false
    openedPreview.value = null
}

const hideMarker = (id) => {
    allStations.value.find(station => station.id === id).showMarker = false
}

const addStation = (id, name) => {
    savedStationsLocal.value.push({id: id, name: name })
    useSetStationsInStorage(savedStationsLocal.value)
    closePreview(id)
    setTimeout(()=>hideMarker(id), 50)  // This way, the Info Window closes immediately
}
</script>

<style scoped>
.station-preview-enter-active {
  transition: 300ms ease all;
}
.station-preview-enter-from {
    opacity: 0;
  transform: rotateY(90deg);
}
</style>