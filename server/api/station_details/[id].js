export default defineEventHandler(async (event) => {
    const data = await $fetch('https://letskite.ch/datas/station/' + event.context.params.id) 
    if(!data)
        sendError(event, createError({ statusCode: 404, statusMessage: "Wind Station not found!" }))
    else
        return { 
            id: data.id,
            name: data.name,
            humidity: data.humidite,
            preassure: data.pression,
            wind_direction: data.vent_direction,
            wind_direction_text: data.vent_direction_cardinal,
            wind_speed: data.vent_vitesse,
            wind_gust: data.vent_rafale,
            last_update: data.last_update,
            last_update_min: data.last_update_min,
            source_link: data.source_lien,
            latitute: data.latitute,
            longitude: data.longitude,
            temperature: data.temp 
        }
})