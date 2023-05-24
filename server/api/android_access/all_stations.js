export default defineEventHandler(async (event) => {
    const { stations } = await $fetch('https://letskite.ch/datas/map/stations/')
    if(!stations)
        sendError(event, createError({ statusCode: 404, statusMessage: "Failed to load Map!" }))
    else
        return stations.map((station) => { return { id: station.id, latitude: station.latitude, longitude: station.longitude, wind_direction: station.vent_direction, wind_speed: station.vent_vitesse } } )
})