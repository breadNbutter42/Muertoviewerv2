<script setup>
const { switchNetwork, isMetamaskInstalled } = useWallet()
const { isAuthenticated, userLoading, connectUser, isNetwork } = useUser()

const isDark = useDark()
const toggleDarkMode = useToggle(isDark)
</script>

<template>
  <header class="py-6 transition-all bg-opacity-10 w-full dark:bg-purple-800/[.6] backdrop-blur-sm shadow-xl">
    <div class="max-w-[1920px] mx-auto flex justify-between items-center px-4">
      <LayoutLogo />
      <div class="flex gap-4 items-center text-[12px] sm:text-base">
        <Transition name="fadeout">
          <LayoutMyButton v-if="!isNetwork && isMetamaskInstalled" class="hidden md:block" @click="switchNetwork">
            Switch Network
          </LayoutMyButton>
        </Transition>
        <Transition name="fadeout">
          <LayoutMyButton
            v-if="!isAuthenticated && isMetamaskInstalled"
            :disabled="userLoading || !isNetwork"
            @click="connectUser"
            class="ml-2"
          >
            Connect
          </LayoutMyButton>
        </Transition>
        <UserProfile />
        <ClientOnly>
          <button class="w-8 h-8 bg-zinc-100/[.5] dark:bg-purple-700 hover:dark:bg-purple-600 hover:bg-zinc-100 transition-all rounded-xl overflow-hidden" @click="toggleDarkMode()">
            <Transition name="slide-button">
              <img v-if="!isDark" src="~/assets/img/moon.svg" class="block dark:hidden mx-auto">
              <img v-else-if="isDark" src="~/assets/img/sun.svg" class="hidden dark:block mx-auto">
            </Transition>
          </button>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>
