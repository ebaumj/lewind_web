export default defineNuxtRouteMiddleware(async (to, from) => {
    if(to.meta.authRequired) {
      if(await useGetUser()) {
        return
      }
      else
        return navigateTo("/")
    }
  })