export const useGetStationsInStorage = () => {
    const savedStationsLocal = ref([])
    const dataInStorage = JSON.parse(localStorage.getItem('windStations'))
    if(dataInStorage.length > 0)
        savedStationsLocal.value = dataInStorage
    return savedStationsLocal
}

export const useSetStationsInStorage = (stations) => {
    const savedStationsLocal = ref(stations)
    localStorage.setItem('windStations', JSON.stringify(savedStationsLocal.value))
    return savedStationsLocal
}