import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  runtimeConfig: {
    API_URL: 'https://eth-mainnet.alchemyapi.io/v2',
    API_KEY: 'MV_Oh2fNciRN7IZ14QhR4VRDiF9VztlY',
    public: {
      CONTRACT_ADDR: '0xc878671ff88f1374d2186127573e4a63931370fc',
      STAKING_ADDR: '0x031aC90dcb0F59aC3a73a4a4dFAF1D88Ad03ef0c',
      NETWORK_ID: '0x1'
    }
  },
  css: [
    '~/assets/css/base.css',
    '~/assets/css/transitions.css'
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    transpile: ['@ethersproject', 'ethers']
  },
  vite: {
    optimizeDeps: {
      include: ['bn.js', 'js-sha3', 'hash.js', 'aes-js', 'scrypt-js', 'bech32']
    }
  },
  modules: [
    '@vueuse/nuxt'
  ]
})
