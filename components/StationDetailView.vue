<template>
    <div class="py-0 px-0 bg-white rounded-md shadow-md w-full">
        <div class="px-4 py-8 justify-center flex w-full">
            <h1 class="text-4xl text-400">{{ windData.name }}</h1>
        </div>
        <div class="container my-0 mx-auto px-0 md:px-4 grid md:grid-cols-2 sm:grid-cols-1">
                <div class="mt-8 -mb-20 px-0 flex justify-center" style="position: relative; left: 0; top: 0;">
                    <div class="h-4/6" style="position: relative; top: 0; left: 0;"><img class="h-4/6" src="~/assets/images/compass_outside.png"></div>
                    <div class="h-3/6" style="position: absolute; top: 10%; left: 100;"><img class="h-3/6" src="~/assets/images/compass_inside.png" :style="{transform: `rotate(${windData.vent_direction + 180}deg)`}"></div>
                </div>
                <div class="bg-black text-white -mt-20">Janis</div>
        </div>
    </div>
</template>

<script setup>
const { id } = defineProps(['id'])
const windData = (await useFetch("/api/station_details/" + id)).data.value
const history = (await useFetch("/api/station_history/" + id)).data
await new Promise((res) => setTimeout(res, 700))
console.log(windData)
console.log(history)
</script>

<style lang="scss" scoped>

</style>