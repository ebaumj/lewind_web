export default defineEventHandler(async (event) => {
    const data = await $fetch('https://letskite.ch/datas/station/' + event.context.params.id) 
    if(!data)
        sendError(event, createError({ statusCode: 404, statusMessage: "Wind Station not found!" }))
    else
        return data
})