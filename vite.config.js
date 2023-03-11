import { defineConfig, loadEnv } from 'vite'
export default defineConfig({
    resolve: {
       alias: {
         // added for AWS-SDK with vite
         "./runtimeConfig": "./runtimeConfig.browser"
       },
     },
   })