import GoTrue from 'gotrue-js'

const auth = new GoTrue({
    APIUrl: 'https://lewind.ch/.netlify/identity',
    audience: '',
    setCookie: true,
})

const user = ref(await useSupabaseUser())

export const useGetUser = () => {
    return user.value
}

export const useIsLoggedIn = () => {
    return (user.value !== null)
}

export const useLogin = async (email, password) => {
    let retval = { result: false, response: "" }
    const { data, error } = await useSupabaseClient().auth.signInWithPassword({
        email: email,
        password: password
    })
    if(error) {
        retval.response = error.message
        user.value = null
    }
    else {
        user.value = data.user
        retval.result = true
    }
    return retval
}

export const useCreateAccount = async (email, password) => {
    let retval = { result: false, response: "" }
    const { data, error } = await useSupabaseClient().auth.signUp({
        email: email,
        password: password
    })
    if(error)
        retval.response = error.message
    else
        retval.result = true
    return retval
}

export const useLogout = async () => {
    const user = await useSupabaseUser()
    let retval = { result: true, response: "Loged Out already" }
    if(user) {
        const { data, error } = await useSupabaseClient().auth.signOut()
        if(error)
            retval.response = error.message
        else {
            retval.result = true
            user.value = null
        }
    }
    return retval
}

export const useResetPassword = async (email) => {
    let retval = { result: false, response: "" }
    const { data, error } = await useSupabaseClient().auth.resetPasswordForEmail(email)
    if(error) {
        retval.response = error.message
    }
    else
        retval.result = true
    return retval
}