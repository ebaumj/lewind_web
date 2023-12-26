// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: { transpile: ['@fawmi/vue-google-maps'] },
    modules: [ 
        '@nuxtjs/tailwindcss', 
        '@nuxtjs/supabase',
        'nuxt-gtag'
    ],
    app: {
        head: {
            title: "Le Wind | Live Wind Data",
            meta: [
                { name: 'description', content: 'Observe at your favorite Kitesurf and Windsurf Spots and never miss a Session with Le Wind!' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
                { name: 'HandheldFriendly', content: 'true' },
                { name: 'author', content: 'Janis M. Baumann' },
                { name: 'keywords', content: 'wind gust gusts le kite kiting kitesurfing live data windsurfing windsurf kitesurf weather windmessung wind messung windmessungen windmessung gerät wind gerät gerät zur windmessung livedaten measure measurement kitesurfen surfen windsurfen windmessung wind messung windmessungen windmessung gerät wind gerät gerät zur windmessung kitesurf livedaten wetter windsurfen wassersport wetter morgen wetter heute wetterradar wettervorhersage das wetter wetterbericht biowetter das wetter heute wetter aktuell wettertrend das wetter morgen morgen wetter heute wetter reisewetter wetterkarte wettero wetterbericht morgen wetter meteo wetter für morgen wetter für heute wettervorhersage morgen aktuelles wetter wetter vorhersage wetter von heute meteo wetter wetter in wetterfühligkeit wind surfen wasser sport windsurfen windstärke surfen wind windstärke windsurfen windsurfen wind surfen windsurfen surfen windstärke wind windsurfen schweiz switzerland bern berne' },
            ],
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
            ]
        },
    },
    runtimeConfig: {
        secrets: { 
            MAIL_HOST: process.env.MAIL_HOST,
            MAIL_PORT: process.env.MAIL_PORT,
            MAIL_USER: process.env.MAIL_USER,
            MAIL_PASSWORD: process.env.MAIL_PASSWORD,
            MAIL_CONTACT: process.env.MAIL_CONTACT,
            MAIL_SERVICE: process.env.MAIL_SERVICE,
            LETSKITE_API_TOKEN: process.env.LETSKITE_API_CODE
        },
        public: {
            GOOGLE_MAPS_API_KEY: process.env.MAPS_API_KEY,
            LETSKITE_API_TOKEN: process.env.LETSKITE_API_CODE
        }
    },
    tailwindcss: {
        cssPath: '~/assets/css/main.css',
        configPath: '~/tailwind.config.js',
        exposeConfig: true,
        viewer: true,
    },
    postcss: {
        plugins: {
            tailwindcss: {}
        }
    },
    routeRules: {
        '/home': { redirect: '/' },
    },
    ssr: false,
    css: [ '~/assets/css/main.css' ],
    supabase: {
        url: process.env.SUPABASE_ACCESS_URL,
        key: process.env.SUPABASE_ACCESS_KEY
    },
    gtag: {
        id: process.env.GOOGLE_ANALYTICS_ID,
        initialConsent: true,
        config: {
            page_title: 'Le Wind'
        }
    }
})
