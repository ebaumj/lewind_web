export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) {
        if(!serverSupabaseClient().auth.getUser() !== null)
            return navigateTo("/")
    }
    else if(process.client) {
        if(!useAuthentification().isLoggedIn())
            return navigateTo("/")
    }
  })