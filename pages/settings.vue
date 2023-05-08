<template>
    <div class="justify-center flex">
        <div class="md:text-4xl text-2xl md:pb-6 pb-4 p-6 bg-white rounded-md shadow-md w-full max-w-4xl">
            <div class="flex justify-center items-center w-full mb-6"><h1 class="flex justify-center font-semibold">Your observed Stations</h1></div>
            <div class="container my-0 mx-auto px-0 md:px-4">
                <draggable class="flex flex-wrap -mx-1 lg:-mx-4" v-model="savedStations" item-key="element.id" ghost-class="moving-card" :animation="300" @change="changeIndex">
                    <template #item="{ element: windStation, index }">
                        <div class="md:p-4 p-2 my-1 w-full md:w-1/2 lg:my-4 lg:w-1/3 gap-2 bg-rose_light shadow-md rounded-lg cursor-move">
                            <div class="overflow-hidden">
                                <div class="flex">
                                    <div class="mr-2 items-center justify-center flex"><IconsMove class="fill-rose_dark opacity-50" /></div>
                                    <input @input="windStation.changed = true" v-model="windStation.name" type="text" :name="`name_${index}`" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 " placeholder="Password" required>
                                    <button v-if="windStation.changed" @click="updateName(windStation)" class="ml-2 text-lg flex hover:bg-rose_dark_red bg-rose_red text-white py-1 px-2 rounded shadow text-lg items-center justify-center"><IconsSave class="fill-white" /></button>
                                    <button v-else @click="updateName(windStation)" class="ml-2 text-lg flex hover:bg-rose_dark_red bg-rose_dark text-white py-1 px-2 rounded shadow text-lg items-center justify-center"><IconsSave class="fill-white" /></button>
                                    <button @click="removeStation(windStation.id)" class="ml-2 text-lg flex hover:bg-rose_dark_red bg-rose_red text-white py-1 px-2 rounded shadow text-lg items-center justify-center"><IconsDelete class="fill-white" /></button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #footer>
                        <button v-if="orderChanged" @click="saveOrder" class="w-full text-lg flex hover:bg-rose_dark_red bg-rose_red text-white mt-2 py-1 px-2 rounded shadow items-center justify-center" >Save</button>
                        <button v-else @click="saveOrder" class="w-full text-lg flex hover:bg-rose_dark_red bg-rose_dark text-white mt-2 py-1 px-2 rounded shadow items-center justify-center">Save</button>
                    </template>
                </draggable>
            </div>
        </div>
        <BaseModal :show="modalShow" @close-modal="modalShow = false" :title="modalTitle" :message="modalMessage" />
    </div>
</template>

<script setup>
const modalShow = ref(false)
const modalMessage = ref("")
const modalTitle = ref("")
const orderChanged = ref(false)

const savedStations = ref((await useStorage().getAllStations()).map((station) => { return { id: station.id, name: station.name, changed: false, index: station.index } }))
savedStations.value.sort((a, b) => a.index - b.index)

useAuthentification().onAuthStateChangedCallback(async () => {
    savedStations.value = (await useStorage().getAllStations()).map((station) => { return { id: station.id, name: station.name, changed: false, index: station.index } })
    savedStations.value.sort((a, b) => a.index - b.index)
}, "StationNames")

const updateName = async (station) => {
    await useStorage().changeStationName(station.id, station.name)
    station.changed = false
}

const removeStation = async (id) => {
    await useStorage().removeStation(id)
    savedStations.value = savedStations.value.filter((station) => station.id != id)
}

const changeIndex = (arg) => {
    orderChanged.value = true
    savedStations.value.forEach(async (item, index) => { item.index = index })
}

const saveOrder = () => {
    savedStations.value.forEach(async (item) => { await useStorage().changeStationIndex(item.id, item.index) })
    orderChanged.value = false
}
</script>

<style scoped>
.moving-card {
  opacity: 50%;
}
</style>