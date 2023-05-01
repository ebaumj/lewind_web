import GoTrue from 'gotrue-js'

const auth = new GoTrue({
    APIUrl: 'https://lewind.ch/.netlify/identity',
    audience: '',
    setCookie: true,
})

export const useGetSupabaseUser = async () => {
    //return (await useSupabaseClient().auth.getUser()).data.user
    return useSupabaseUser()
}

export const useSupabaseLogin = async (email, password) => {
    let retval = { result: false, response: "" }
    const { user, error } = await useSupabaseClient().auth.signInWithPassword({
        email: email,
        password: password
    })
    if(error)
        retval.response = error.message
    else
        retval.result = true
    return retval
}

export const useCreateSupabaseAccount = async (email, password) => {
    let retval = { result: false, response: "" }
    const { user, error } = await useSupabaseClient().auth.signUp({
        email: email,
        password: password
    })
    if(error)
        retval.response = error.message
    else
        retval.result = true
    return retval
}

export const useSupabaseLogout = async () => {
    const user = await useGetSupabaseUser()
    let retval = { result: true, response: "Loged Out already" }
    if(user) {
        const { user, error } = await useSupabaseClient().auth.signOut()
        if(error)
            retval.response = error.message
        else
            retval.result = true
    }
    return retval
}

export const useGetUser = async () => {
    return await auth.currentUser()
}

export const useLogin = async (email, password) => {
    let retval = { result: false, response: "" }
    await auth.login(email, password).then((response) => {
        retval.result = true
        retval.response = response
    }).catch((error) => {
        retval.result = false
        retval.response = error.json.error_description
    })
    return retval
}

export const useCreateAccount = async (email, password) => {
    let retval = { result: false, response: "" }
    await auth.signup(email, password).then((response) => {
        retval.result = true
        retval.response = response
    }).catch((error) => {
        retval.result = false
        retval.response = error.json.msg
    })
    return retval
}

export const useLogout = async () => {
    const user = await useGetUser()
    let retval = { result: true, response: "Loged Out already" }
    if(user) {
        await user.logout().then(async (response) => {
            retval.result = true
            retval.response = response
        }).catch((error) => {
            retval.result = false
            retval.response = error.json.error_description
        })
    }
    return retval
}