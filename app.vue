<script setup>
import logo from '@/assets/img/logo.png'
import AOS from 'aos'
import 'aos/dist/aos.css'

const { loadContractState, emitter } = useContract()
const { detectChain, isNetwork, loadConnectedWallet, chainId, resetUser } = useUser()
const { connectProvider, isMetamaskInstalled, provider, detectProvider, getProvider } = useWallet()

const { showBox, closeBox, checkForModal } = useModal()

const route = useRoute()

const onAccountsChanged = (accounts) => {
  resetUser()
  if (isNetwork.value) {
    if (accounts.length) loadContractState()
    loadConnectedWallet()
  }
}

const onChainChanged = (chain) => {
  chainId.value = chain
  if (isNetwork.value) {
    loadContractState()
    loadConnectedWallet()
  }
  if (!isNetwork.value) resetUser()
}

const setListeners = (bool) => {
  if (bool) {
    provider.value.on('accountsChanged', onAccountsChanged)
    provider.value.on('chainChanged', onChainChanged)
    emitter.on('minted', () => {
      loadContractState()
      loadConnectedWallet()
    })
  } else {
    provider.value.removeListener('accountsChanged', onAccountsChanged)
    provider.value.removeListener('chainChanged', onChainChanged)
  }
}


useHead({
  title: 'MuertoViewer.xyz',
  meta: [
    { name: 'og:site_name', content: `muertoviewer.xyz` },
    { name: 'og:title', content: `MuertoViewer` },
    { name: 'og:description', content: `Los Muertos collection explorer.` },
    { name: 'og:type', content: `website` },
    { name: 'og:url', content: `https://muertoviewer.xyz` },
    { name: 'og:image', content: logo },
    { name: 'og:image:width', content: `1325` },
    { name: 'og:image:height', content: `330` },
    { name: 'og:image:type', content: `image/png` },
    { name: 'og:locale', content: `en_US` },
    { name: 'og:see_also', content: `https://muertoviewer.xyz` },
    { name: 'twitter:card', content: `summary_large_image` },
    { name: 'twitter:creator', content: `@angry1bud` },
    { name: 'twitter:image', content: `https://muertoviewer.xyz/${logo}` },
    { name: 'theme-color', content: `#e3e3e6` }
  ]
})

watch(() => route.query, () => checkForModal())
onMounted(async () => {
  AOS.init({ once: true, easing: 'ease-in-out-cubic' })
  await detectProvider()
  checkForModal()
  if (isMetamaskInstalled.value) {
    connectProvider(provider.value)
    await detectChain()
    if (isNetwork.value) {
      await loadContractState(getProvider())
      await loadConnectedWallet()
    }
    setListeners(true)
  } else {
    console.error('Non Ethereum browser! Please install metamask. https://metamask.io/download/')
  }
})

onUnmounted(() => {
  if (isMetamaskInstalled.value) setListeners(false)
})
</script>

<template>
  <div>
    <Transition name="page">
      <div v-if="isMetamaskInstalled && !isNetwork" class="fixed top-0 left-0 w-full z-[100] text-center bg-zinc-500 dark:bg-purple-500 text-white text-[10px] uppercase">
        wrong network detected. please switch to ethereum mainnet
      </div>
    </Transition>
    <LayoutBackground id="back" />
    <div class="min-h-screen flex flex-col">
      <LayoutNavigation />
      <NuxtPage class="flex-1" />
      <LayoutFooter v-if="route.name !== 'gallery'" />
    </div>
    <Transition name="slide-modal">
      <LayoutModal v-if="showBox" @hide-modal="closeBox" />
    </Transition>
  </div>
</template>
