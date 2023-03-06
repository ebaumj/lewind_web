<template>
    <div class="py-0 px-0 bg-white rounded-md shadow-md w-full">
        <div class="px-4 py-8 justify-center flex w-full">
            <h1 class="text-4xl text-400">{{ windData.name }}</h1>
        </div>
        <div class="min-h-screen container my-2 mx-auto px-0 md:px-4 grid md:grid-cols-2 sm:grid-cols-1">
            <div class="lg:mx-20 md:mx-16 mx-10 sm:mb-20 justify-center items-center md:p-20">
                <div class="square bg-rose bg-contain bg-no-repeat justify-center items-center">
                    <img class="square flex justify-center items-center" src="~/assets/images/compass_inside.png" :style="{transform: `rotate(${windData.vent_direction + 180}deg)`}">
                </div>
                <div class="flex justify-center items-center text-4xl mt-10 text-bold">{{ windData.vent_direction_cardinal }} {{ windData.vent_direction }}&deg</div>
            </div> 
            <div class="w-full h-full flex">
                <div class="w-full h-full md:px-10 grid grid-rows-2 items-center">
                    <div class="grid grid-cols-2 md:gap-10 gap-4 mb-14">
                        <div class="shadow-inner rounded-md bg-rose_very_light">
                            <ColorGradient :windspeed="windData.vent_vitesse" direction="to-t" class="overflow-clip" addClass="rounded-md">
                                <div class="flex justify-center items-center pt-10 mb-1 text-xl">Wind Average</div>
                                <div class="flex justify-center items-center pb-10 text-4xl">{{ windData.vent_vitesse }} kts</div>
                            </ColorGradient>
                        </div>
                        <div class="shadow-inner rounded-md bg-rose_very_light">
                            <ColorGradient :windspeed="windData.vent_rafale" direction="to-t" class="overflow-clip" addClass="rounded-md">
                                <div class="flex justify-center items-center pt-10 mb-1 text-xl">Wind Gust</div>
                                <div class="flex justify-center items-center pb-10 text-4xl">{{ windData.vent_rafale }} kts</div>
                            </ColorGradient>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 md:gap-6 gap-3">
                        <div class="shadow-inner rounded-md bg-rose_very_light">
                            <div class="flex justify-center items-center pt-10 mb-1 text-xl">Wind Average</div>
                            <div class="flex justify-center items-center pb-6 text-4xl">{{ windData.vent_vitesse }} kts</div>
                        </div>
                        <div class="shadow-inner rounded-md bg-rose_very_light">
                            <div class="flex justify-center items-center pt-10 mb-1 text-xl">Wind Gust</div>
                            <div class="flex justify-center items-center pb-10 text-4xl">{{ windData.vent_rafale }} kts</div>
                        </div>
                        <div class="shadow-inner rounded-md bg-rose_very_light">
                            <div class="flex justify-center items-center pt-10 mb-1 text-xl">Wind Gust</div>
                            <div class="flex justify-center items-center pb-10 text-4xl">{{ windData.vent_rafale }} kts</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-full flex px-4 pb-4 justify-center">
            <Chart class="w-full" :lines="datasetsChart1" :legend="pointsTime"/>
        </div>
    </div>
</template>

<script setup>
const { id } = defineProps(['id'])
const windData = (await useFetch("/api/station_details/" + id)).data.value
const history = (await useFetch("/api/station_history/" + id)).data.value
//await new Promise((res) => setTimeout(res, 700))

const pointsTime = []
const pointsAvg = []
const pointsGust = []
const pointsDirection = []

console.log(history)

history.map((element, key) => {
    pointsTime.push(new Date(element[0]).toLocaleTimeString('ch-de', { hour: '2-digit', minute: '2-digit' }))
    pointsAvg.push(element[1])
    pointsGust.push(element[2])
    pointsDirection.push(element[3])
});

const datasetsChart1 = [
    {
      label: 'Average Wind',
      backgroundColor: '#1C2834',
      borderColor: '#1C2834',
      data: pointsAvg,
      tension: 0.4,
      pointStyle: false,
    },
    {
      label: 'Wind Gusts',
      backgroundColor: '#C80000',
      borderColor: '#C80000',
      data: pointsGust,
      tension: 0.4,
      pointStyle: false,
    },
  ]



</script>

<style lang="scss" scoped>

</style>