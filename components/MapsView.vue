<template>
    <div class="md:text-4xl text-2xl py-0 px-0 bg-white rounded-md shadow-md w-full h-full">
        <GMapMap :center="center" :zoom="9" class="overflow-clip h-full rounded-md">
            <GMapCluster :zoomOnClick="true" :maxZoom="9">
                <GMapMarker v-for="station in filteredStations" @click="markerClick(station.id)" :key="station.id" :position="{ lat: station.latitude, lng: station.longitude }">
                    <GMapInfoWindow :opened="infoWindowId === station.id" :closeclick="true" @closeclick="markerClick(null)">
                        <Transition name="station-preview" mode="out-in">
                            <StationPreview v-if="preview" :name="stationPreview.name" :windspeed="stationPreview.vent_vitesse" :direction="stationPreview.vent_direction" @add-station="addStation(station.id)" />
                        </Transition>
                        <span v-if="!preview">loading...</span>
                    </GMapInfoWindow>
                </GMapMarker>
            </GMapCluster>
        </GMapMap>
    </div>
</template>

<script setup>
// Load Stations from memory
const myStations = ref([])
if(localStorage.getItem('windStations')) {
    myStations.value = JSON.parse(localStorage.getItem('windStations'))
}
// Load stations from Serve and Filter
const isInStorage = (id) => {
    var inStorage = false
    myStations.value.forEach(myStation => {
        if(myStation.id === id) {
            inStorage = true
        }
    })
    return inStorage
}
const allStations = (await useFetch("/api/all_stations/")).data.value

if(allStations == null) {
    throw createError({ statusCode: 404, statusMessage: "Failed to load Map!", fatal: true })
}

const filteredStations = ref([])
const preview = ref(false)
filteredStations.value = allStations.filter((station) => !isInStorage(station.id))

const infoWindowId = ref(null)
const stationPreview = ref({
    name: "",
    vent_vitesse: 0,
    vent_direction: 0
})

const center = {lat: 47.01, lng: 6.987}
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => { 
    center.lat = position.coords.latitude
    center.lng = position.coords.longitude
  });
}

const markerClick = async (id) => {
    preview.value = false
    infoWindowId.value = id
    if(id != null) {
        stationPreview.value = (await useFetch("/api/station_details/" + id)).data.value
        preview.value = true
    }
}

const addStation = (id) => {
    myStations.value.push({id: id, name: stationPreview.name })
    localStorage.setItem('windStations', JSON.stringify(myStations.value))
    markerClick(null)
    filteredStations.value = allStations.filter((station) => !isInStorage(station.id))
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