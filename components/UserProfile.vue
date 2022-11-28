<script setup>
const { isMetamaskInstalled } = useWallet()
const { isAuthenticated, userLoading, username, balance, ownedTokens, ensAvatar } = useUser()
const { randomNumber } = useUtils()

const usernameString = computed(() => isAuthenticated.value ? username.value : 'Not connected')

const fallbackId = computed(() => ownedTokens.value?.length ? ownedTokens.value[0]?.id : randomNumber(1, 10000))

const openUserData = ref(false)

watch(isAuthenticated, () => {
  if (!isAuthenticated.value) openUserData.value = false
})

const toggleUserData = () => isAuthenticated.value && !userLoading.value ? openUserData.value = !openUserData.value : ''
</script>

<template>
  <div class="relative text-black dark:text-white">
    <div
      :class="
        isAuthenticated && !userLoading ?
        openUserData ?
        'overflow-hidden bg-zinc-100 dark:bg-purple-600 flex items-center hover:bg-zinc-100 transition-all py-2 px-3 rounded-md cursor-pointer' :
        'overflow-hidden bg-zinc-100/[.5] dark:bg-purple-700 flex items-center hover:bg-zinc-100 dark:hover:bg-purple-600 transition-all py-2 px-3 rounded-md cursor-pointer' :
        'overflow-hidden bg-zinc-100/[.5] dark:bg-purple-700 flex items-center hover:bg-zinc-100 dark:hover:bg-purple-600 py-2 px-3 rounded-md pointer-events-none'
      "
      @click="toggleUserData"
    >
      <span :class="isAuthenticated && !userLoading ? 'whitespace-nowrap pointer-events-none text-[12px] sm:text-base text-right font-thin mr-[55px] tracking-tighter' : 'whitespace-nowrap pointer-events-none text-[12px] sm:text-base text-right font-thin tracking-tighter'">
        {{ isMetamaskInstalled ? userLoading ? 'Loading' : usernameString : 'No metamask' }}
      </span>
      <div v-if="!userLoading && !ensAvatar && isAuthenticated" class="relative">
        <div
          :class="`
            absolute
            -top-[40px]
            -right-[37px]
            min-w-[80px]
            min-h-[80px]
            rounded-xl
            flex
            items-center
            justify-center
            overflow-hidden
            pointer-events-none
            bg-cover
            bg-center
            ${ownedTokens?.length ? '' : 'opacity-30 grayscale'}
          `"
          :style="{
            backgroundImage: `url('https://yjxomsqunaalrdayrypf.supabase.co/storage/v1/object/public/muertos/${fallbackId}.png')`,
            backgroundPositionX: '150px'
        }" />
      </div>
      <div v-if="!userLoading && ensAvatar && isAuthenticated" class="relative">
        <div
          class="
            absolute
            -top-[40px]
            -right-[37px]
            min-w-[80px]
            min-h-[80px]
            rounded-xl
            flex
            items-center
            justify-center
            overflow-hidden
            pointer-events-none
            bg-cover
            bg-center"
          :style="{
            backgroundImage: `url('${ensAvatar}')`,
            backgroundPositionX: '150px'
        }" />
      </div>
      <svg v-if="userLoading" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" enable-background="new 0 0 0 0" fill="currentColor" class="inline max-w-[25px] h-[25px] ml-[10px]" xml:space="preserve">
          <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
            <animateTransform 
              attributeName="transform" 
              attributeType="XML" 
              type="rotate"
              dur="1s" 
              from="0 50 50"
              to="360 50 50" 
              repeatCount="indefinite" />
        </path>
      </svg>
    </div>
    <ClientOnly>
      <Transition name="slide-profile">
        <div v-if="openUserData && isAuthenticated" class="z-50 absolute w-full mt-2 bg-zinc-100 dark:bg-purple-600 rounded-md text-[10px] sm:text-[11px] uppercase leading-none shadow-xl shadow-black/[.15] dark:shadow-black/[.45]">
          <div class="absolute -top-1 left-2 w-0 h-0 border-b-[5px] border-x-[5px] border-b-zinc-100 dark:border-b-purple-600 border-x-transparent text-zinc-800 dark:text-white">
          </div>
          <div class="flex justify-between whitespace-nowrap p-2">
            <div class="">
              <div>balance:</div>
              <div class="mt-2">owned:</div>
            </div>
            <div class="text-right">
              <div>{{ balance }} eth</div>
              <div class="mt-2">{{ ownedTokens?.length }} LM</div>
            </div>
          </div>
          <NuxtLink to="/graveyard" @click="toggleUserData">
            <button class="text-center w-full py-1 bg-zinc-200 dark:bg-purple-700 hover:bg-zinc-200/[.5] dark:hover:bg-purple-400 transition-all rounded-b-md uppercase active:bg-zinc-100">
              Graveyard
            </button>
          </NuxtLink>
        </div>
      </Transition>
    </ClientOnly>
  </div>
</template>
