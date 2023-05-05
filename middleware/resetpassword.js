export default defineNuxtRouteMiddleware(async (to, from) => {
    await useAuthentification().waitForSession()
    if(!useAuthentification().isResetPasswordActive())
        return navigateTo("/")
})