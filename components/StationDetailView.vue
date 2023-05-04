<template>
    <div class="md:text-4xl text-2xl min-h-screen py-0 px-0 bg-white rounded-md shadow-md w-full">
        <div class="md:px-4 px-2 py-8 justify-center flex w-full">
            <h1>{{ name ? name : windData.name }}</h1>
        </div>
        <div class="container my-2 mx-auto px-0 md:px-4 grid md:grid-cols-2 grid-cols-1">
            <div class="md:mx-16 mb-0 justify-center items-center md:p-20 p-8">
                <div class="square bg-rose bg-contain bg-no-repeat justify-center items-center">
                    <img class="square flex justify-center items-center" src="~/assets/images/compass_inside.png" :style="{transform: `rotate(${parseInt(windData.wind_direction) + 180}deg)`}">
                </div>
                <div class="flex justify-center items-center mt-10 text-bold">{{ windData.wind_direction_text }} {{ windData.wind_direction }}&deg</div>
            </div> 
            <div class="w-full flex items-center">
                <div class="w-full md:px-6 px-2 grid grid-rows-2 items-center">
                    <div class="grid grid-cols-2 md:gap-6 gap-2 md:mb-6 mb-4">
                        <div class="shadow-inner rounded-md bg-rose_very_light">
                            <ColorGradient :windspeed="windData.wind_speed" direction="to-t" class="overflow-clip" addClass="rounded-md">
                                <div class="flex justify-center items-center md:pt-10 pt-4 mb-1 md:text-xl text-sm">Wind Average</div>
                                <div class="flex justify-center items-center md:pb-10 pb-4">{{ windData.wind_speed }} kts</div>
                            </ColorGradient>
                        </div>
                        <div class="shadow-inner rounded-md bg-rose_very_light">
                            <ColorGradient :windspeed="windData.wind_gust" direction="to-t" class="overflow-clip" addClass="rounded-md">
                                <div class="flex justify-center items-center md:pt-10 pt-4 mb-1 md:text-xl text-sm">Wind Gust</div>
                                <div class="flex justify-center items-center md:pb-10 pb-4">{{ windData.wind_gust }} kts</div>
                            </ColorGradient>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 md:gap-6 gap-2">
                        <div class="shadow-inner rounded-md bg-rose_very_light">
                            <div class="flex justify-center items-center md:pt-10 pt-4 mb-1 md:text-xl text-sm">Temperature</div>
                            <div class="flex justify-center items-center md:pb-10 pb-4 md:text-4xl text-xl">{{ windData.temperature }}&degC</div>
                        </div>
                        <div class="shadow-inner rounded-md bg-rose_very_light">
                            <div class="flex justify-center items-center md:pt-10 pt-4 mb-1 md:text-xl text-sm">Humidity</div>
                            <div class="flex justify-center items-center md:pb-10 pb-4 md:text-4xl text-xl">{{ windData.humidity }}%</div>
                        </div>
                        <div class="shadow-inner rounded-md bg-rose_very_light">
                            <div class="flex justify-center items-center md:pt-10 pt-4 mb-1 md:text-xl text-sm">Preassure</div>
                            <div class="flex justify-center items-center md:pb-10 pb-4 md:text-4xl text-xl">{{ windData.preassure }}hPa</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr class="py-4">
        <UiElementsDropdown class="px-4 justify-center flex" :options="dropdownHistoryOptions" :startIndex="startIndex" @index-changed="(index) => dropdownHistoryIndexChanged(index)"></UiElementsDropdown>
        <h2 class="flex justify-center mb-8 mt-8 md:text-4xl text-xl">Average Wind and Gusts Hisytory</h2>
        <div class="px-4 pb-4 flex justify-center w-full">
            <Chart class="flex justify-center w-full md:max-w-6xl" :key="idWind" :lines="datasetsChart1" :legend="pointsTime" :maximum="maximumWind"/>
        </div>
        <h2 class="flex justify-center md:mt-8 mt-0 my-8 md:text-4xl text-xl">Wind Direction Hisytory</h2>
        <div class="px-4 pb-4 flex justify-center w-full my-8">
            <Chart class="flex justify-center w-full md:max-w-6xl" :key="idDir" :lines="datasetsChart2" :legend="pointsTime" :maximum="maximumDirection" :valueToText="directionToText"/>
        </div>
        <div class="mt-8 text-white">..</div>
    </div>
</template>

<script setup>
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'

const dropdownHistoryOptions = ["Last 6 hours", "Last 12 hours", "Last 24 hours", "Last 48 hours"]
const startIndex = 3

const colors = resolveConfig(tailwindConfig).theme.colors

const { id, name } = defineProps(['id', 'name'])
const windData = (await useFetch("/api/station_details/" + id)).data.value
const history = (await useFetch("/api/station_history/" + id)).data.value

const idWind = ref(0)
const idDir = ref(0)

if(windData == null) {
    throw createError({ statusCode: 404, statusMessage: "Wind Station not found!", fatal: true })
}

const pointsTime = []
const pointsAvg = []
const pointsGust = []
const pointsDirection = []
const now = new Date()

const dropdownHistoryIndexChanged = (newIndex) => {
    let date = new Date(now)
    if(newIndex === 0)
        date = date.setHours(date.getHours() - 6)
    if(newIndex === 1)
        date = date.setHours(date.getHours() - 12)
    if(newIndex === 2)
        date = date.setHours(date.getHours() - 24)
    if(newIndex === 3)
        date = date.setHours(date.getHours() - 48)
    pointsTime.length = 0
    pointsAvg.length = 0
    pointsGust.length = 0
    pointsDirection.length = 0
    history.map((element) => {
        if(new Date(element[0]) >= date) {
            pointsTime.push(new Date(element[0]).toLocaleString('ch-de', { weekday: 'short' , hour: '2-digit', minute: '2-digit' }))
            pointsAvg.push(element[1])
            pointsGust.push(element[2])
            pointsDirection.push(parseInt(element[3]))
        }
    })
    idWind.value++
    idDir.value++
}

dropdownHistoryIndexChanged(startIndex)

/*history.map((element, key) => {
    pointsTime.push(new Date(element[0]).toLocaleString('ch-de', { weekday: 'short' , hour: '2-digit', minute: '2-digit' }))
    pointsAvg.push(element[1])
    pointsGust.push(element[2])
    pointsDirection.push(parseInt(element[3]))
});*/

const maximumWind = Math.max(...pointsGust) * 1.2
const maximumDirection = 360

const getGradient = (ctx, chartArea, chart) => {
    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
        let yMax = 52;
        if(chart.scales.y.max < 52)
            yMax = chart.scales.y.max
        for(let i = 0; i <= 52 && i < chart.scales.y.max; i += 2) {
            gradient.addColorStop((i / yMax), colors.wind[i])
        }
    }

    return gradient;
}

const colorFunction = (context) => {
    const chart = context.chart;
    const {ctx, chartArea} = chart;

    if (!chartArea) {
        // This case happens on initial chart load
        return;
    }
    return getGradient(ctx, chartArea, chart);
}



const datasetsChart1 = [
    {
        label: 'Average Wind',
        borderColor: colorFunction,
        data: pointsAvg,
        tension: 0.4,
        pointStyle: false,
    },
    {
        label: 'Wind Gusts',
        borderColor: colorFunction,
        data: pointsGust,
        tension: 0.4,
        pointStyle: false,
    },
]

const datasetsChart2 = [
    {
        label: 'Wind Direction',
        borderColor: colors.rose_dark,
        data: pointsDirection,
        tension: 0.2,
        pointStyle: false,
    },
]

const directionToText = (value) => {
    const directionText = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    let index = Math.floor((value + 11.5) / 22.5)
    if(index > 15)
        index = 0
    return directionText[index]
}

</script>

<style lang="scss" scoped>

</style>