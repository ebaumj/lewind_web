export default defineNuxtPlugin((nuxtApp) => {
    let onPageTransition = () => { }
    nuxtApp.hook('page:start', () => {
        onPageTransition()
    })
    return {
        provide: {
            setPageTranition: (transition: any) => { onPageTransition = transition }
        }
    }
})