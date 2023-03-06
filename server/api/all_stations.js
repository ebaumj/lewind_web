export default defineEventHandler(async () => {

    const { stations } = await $fetch('https://letskite.ch/datas/map/stations/')

    return stations
})