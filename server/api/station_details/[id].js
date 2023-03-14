export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const uri = 'https://letskite.ch/datas/station/' + id

    const data = await $fetch(uri)

    if(!data)
        sendError(event, createError({ statusCode: 404, statusMessage: "Wind Station not found!" }))
    else
        return data

})