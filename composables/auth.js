class Authentification {
    user = null
    resetPasswordActive = false
    onAuthStateChange = []

    constructor() {
        useSupabaseClient().auth.onAuthStateChange((event, session) => {
            if(session?.user)
                this.user = session.user
            else
                this.user = null
            if(event == "PASSWORD_RECOVERY")
                this.resetPasswordActive = true
            else
                this.resetPasswordActive = false
            this.onAuthStateChange.forEach(element => element.callback())
        })
    }

    onAuthStateChangedCallback(callback, id) {
        let elementExists = false
        this.onAuthStateChange.forEach(element => {
            if(element.id === id) {
                element.callback = callback
                elementExists = true
            }
        });
        if(!elementExists)
            this.onAuthStateChange.push({ callback : callback, id: id })
    }
    
    getUser() {
        return this.user
    }

    isLoggedIn() {
        return (this.user !== null)
    }
    
    isResetPasswordActive(){
        return this.resetPasswordActive
    }

    async login(email, password) {
        let retval = { result: false, response: "" }
        const { data, error } = await useSupabaseClient().auth.signInWithPassword({
            email: email,
            password: password
        })
        if(error)
            retval.response = error.message
        else
            retval.result = true
        return retval
    }

    async createAccount(email, password) {
        let retval = { result: false, response: "" }
        const { data, error } = await useSupabaseClient().auth.signUp({
            email: email,
            password: password,
            user_metadata: { first_name: "", last_name: "" }
        })
        if(error)
            retval.response = error.message
        else
            retval.result = true
        return retval
    }

    async logout() {
        let retval = { result: true, response: "Loged Out already" }
        if(this.isLoggedIn()) {
            const { data, error } = await useSupabaseClient().auth.signOut()
            if(error)
                retval.response = error.message
            else
                retval.result = true
        }
        return retval
    }

    async resetPassword(email) {
        let retval = { result: false, response: "" }
        const { data, error } = await useSupabaseClient().auth.resetPasswordForEmail(email, { redirectTo: 'https://lewind.ch/resetpassword', })
        if(error)
            retval.response = error.message
        else
            retval.result = true
        return retval
    }

    async changePassword(old_password, new_password) {
        let retval = { result: false, response: "" }
        const { data, error } = await useSupabaseClient().rpc('change_user_password', { current_plain_password: old_password, new_plain_password: new_password })
        if(error)
            retval.response = error.message
        else
            retval.result = true
        return retval
    }

    async changePasswordFromReset(new_password) {
        let retval = { result: false, response: "Not Alowed" }
        if(this.resetPasswordActive) {
            const { data, error } = await useSupabaseClient().auth.updateUser({ password: new_password })
            if(error)
                retval.response = error.message
            else
                retval.result = true
        }
        return retval
    }

    async deleteUser(password) {
        let retval = { result: false, response: "" }
        const { data, error } = await useSupabaseClient().rpc('delete_user', { current_plain_password: password })
        if(error) {
            retval.response = error.message
        }
        else {
            await useSupabaseClient().auth.signOut()
            retval.result = true
        }
        return retval
    }

    async changeName(first_name, last_name) {

    }
}

const auth = new Authentification()

export const useAuthentification = () => {
    return auth
}