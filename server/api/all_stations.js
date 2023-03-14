export default defineEventHandler(async (event) => {

    const { stations } = await $fetch('https://letskite.ch/datas/map/stations/')

    if(!stations)
        sendError(event, createError({ statusCode: 404, statusMessage: "Failed to load Map!" }))
    else
        return stations
})