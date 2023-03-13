// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    build: { transpile: ['@fawmi/vue-google-maps'] },
    modules: [ 
        ['@nuxtjs/tailwindcss', {  }], 
    ],
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
        public: { GOOGLE_MAPS_API_KEY: process.env.MAPS_API_KEY }
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
    /*plugins: [
        { src: '~/plugins/chart.js', mode: 'client' },
    ],*/
    ssr: false,
    css: [ '~/assets/css/main.css' ]
})
