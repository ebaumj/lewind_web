class Storage {
    savedStationsLocal = []
    savedStationsRemote = []

    constructor() {
        this.getAllStations()
    }

    async getAllStations() {
        const dataInStorage = JSON.parse(localStorage.getItem('windStations'))
        if(dataInStorage && dataInStorage.length > 0)
            this.savedStationsLocal = dataInStorage
        else
            this.savedStationsLocal = []

        if(useAuthentification().isLoggedIn()) {
            let { data: stations, error } = await useSupabaseClient().from('stations').select('station_id, station_name')
            if(!error)
                this.savedStationsRemote = stations.map((station) => { return { id: station.station_id, name: station.station_name } })
            else {
                this.savedStationsRemote = []
                // Error Handling
            }
        }

        if(useAuthentification().isLoggedIn())
            return this.savedStationsRemote
        else
            return this.savedStationsLocal
    }

    async addStation(id, name) {
        if(useAuthentification().isLoggedIn()) {
            const { data, error } = await useSupabaseClient().from('stations').insert([{ station_id: id, station_name: name, user_id: useAuthentification().getUser().id }])
            if(!error)
                this.savedStationsRemote.push({id: id, name: name })
            else {
                console.log(error)
                // Error Handling
            }
        }
        else {
            this.savedStationsLocal.push({id: id, name: name })
            localStorage.setItem('windStations', JSON.stringify(this.savedStationsLocal))
        }

        if(useAuthentification().isLoggedIn())
            return this.savedStationsRemote
        else
            return this.savedStationsLocal
    }

    async removeStation(id) {
        if(useAuthentification().isLoggedIn()) {
            const { data, error } = await useSupabaseClient().from('stations').delete().eq('station_id', id)
            if(!error)
                this.savedStationsRemote = this.savedStationsRemote.filter((station) => station.id != id)
            else {
                console.log(error)
                // Error Handling
            }
        }
        else {
            this.savedStationsLocal = this.savedStationsLocal.filter((station) => station.id != id)
            localStorage.setItem('windStations', JSON.stringify(this.savedStationsLocal))
        }

        if(useAuthentification().isLoggedIn())
            return this.savedStationsRemote
        else
            return this.savedStationsLocal
    }

    async changeStationName(id, name) {
        if(useAuthentification().isLoggedIn()) {
            const { data, error } = await useSupabaseClient().from('stations').update({ station_name: name }).eq('station_id', id)
            if(!error)
                this.savedStationsRemote.forEach((element, index) => { 
                    if(element.id === id) 
                        this.savedStationsRemote[index].name = name 
                    });
            else {
                console.log(error)
                // Error Handling
            }
        }
        else {
            this.savedStationsLocal.forEach((element, index) => { 
                if(element.id === id) 
                    this.savedStationsLocal[index].name = name 
                });
            localStorage.setItem('windStations', JSON.stringify(this.savedStationsLocal))
        }

        if(useAuthentification().isLoggedIn())
            return this.savedStationsRemote
        else
            return this.savedStationsLocal
    }
}

const storage = new Storage()

export const useStorage = () => {
    return storage
}