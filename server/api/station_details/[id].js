export default defineEventHandler(async (event) => {

    const { id } = event.context.params

    const uri = 'https://letskite.ch/datas/station/' + id

    const data = await $fetch(uri)

    return data

})