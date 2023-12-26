export default defineEventHandler(async (event) => {

    //const { stations } = await $fetch('https://letskite.ch/datas/map/stations/')

    const config = useRuntimeConfig().secrets

    const limit = 50000

    const { hits } = await $fetch('https://search.letskite.ch/indexes/stations/search', {
        method: 'get', 
        //mode: 'cors', 
        cache: 'no-cache', 
        query: { limit: limit, attributesToRetrieve: 'id,name,wind,direction,windcolor,_geo' },
        headers: {
            'Authorization': `Bearer ${config.LETSKITE_API_TOKEN}`,
            'Accept': "application/json"
        }
    })

    if(!hits)
        sendError(event, createError({ statusCode: 404, statusMessage: "Failed to load Map!" }))
    else
        return hits.map((station) => { return { 
            id: station.id, 
            name: station.name,
            latitude: station._geo.lat, 
            longitude: station._geo.lng, 
            wind_direction: station.direction, 
            wind_speed: station.wind 
        } } )
})