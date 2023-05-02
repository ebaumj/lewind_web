export default defineNuxtPlugin((nuxtApp) => {
    let onAuthStateChange = (event, session) => { }
    useSupabaseClient().auth.onAuthStateChange((event, session) => {
        onAuthStateChange(event, session)
    });
    return {
        provide: {
            setAuthStateChangeCallback: (callback) => { onAuthStateChange = callback }
        }
    }
})