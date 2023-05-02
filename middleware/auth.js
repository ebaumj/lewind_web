export default defineNuxtRouteMiddleware(async (to, from) => {
    if(!useIsLoggedIn())
        return navigateTo("/")
  })