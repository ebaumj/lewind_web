
const user = ref(await useSupabaseUser())

const checkPassword = (password) => {
    if(password === "")
        return false
    return true
}

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
        password: password,
        user_metadata: { first_name: "", last_name: "" }
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
    if(useIsLoggedIn()) {
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

export const useChangePassword = async (old_password, new_password) => {
    let retval = { result: false, response: "" }
    if(checkPassword(old_password) && useIsLoggedIn()) {
        const { data, error } = await useSupabaseClient().auth.updateUser({password: new_password})
        if(error) {
            retval.response = error.message
        }
        else {
            user.value = data.user
            retval.result = true
        }
    }
    else
        retval.response = "Old password is not correct"
    return retval
}

export const useDeleteUser = async (password) => {
    let retval = { result: false, response: "" }
    if(checkPassword(password) && useIsLoggedIn()) {
        const { data, error } = await useSupabaseClient().rpc('delete_user')
        console.log(data)
        console.log(error)
        if(error) {
            retval.response = error.message
        }
        else {
            await useSupabaseClient().auth.signOut()
            user.value = null
            retval.result = true
        }
    }
    else
        retval.response = "Password is not correct"
    return retval
}

export const useChangeName = async (first_name, last_name) => {

}