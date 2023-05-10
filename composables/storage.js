class Storage {
    savedStationsLocal = []
    savedStationsRemote = []

    constructor() {
        //this.getAllStations()
    }

    async getAllStations() {
        if(process.server) {
            this.savedStationsLocal = []
            this.savedStationsRemote = []
        }
        else {
            const dataInStorage = JSON.parse(localStorage.getItem('windStations'))
            if(dataInStorage && dataInStorage.length > 0)
                this.savedStationsLocal = dataInStorage
            else
                this.savedStationsLocal = []

            if(useAuthentification().isLoggedIn()) {
                let { data: stations, error } = await useSupabaseClient().from('stations').select('station_id, station_name, index')
                if(!error)
                    this.savedStationsRemote = stations.map((station) => { return { id: station.station_id, name: station.station_name, index: station.index } })
                else {
                    this.savedStationsRemote = []
                    // Error Handling
                }
            }
        }

        if(useAuthentification().isLoggedIn())
            return this.savedStationsRemote
        else
            return this.savedStationsLocal
    }

    async addStation(id, name) {
        if(useAuthentification().isLoggedIn()) {
            const { data, error } = await useSupabaseClient().from('stations').insert([{ station_id: id, station_name: name, user_id: useAuthentification().getUser().id, index: this.savedStationsRemote.length }])
            if(!error)
                this.savedStationsRemote.push({id: id, name: name, index: this.savedStationsRemote.length })
            else {
                console.log(error)
                // Error Handling
            }
        }
        else {
            this.savedStationsLocal.push({id: id, name: name, index: this.savedStationsLocal.length })
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
            if(!error) {
                this.savedStationsRemote = this.savedStationsRemote.filter((station) => station.id != id)
                this.savedStationsRemote.sort((a, b) => { return a.index - b.index })
                this.savedStationsRemote.forEach((item, index) => { 
                    item.index = index
                    this.changeStationIndex(item.id, item.index)
                })
            }
            else {
                console.log(error)
                // Error Handling
            }
        }
        else {
            this.savedStationsLocal = this.savedStationsLocal.filter((station) => station.id != id)
            this.savedStationsLocal.sort((a, b) => { return a.index - b.index })
            this.savedStationsLocal.forEach((item, index) => { item.index = index })
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

    async changeStationIndex(id, new_index) {
        if(useAuthentification().isLoggedIn()) {
            const { data, error } = await useSupabaseClient().from('stations').update({ index: new_index }).eq('station_id', id)
            if(!error)
                this.savedStationsRemote.forEach((element, index) => { 
                    if(element.id === id) 
                        this.savedStationsRemote[index].index = new_index 
                    });
            else {
                console.log(error)
                // Error Handling
            }
        }
        else {
            this.savedStationsLocal.forEach((element, index) => { 
                if(element.id === id) 
                    this.savedStationsLocal[index].index = new_index 
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