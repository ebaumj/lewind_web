export const useGetStationsInStorage = async () => {
    const savedStationsLocal = ref([])
    const savedStationsRemote = ref([])
    const dataInStorage = JSON.parse(localStorage.getItem('windStations'))
    if(dataInStorage && dataInStorage.length > 0)
        savedStationsLocal.value = dataInStorage

    if(useAuthentification().isLoggedIn()) {
        let { data: stations, error } = await useSupabaseClient().from('stations').select('station_id, station_name')
        if(!error)
            savedStationsRemote.value = stations.map((station) => { return { id: station.station_id, name: station.station_name } })
        else
            console.log("Error: " + error.message)
    }

    if(useAuthentification().isLoggedIn())
        return savedStationsRemote.value
    else
        return savedStationsLocal.value
}

export const useSetStationsInStorage = (stations) => {
    const savedStationsLocal = ref(stations)
    localStorage.setItem('windStations', JSON.stringify(savedStationsLocal.value))
    return savedStationsLocal.value
}