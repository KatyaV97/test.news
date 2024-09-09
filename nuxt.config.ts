// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {
        enabled: true
    },
    build: {
        transpile: ['vuetify'],
    },
    runtimeConfig: {
        public: {
            backendHost: process.env.NUXT_PUBLIC_BACKEND,
        }
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'ru',
            },
            meta: [
                {
                    charset: 'UTF-8'
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1, user-scalable=no'
                },
                {
                    name: 'description',
                    content: 'News'
                }
            ]
        }
    },
    css: [
        '@/assets/sass/index.sass',
        "vuetify/lib/styles/main.sass",
    ],
    plugins: [
        {
            src: '@/plugins/moment.ts'
        },
    ],
    modules: [
        "@nuxt/image",
        '@pinia/nuxt',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
})