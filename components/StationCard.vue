<template>
    <NuxtLink :to="`stations/${station.id}`">
        <div class="min-ws-500 flex py-0 px-0 bg-white rounded-md shadow-md cursor-pointer min-w-500">
            <div class="flex flex-col flex-1 justify-center">
                <h2 class="md:text-2xl text-xl px-4">{{ windData.name }}</h2>
                <h3 class="md:text-1xl text-md px-4">{{ windData.vent_vitesse }} kts</h3>
            </div>
            <div class="flex flex-col gap-2 w-2/12">
                <ColorGradient :windspeed="windData.vent_vitesse" direction="to-l">
                    <div class="py-10  items-start">
                        <WindArrow :rotation="windData.vent_direction"/>
                    </div>
                </ColorGradient>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
const { station } = defineProps(['station'])
const { data } = await useFetch("/api/station_details/" + station.id)
await new Promise((res) => setTimeout(res, 300))
const windData = data.value
</script>

<style lang="scss" scoped>

</style>