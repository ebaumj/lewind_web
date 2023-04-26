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
    auth.login(email, password).then((response) => {
        return { result: true, response: response }
    }).catch((error) => {
        return { result: false, response: error }
    })
}

export const useCreateAccount = async (email, password) => {
    auth.signup(email, password).then((response) => {
        return { result: true, response: response }
    }).catch((error) => {
        return { result: false, response: error }
    })
}

export const useLogout = async () => {
    if(await useGetUser()) {
        user.value.logout().then(async (response) => {
            return { result: true, response: response }
        }).catch((error) => {
            return { result: false, response: error }
        })
    }
    else {
        return { result: true, response: "Loged Out already" }
    }
}