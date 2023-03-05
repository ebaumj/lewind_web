<template>
    <div class="min-ws-500 flex py-0 px-0 bg-white rounded-md shadow-md cursor-pointer min-w-500">
        <div class="flex flex-col flex-1 justify-center">
            <h2 class="text-2xl px-4">{{ station.name }}</h2>
            <h3 class="text-1xl px-4">{{ windData.vent_vitesse }} kts</h3>
        </div>
        <div class="flex flex-col gap-2 w-2/12">
            <ColorGradient :windspeed="windData.vent_vitesse" direction="to-l">
                <div class="py-10  items-start">
                    <WindArrow :rotation="windData.vent_direction"/>
                </div>
            </ColorGradient>
        </div>
    </div>
</template>

<script setup>
const { station } = defineProps(['station'])
const uri = 'https://letskite.ch/datas/station/' + station.id
// fetch the product
const { data: windData } = await useFetch(uri)    
//await new Promise((res) => setTimeout(res, 1000))
if(!windData.value) {
    throw createError({ statusCode: 404, statusMessage: "Station not Found", fatal: true })
}
</script>

<style lang="scss" scoped>

</style>