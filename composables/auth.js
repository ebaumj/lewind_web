import GoTrue from 'gotrue-js'

const auth = new GoTrue({
    APIUrl: 'https://lewind.ch/.netlify/identity',
    audience: '',
    setCookie: true,
})

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
        retval.response = error
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
        retval.response = error
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
            retval.response = error
        })
    }
    return retval
}