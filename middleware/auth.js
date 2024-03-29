export default defineNuxtRouteMiddleware(async (to, from) => {
    if(!useAuthentification().isLoggedIn())
        return navigateTo("/")
  })