<template>
    <NuxtLink :to="`stations/${station.id}`">
        <div class="min-ws-500 flex py-0 px-0 bg-white rounded-md shadow-md cursor-pointer min-w-500">
            <div class="flex flex-col flex-1 justify-center">
                <h2 class="md:text-2xl text-xl px-4">{{ station.name ? station.name : windData.name }}</h2>
                <h3 class="md:text-1xl text-md px-4">{{ windData.wind_speed }} kts</h3>
            </div>
            <div class="flex flex-col gap-2 w-2/12">
                <ColorGradient :windspeed="windData.wind_speed" direction="to-l">
                    <div class="py-10  items-start">
                        <WindArrow :rotation="windData.wind_direction"/>
                    </div>
                </ColorGradient>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
const { station } = defineProps(['station'])
const { data } = await useFetch("/api/station_details/" + station.id)
const windData = data.value
</script>

<style lang="scss" scoped>

</style>