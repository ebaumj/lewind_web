<template>
    <div class="justify-center flex">
        <div class="md:text-4xl text-2xl md:pb-6 pb-4 p-6 bg-white rounded-md shadow-md w-full max-w-4xl">
            <div class="flex justify-center items-center w-full mb-6"><h1 class="flex justify-center font-semibold">Your observed Stations</h1></div>
            <div class="container my-0 mx-auto px-0 md:px-4">
                <div class="flex flex-wrap -mx-1 lg:-mx-4">
                    <div v-for="windStation, index in savedStations" :key="index" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 gap-2">
                        <div class="overflow-hidden">
                            <div class="flex">
                                <input @input="windStation.changed = true" v-model="windStation.name" type="text" :name="`name_${index}`" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 " placeholder="Password" required>
                                <button v-if="windStation.changed" @click="updateName(windStation)" class="ml-2 text-lg flex hover:bg-rose_dark_red bg-rose_red text-white py-1 px-2 border rounded shadow text-lg items-center justify-center"><IconsSave class="fill-white" /></button>
                                <button v-else @click="updateName(windStation)" class="ml-2 text-lg flex hover:bg-rose_dark_red bg-rose_dark text-white py-1 px-2 border rounded shadow text-lg items-center justify-center"><IconsSave class="fill-white" /></button>
                                <button @click="removeStation(windStation.id)" class="ml-2 text-lg flex hover:bg-rose_dark_red bg-rose_red text-white py-1 px-2 border rounded shadow text-lg items-center justify-center"><IconsDelete class="fill-white" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BaseModal :show="modalShow" @close-modal="modalShow = false" :title="modalTitle" :message="modalMessage" />
    </div>
</template>

<script setup>
const modalShow = ref(false)
const modalMessage = ref("")
const modalTitle = ref("")

const savedStations = ref((await useStorage().getAllStations()).map((station) => { return { id: station.id, name: station.name, changed: false } }))

useAuthentification().onAuthStateChangedCallback(async () => {
    savedStations.value = (await useStorage().getAllStations()).map((station) => { return { id: station.id, name: station.name, changed: false } })
}, "StationNames")

const updateName = async (station) => {
    await useStorage().changeStationName(station.id, station.name)
    station.changed = false
}

const removeStation = async (id) => {
    await useStorage().removeStation(id)
    savedStations.value = savedStations.value.filter((station) => station.id != id)
}
</script>

<style scoped>

</style>