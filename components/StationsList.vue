<template>
    <div>
        <div class="container my-0 mx-auto px-0 md:px-4">
            <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <div v-for="windStation in windStations" :key="windStation.id" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 gap-2">
                <div class="overflow-hidden rounded-lg shadow-lg"><StationCard :station="windStation" /></div>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
const windStations = ref([])
if(localStorage.getItem('windStations')) {
  windStations.value = JSON.parse(localStorage.getItem('windStations'))
}
</script>

<style lang="scss" scoped>

</style>