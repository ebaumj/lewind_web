export default defineNuxtRouteMiddleware(async (to, from) => {
    if(!useAuthentification().isResetPasswordActive())
        return navigateTo("/")
  })