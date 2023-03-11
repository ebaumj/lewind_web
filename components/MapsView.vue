<template>
    <div class="md:text-4xl text-2xl py-0 px-0 bg-white rounded-md shadow-md w-full h-full">
        <GMapMap :center="center" :zoom="9" class="overflow-clip h-full rounded-md">
            <GMapCluster :zoomOnClick="true" :maxZoom="9">
                <GMapMarker v-for="station in filteredStations" @click="markerClick(station.id)" :key="station.id" :position="{ lat: station.latitude, lng: station.longitude }">
                    <GMapInfoWindow :opened="infoWindow.id.value === station.id" :closeclick="true" @closeclick="markerClick(null)">
                        <div class="items-center justify-center">
                            <div class="text-2xl items-center justify-center mb-2 flex">{{ infoWindow.name.value }}</div>
                            <WindArrow :rotation="infoWindow.directoin" class="items-center flex justify-center mb-2" />
                            <div class="text-lg flex items-center justify-center mb-4">
                                <ColorGradient :windspeed="infoWindow.windspeed.value" direction="to-t" class="overflow-clip" addClass="rounded-md p-4">{{ infoWindow.windspeed.value }}kts</ColorGradient>
                            </div>
                            <div class="flex items-center justify-center mb-2 text-rose_red"><button @click="addStation(station.id)" class="flex hover:bg-rose_light py-2 md:px-4 px-2 border border-rose_red rounded shadow text-lg items-center justify-center">
                                <i class="material-icons mr-2 mb-0 pb-0 text-xl">add_circle</i>Add to my List
                            </button></div>
                        </div>
                    </GMapInfoWindow>
                </GMapMarker>
            </GMapCluster>
        </GMapMap>
    </div>
</template>

<script setup>
const myStations = ref([])
if(localStorage.getItem('windStations')) {
    myStations.value = JSON.parse(localStorage.getItem('windStations'))
}
const isInStorage = (id) => {
    var inStorage = false
    myStations.value.forEach(myStation => {
        if(myStation.id === id) {
            console.log("Exclude " + id)
            inStorage = true
        }
    })
    return inStorage
}
const center = {lat: 0, lng: 0}
const infoWindow = {
    id: ref(null),
    name: ref(null),
    windspeed: ref(null),
    direction: ref(null)
}
if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => { 
    center.lat = position.coords.latitude
    center.lng = position.coords.longitude
  });
}

const allStations = (await useFetch("/api/all_stations/")).data.value
const filteredStations = ref([])
filteredStations.value = allStations.filter((station) => !isInStorage(station.id))
console.log(filteredStations)
const markerClick = async (id) => {
    infoWindow.id.value = id
    if(id != null) {
        const windData = (await useFetch("/api/station_details/" + id)).data.value
        infoWindow.name.value = windData.name
        infoWindow.windspeed.value = windData.vent_vitesse
        infoWindow.direction.value = windData.vent_direction
        console.log(windData.name)
    }
}

const addStation = (id) => {
    myStations.value.push({id: id, name: infoWindow.name })
    localStorage.setItem('windStations', JSON.stringify(myStations.value))
    markerClick(null)
    filteredStations.value = allStations.filter((station) => !isInStorage(station.id))
}
</script>

<style scoped>

</style>