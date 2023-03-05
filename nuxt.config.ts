// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [ '@nuxtjs/tailwindcss' ],
    app: {
        head: {
            title: "Le Wind",
            meta: [
                { name: 'description', content: 'Find hot wind-speeds in your local Area' }
            ],
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
            ]
        },
    },
    runtimeConfig: {
        currencyKey: process.env.MAPS_API_KEY
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
    ssr: false,
    css: [ '~/assets/css/main.css' ]
})
