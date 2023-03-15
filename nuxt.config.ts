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
        public: { 
            GOOGLE_MAPS_API_KEY: process.env.MAPS_API_KEY,
            MAIL_HOST: process.env.MAIL_HOST,
            MAIL_PORT: process.env.MAIL_PORT,
            MAIL_USER: process.env.MAIL_USER,
            MAIL_PASSWORD: process.env.MAIL_PASSWORD,
            MAIL_CONTACT: process.env.MAIL_CONTACT,
            MAIL_SERVICE: process.env.MAIL_SERVICE
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
    ssr: false,
    css: [ '~/assets/css/main.css' ],
})
