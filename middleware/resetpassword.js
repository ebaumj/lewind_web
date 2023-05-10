export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) {
        return
    }
    else if(process.client) {
        useInitAuthentification()
        await useAuthentification().waitForSession()
        if(!useAuthentification().isResetPasswordActive())
            return navigateTo("/")
    }
})