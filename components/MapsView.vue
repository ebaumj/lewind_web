<template>
    <div class="md:text-4xl text-2xl py-0 px-0 bg-white rounded-md shadow-md w-full h-full">
        <GMapMap :center="center" :zoom="9" class="overflow-clip h-full rounded-md">
            <GMapCluster :zoomOnClick="true" :maxZoom="9">
                <GMapMarker v-for="station in allStations" :visible="station.showMarker" @click="markerClick(station.id)" :key="station.id" :position="{ lat: station.latitude, lng: station.longitude }"
                :icon="{url: markerIcon, scaledSize: {width: 80, height: 43}}">
                    <GMapInfoWindow :opened="station.showPreview" :closeclick="true" @closeclick="closePreview(station.id)">
                        <Transition name="station-preview" mode="out-in">
                            <StationPreview v-show="station.previewReady" :name="station.name" :windspeed="station.wind_speed" :direction="station.wind_direction" @add-station="addStation(station.id, station.name)" />
                        </Transition>
                    </GMapInfoWindow>
                </GMapMarker>
            </GMapCluster>
        </GMapMap>
    </div>
</template>

<script setup>
import markerIcon from '~/assets/images/iconMapS.png'

const savedStationsLocal = ref(await useStorage().getAllStations())

const config = useRuntimeConfig().public

const limit = 50000

const { data } = await useFetch('https://search.letskite.ch/indexes/stations/search', {
    method: 'get', 
    //mode: 'cors', 
    cache: 'no-cache', 
    query: { limit: limit, attributesToRetrieve: 'id,name,wind,direction,windcolor,_geo' },
    headers: {
        'Authorization': `Bearer ${config.LETSKITE_API_TOKEN}`,
        'Accept': "application/json"
    }
})

//const { data } = (await useFetch("/api/all_stations/"))
if(data.value == null) {
    throw createError({ statusCode: 404, statusMessage: "Failed to load Map!", fatal: true })
}

const allStations = ref([])
data.value.hits.forEach((station) => {
    let showMarker = true
    if(savedStationsLocal.value.find(storedStation => storedStation.id === station.id))
        showMarker = false
    allStations.value.push({ 
        id: station.id, 
        name: station.name,
        latitude: station._geo.lat, 
        longitude: station._geo.lng, 
        wind_direction: station.direction, 
        wind_speed: station.wind,
        showMarker: showMarker,
        previewReady: false,
        showPreview: false
    })
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
        /*const { data } = (await useFetch("/api/station_details/" + id))
        station.name = data.value.name
        station.vent_vitesse = data.value.vent_vitesse
        station.vent_direction = data.value.vent_direction*/
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
    savedStationsLocal.value = useStorage().addStation(id, name)
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